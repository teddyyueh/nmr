import grails.converters.JSON

import com.pyrsana.nmr.converters.marshaller.SelectivelyDeepNoClassJsonMarshaller
import com.pyrsana.nmr.security.PatientProfile
import com.pyrsana.nmr.security.Role
import com.pyrsana.nmr.security.RoleGroup
import com.pyrsana.nmr.security.RoleGroupRole
import com.pyrsana.nmr.security.User
import com.pyrsana.nmr.security.UserRoleGroup;

class BootStrap {

    def init = { servletContext ->
		
		// Allow controllers to specify which models to render deeply in JSON via adding '.deep' to the property name:
		JSON.registerObjectMarshaller(new SelectivelyDeepNoClassJsonMarshaller())
		
		User teddy = new User(username:'tyueh', password:'duh', profile: new PatientProfile(firstName:'Teddy', lastName:'Yueh', medicalRecordNumber:'NMR-001')).save()
		User carol = new User(username:'cyueh', password:'duh', profile: new PatientProfile(firstName:'Carol', middleName: 'Cui', lastName:'Yueh', medicalRecordNumber:'NMR-002')).save()
		User ivo = new User(username:'iyueh', password:'duh', profile: new PatientProfile(firstName:'Ivo', lastName:'Ma', medicalRecordNumber:'NMR-003')).save()
		User ck = new User(username:'cma', password:'duh', profile: new PatientProfile(firstName:'CK', lastName:'Ma')).save()
		
		RoleGroup patientGroup = new RoleGroup(name:'GROUP_PATIENT').save()
		Role patientRole = new Role(authority:'ROLE_PATIENT').save()
		RoleGroupRole.create(patientGroup, patientRole)
		
		UserRoleGroup.create(teddy, patientGroup)
		UserRoleGroup.create(carol, patientGroup)
		UserRoleGroup.create(ivo, patientGroup)
		
    }
	
    def destroy = {
    }
}
