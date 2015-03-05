package com.pyrsana.nmr.converters.marshaller

import java.util.List;

import grails.converters.JSON
import grails.util.Holders

import org.codehaus.groovy.grails.commons.DomainClassArtefactHandler
import org.codehaus.groovy.grails.commons.GrailsApplication
import org.codehaus.groovy.grails.commons.GrailsDomainClass
import org.codehaus.groovy.grails.commons.GrailsDomainClassProperty
import org.codehaus.groovy.grails.support.IncludeExcludeSupport
import org.codehaus.groovy.grails.support.proxy.DefaultProxyHandler
import org.codehaus.groovy.grails.support.proxy.ProxyHandler
import org.codehaus.groovy.grails.web.converters.ConverterUtil
import org.codehaus.groovy.grails.web.converters.exceptions.ConverterException
import org.codehaus.groovy.grails.web.converters.marshaller.json.DomainClassMarshaller
import org.codehaus.groovy.grails.web.json.JSONWriter
import org.springframework.beans.BeanWrapper
import org.springframework.beans.BeanWrapperImpl

class SelectivelyDeepNoClassJsonMarshaller extends DomainClassMarshaller {

	private boolean includeVersion = false
    private ProxyHandler proxyHandler
    private GrailsApplication application

	public SelectivelyDeepNoClassJsonMarshaller() {
		super(false, Holders.getGrailsApplication())
		application = Holders.getGrailsApplication()
		proxyHandler = new DefaultProxyHandler()
	}
	
    public SelectivelyDeepNoClassJsonMarshaller(boolean includeVersion, GrailsApplication application) {
        super(includeVersion, new DefaultProxyHandler(), application)
		this.includeVersion = includeVersion
		application = Holders.getGrailsApplication()
		this.proxyHandler = application
    }

    public SelectivelyDeepNoClassJsonMarshaller(boolean includeVersion, ProxyHandler proxyHandler, GrailsApplication application) {
        super(includeVersion, proxyHandler, application)
		this.application = application
		this.proxyHandler = proxyHandler
		this.includeVersion = includeVersion
    }
	
	@Override
	public void marshalObject(Object value, JSON json) throws ConverterException {
		JSONWriter writer = json.getWriter();
		value = proxyHandler.unwrapIfProxy(value);
		Class<?> clazz = value.getClass();

		List<String> excludes = json.getExcludes(clazz);
		List<String> includes = json.getIncludes(clazz);
		IncludeExcludeSupport<String> includeExcludeSupport = new IncludeExcludeSupport<String>();
		// Extract selectively deep properties to avoid unintentionally excluding all other properties:
		List<String> deepPropertyNames = includes?.findAll { it.endsWith('.deep') }
		if (deepPropertyNames?.size() > 0) {
			includes.removeAll(deepPropertyNames)
			if (includes.size() == 0) {
				includes = null
			}
		}
		
		GrailsDomainClass domainClass = (GrailsDomainClass)application.getArtefact(
			  DomainClassArtefactHandler.TYPE, ConverterUtil.trimProxySuffix(clazz.getName()));
		BeanWrapper beanWrapper = new BeanWrapperImpl(value);

		writer.object();

		GrailsDomainClassProperty id = domainClass.getIdentifier();

		if(shouldInclude(deepPropertyNames, includeExcludeSupport, includes, excludes, value, id.getName())) {
			Object idValue = extractValue(value, id);
			json.property(GrailsDomainClassProperty.IDENTITY, idValue);
		}

		if (isIncludeVersion() && shouldInclude(deepPropertyNames, includeExcludeSupport, includes, excludes, value, GrailsDomainClassProperty.VERSION)) {
			GrailsDomainClassProperty versionProperty = domainClass.getVersion();
			Object version = extractValue(value, versionProperty);
			json.property(GrailsDomainClassProperty.VERSION, version);
		}

		GrailsDomainClassProperty[] properties = domainClass.getPersistentProperties();

		for (GrailsDomainClassProperty property : properties) {
			if(!shouldInclude(deepPropertyNames, includeExcludeSupport, includes, excludes, value, property.getName())) continue;

			writer.key(property.getName());
			if (!property.isAssociation()) {
				// Write non-relation property
				Object val = beanWrapper.getPropertyValue(property.getName());
				json.convertAnother(val);
			}
			else {
				Object referenceObject = beanWrapper.getPropertyValue(property.getName());
				if (isRenderDomainClassRelations(deepPropertyNames, includeExcludeSupport, includes, excludes, value, property.getName())) {
					if (referenceObject == null) {
						writer.valueNull();
					}
					else {
						referenceObject = proxyHandler.unwrapIfProxy(referenceObject);
						if (referenceObject instanceof SortedMap) {
							referenceObject = new TreeMap((SortedMap) referenceObject);
						}
						else if (referenceObject instanceof SortedSet) {
							referenceObject = new TreeSet((SortedSet) referenceObject);
						}
						else if (referenceObject instanceof Set) {
							referenceObject = new HashSet((Set) referenceObject);
						}
						else if (referenceObject instanceof Map) {
							referenceObject = new HashMap((Map) referenceObject);
						}
						else if (referenceObject instanceof Collection) {
							referenceObject = new ArrayList((Collection) referenceObject);
						}
						json.convertAnother(referenceObject);
					}
				}
				else {
					if (referenceObject == null) {
						json.value(null);
					}
					else {
						GrailsDomainClass referencedDomainClass = property.getReferencedDomainClass();

						// Embedded are now always fully rendered
						if (referencedDomainClass == null || property.isEmbedded() || property.getType().isEnum()) {
							json.convertAnother(referenceObject);
						}
						else if (property.isOneToOne() || property.isManyToOne() || property.isEmbedded()) {
							asShortObject(referenceObject, json, referencedDomainClass.getIdentifier(), referencedDomainClass);
						}
						else {
							GrailsDomainClassProperty referencedIdProperty = referencedDomainClass.getIdentifier();
							@SuppressWarnings("unused")
							String refPropertyName = referencedDomainClass.getPropertyName();
							if (referenceObject instanceof Collection) {
								Collection o = (Collection) referenceObject;
								writer.array();
								for (Object el : o) {
									asShortObject(el, json, referencedIdProperty, referencedDomainClass);
								}
								writer.endArray();
							}
							else if (referenceObject instanceof Map) {
								Map<Object, Object> map = (Map<Object, Object>) referenceObject;
								for (Map.Entry<Object, Object> entry : map.entrySet()) {
									String key = String.valueOf(entry.getKey());
									Object o = entry.getValue();
									writer.object();
									writer.key(key);
									asShortObject(o, json, referencedIdProperty, referencedDomainClass);
									writer.endObject();
								}
							}
						}
					}
				}
			}
		}
		writer.endObject();
	}

	boolean shouldInclude(List<String> deepPropertyNames, IncludeExcludeSupport<String> includeExcludeSupport, List<String> includes, List<String> excludes, Object object, String propertyName) {
		return deepPropertyNames?.contains(propertyName) || includeExcludeSupport.shouldInclude(includes,excludes,propertyName) && shouldInclude(object,propertyName);
	}
	
	boolean isRenderDomainClassRelations(List<String> deepPropertyNames, IncludeExcludeSupport<String> includeExcludeSupport, List<String> includes, List<String> excludes, Object value, String propertyName) {
		return shouldInclude(includeExcludeSupport, includes, excludes, value, propertyName)
	}
	
}
