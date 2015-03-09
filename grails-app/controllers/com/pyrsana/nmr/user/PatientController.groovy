package com.pyrsana.nmr.user

import grails.rest.RestfulController

import com.pyrsana.nmr.security.PatientProfile
import com.pyrsana.nmr.security.RoleGroup
import com.pyrsana.nmr.security.User

class PatientController {

    static responseFormats = ['json', 'xml']
	
	def index() {
		
	}
	
	def query() {
		def queryParams = [RoleGroup.findByName('GROUP_PATIENT')]
		String queryString = "select u.id, p from UserRoleGroup urg join urg.user u join urg.user.profile p where urg.roleGroup = ?"
		
		if (params.name) {
			queryString += "and (lower(p.firstName) like lower('%${params.name}%') or lower(p.middleName) like lower('%${params.name}%') or lower(p.lastName) like lower('%${params.name}%'))"
		}
		if (params.mrn) {
			queryString += "and lower(p.medicalRecordNumber) like lower('%${params.mrn}%')"
		}
		
		def patients = User.executeQuery(queryString, queryParams)
		patients = patients.collect {
			it[1].id = it[0]
			return it[1]
		}
		respond patients
	}
	
}
