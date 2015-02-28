
<%@ page import="com.pyrsana.nmr.complaint.Complaint" %>
<!DOCTYPE html>
<html>
	<head>
		<meta name="layout" content="main">
		<g:set var="entityName" value="${message(code: 'complaint.label', default: 'Complaint')}" />
		<title><g:message code="default.list.label" args="[entityName]" /></title>
	</head>
	<body>
		<a href="#list-complaint" class="skip" tabindex="-1"><g:message code="default.link.skip.label" default="Skip to content&hellip;"/></a>
		<div class="nav" role="navigation">
			<ul>
				<li><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></li>
				<li><g:link class="create" action="create"><g:message code="default.new.label" args="[entityName]" /></g:link></li>
			</ul>
		</div>
		<div id="list-complaint" class="content scaffold-list" role="main">
			<h1><g:message code="default.list.label" args="[entityName]" /></h1>
			<g:if test="${flash.message}">
				<div class="message" role="status">${flash.message}</div>
			</g:if>
			<table>
			<thead>
					<tr>
					
						<g:sortableColumn property="severity" title="${message(code: 'complaint.severity.label', default: 'Severity')}" />
					
						<g:sortableColumn property="onsetDate" title="${message(code: 'complaint.onsetDate.label', default: 'Onset Date')}" />
					
						<g:sortableColumn property="comments" title="${message(code: 'complaint.comments.label', default: 'Comments')}" />
					
						<th><g:message code="complaint.location.label" default="Location" /></th>
					
						<g:sortableColumn property="resolved" title="${message(code: 'complaint.resolved.label', default: 'Resolved')}" />
					
					</tr>
				</thead>
				<tbody>
				<g:each in="${complaintInstanceList}" status="i" var="complaintInstance">
					<tr class="${(i % 2) == 0 ? 'even' : 'odd'}">
					
						<td><g:link action="show" id="${complaintInstance.id}">${fieldValue(bean: complaintInstance, field: "severity")}</g:link></td>
					
						<td><g:formatDate date="${complaintInstance.onsetDate}" /></td>
					
						<td>${fieldValue(bean: complaintInstance, field: "comments")}</td>
					
						<td>${fieldValue(bean: complaintInstance, field: "location")}</td>
					
						<td><g:formatBoolean boolean="${complaintInstance.resolved}" /></td>
					
					</tr>
				</g:each>
				</tbody>
			</table>
			<div class="pagination">
				<g:paginate total="${complaintInstanceCount ?: 0}" />
			</div>
		</div>
	</body>
</html>
