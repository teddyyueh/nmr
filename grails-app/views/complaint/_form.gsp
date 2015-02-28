<%@ page import="com.pyrsana.nmr.complaint.Complaint" %>



<div class="fieldcontain ${hasErrors(bean: complaintInstance, field: 'severity', 'error')} required">
	<label for="severity">
		<g:message code="complaint.severity.label" default="Severity" />
		<span class="required-indicator">*</span>
	</label>
	<g:field name="severity" type="number" min="1" max="10" value="${complaintInstance.severity}" required=""/>

</div>

<div class="fieldcontain ${hasErrors(bean: complaintInstance, field: 'onsetDate', 'error')} required">
	<label for="onsetDate">
		<g:message code="complaint.onsetDate.label" default="Onset Date" />
		<span class="required-indicator">*</span>
	</label>
	<g:datePicker name="onsetDate" precision="day"  value="${complaintInstance?.onsetDate}"  />

</div>

<div class="fieldcontain ${hasErrors(bean: complaintInstance, field: 'comments', 'error')} ">
	<label for="comments">
		<g:message code="complaint.comments.label" default="Comments" />
		
	</label>
	<g:textArea name="comments" cols="40" rows="5" maxlength="9999" value="${complaintInstance?.comments}"/>

</div>

<div class="fieldcontain ${hasErrors(bean: complaintInstance, field: 'location', 'error')} required">
	<label for="location">
		<g:message code="complaint.location.label" default="Location" />
		<span class="required-indicator">*</span>
	</label>
	<g:select id="location" name="location.id" from="${com.pyrsana.nmr.complaint.Location.list()}" optionKey="id" required="" value="${complaintInstance?.location?.id}" class="many-to-one"/>

</div>

<div class="fieldcontain ${hasErrors(bean: complaintInstance, field: 'resolved', 'error')} ">
	<label for="resolved">
		<g:message code="complaint.resolved.label" default="Resolved" />
		
	</label>
	<g:checkBox name="resolved" value="${complaintInstance?.resolved}" />

</div>

