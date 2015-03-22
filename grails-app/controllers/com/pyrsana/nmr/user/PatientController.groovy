package com.pyrsana.nmr.user

import java.util.Collection;

import com.pyrsana.nmr.security.PatientProfile
import com.pyrsana.nmr.security.RoleGroup
import com.pyrsana.nmr.security.User
import com.pyrsana.nmr.security.UserController

class PatientController extends UserController {

	static allowedMethods = [save: "POST", update: "PUT", patch: "PATCH", delete: "DELETE"]
    static responseFormats = ['json', 'xml']
	
	PatientController() {
		super()
		profileClass = PatientProfile
	}
	
	def index() {
		
	}
	
	def query() {
		def queryParams = [RoleGroup.findByName('GROUP_PATIENT')]
		
		String queryString = "select u.id, u.profile from UserRoleGroup urg join urg.user u where urg.roleGroup = ?"
		if (params.name) {
			queryString += "and (lower(u.profile.firstName) like lower('%${params.name}%') or lower(u.profile.middleName) like lower('%${params.name}%') or lower(u.profile.lastName) like lower('%${params.name}%'))"
		}
		if (params.mrn) {
			queryString += "and lower(u.profile.medicalRecordNumber) like lower('%${params.mrn}%')"
		}
		
		def patients = User.executeQuery(queryString, queryParams)
		patients = patients.collect {
			return [id:it[0],profile:it[1]]
		}
		
		respond patients
	}
	
	@Override
	protected Collection<RoleGroup> getRoleGroups(User user) {
		return [RoleGroup.findByName('GROUP_PATIENT')]
	}
	
}
