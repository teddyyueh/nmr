
<%@ page import="com.pyrsana.nmr.complaint.Complaint" %>
<!DOCTYPE html>
<html>
	<head>
		<meta name="layout" content="main">
		<g:set var="entityName" value="${message(code: 'complaint.label', default: 'Complaint')}" />
		<title><g:message code="default.show.label" args="[entityName]" /></title>
	</head>
	<body>
		<a href="#show-complaint" class="skip" tabindex="-1"><g:message code="default.link.skip.label" default="Skip to content&hellip;"/></a>
		<div class="nav" role="navigation">
			<ul>
				<li><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></li>
				<li><g:link class="list" action="index"><g:message code="default.list.label" args="[entityName]" /></g:link></li>
				<li><g:link class="create" action="create"><g:message code="default.new.label" args="[entityName]" /></g:link></li>
			</ul>
		</div>
		<div id="show-complaint" class="content scaffold-show" role="main">
			<h1><g:message code="default.show.label" args="[entityName]" /></h1>
			<g:if test="${flash.message}">
			<div class="message" role="status">${flash.message}</div>
			</g:if>
			<ol class="property-list complaint">
			
				<g:if test="${complaintInstance?.severity}">
				<li class="fieldcontain">
					<span id="severity-label" class="property-label"><g:message code="complaint.severity.label" default="Severity" /></span>
					
						<span class="property-value" aria-labelledby="severity-label"><g:fieldValue bean="${complaintInstance}" field="severity"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${complaintInstance?.onsetDate}">
				<li class="fieldcontain">
					<span id="onsetDate-label" class="property-label"><g:message code="complaint.onsetDate.label" default="Onset Date" /></span>
					
						<span class="property-value" aria-labelledby="onsetDate-label"><g:formatDate date="${complaintInstance?.onsetDate}" /></span>
					
				</li>
				</g:if>
			
				<g:if test="${complaintInstance?.comments}">
				<li class="fieldcontain">
					<span id="comments-label" class="property-label"><g:message code="complaint.comments.label" default="Comments" /></span>
					
						<span class="property-value" aria-labelledby="comments-label"><g:fieldValue bean="${complaintInstance}" field="comments"/></span>
					
				</li>
				</g:if>
			
				<g:if test="${complaintInstance?.location}">
				<li class="fieldcontain">
					<span id="location-label" class="property-label"><g:message code="complaint.location.label" default="Location" /></span>
					
						<span class="property-value" aria-labelledby="location-label"><g:link controller="location" action="show" id="${complaintInstance?.location?.id}">${complaintInstance?.location?.encodeAsHTML()}</g:link></span>
					
				</li>
				</g:if>
			
				<g:if test="${complaintInstance?.resolved}">
				<li class="fieldcontain">
					<span id="resolved-label" class="property-label"><g:message code="complaint.resolved.label" default="Resolved" /></span>
					
						<span class="property-value" aria-labelledby="resolved-label"><g:formatBoolean boolean="${complaintInstance?.resolved}" /></span>
					
				</li>
				</g:if>
			
			</ol>
			<g:form url="[resource:complaintInstance, action:'delete']" method="DELETE">
				<fieldset class="buttons">
					<g:link class="edit" action="edit" resource="${complaintInstance}"><g:message code="default.button.edit.label" default="Edit" /></g:link>
					<g:actionSubmit class="delete" action="delete" value="${message(code: 'default.button.delete.label', default: 'Delete')}" onclick="return confirm('${message(code: 'default.button.delete.confirm.message', default: 'Are you sure?')}');" />
				</fieldset>
			</g:form>
		</div>
	</body>
</html>
