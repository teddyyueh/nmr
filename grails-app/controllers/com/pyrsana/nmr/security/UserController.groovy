package com.pyrsana.nmr.security

import grails.rest.RestfulController
import grails.transaction.Transactional

import org.codehaus.groovy.grails.web.servlet.HttpHeaders
import org.springframework.http.HttpStatus

class UserController extends RestfulController {

    static responseFormats = ['json', 'xml']
	
	Class profileClass
	
	UserController() {
		super(User)
	}
	
	@Override
	public Object create() {
		if(handleReadOnly()) {
			return
		}
		respond(createResource(), [includes:['profile.deep'], excludes:['password']])
	}
	
	/**
	 * Saves a user with groups.
	 */
	@Transactional
	def save() {
		if(handleReadOnly()) {
			return
		}

		// Make sure there are no errors before saving:
		def instance = createResource()
		instance.validate()
		if (instance.hasErrors()) {
			respond instance.errors, view:'create' // STATUS CODE 422
			return
		}
		instance.profile.validate()
		if (instance.profile.hasErrors()) {
			respond instance.profile.errors, view:'create' // STATUS CODE 422
			return
		}

		// Persist user and associate with groups:
		if (instance.save(flush:true)) {
			Collection<RoleGroup> groups = getRoleGroups(instance)
			groups.each { RoleGroup group ->
				UserRoleGroup.create(instance, group)
			}
		}

		request.withFormat {
			form multipartForm {
				flash.message = message(code: 'default.created.message', args: [message(code: "${resourceName}.label".toString(), default: resourceClassName), instance.id])
				redirect instance
			}
			'*' {
				response.addHeader(HttpHeaders.LOCATION,
						g.createLink(
								resource: this.controllerName, action: 'show',id: instance.id, absolute: true,
								namespace: hasProperty('namespace') ? this.namespace : null ))
				respond(instance, [status: HttpStatus.CREATED, includes:['profile.deep'], excludes:['password']])
			}
		}
	}
	
	@Override
	protected Object createResource() {
		def instance = resource.newInstance()
		def bindObject = getObjectToBind()
		
		// Make sure the profile is instantiated with the right class:
		if (!bindObject.profile?.id) {
			instance.profile = profileClass?.newInstance()
		}
		
		if (params.id) {
			bindData(instance, bindObject, [exclude: ['password']])
		}
		else {
			bindData(instance, bindObject)
		}
		return instance
	}
	
	@Override
	protected Object getObjectToBind() {
		return request.JSON
	}
	
	/**
	 * Determine which groups to add to the given user.
	 * 
	 * @param user The user in question.
	 * @return List of groups or empty list if there are none.
	 */
	protected Collection<RoleGroup> getRoleGroups(User user) {
		return Collections.EMPTY_LIST
	}
	
}
