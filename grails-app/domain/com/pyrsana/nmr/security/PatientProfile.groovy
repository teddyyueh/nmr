package com.pyrsana.nmr.security

class PatientProfile extends UserProfile {

	Date birthdate
	String medicalRecordNumber
	
	String insuranceMemberId
	String insuranceGroup
	String insurancePlan
	
    static constraints = {
		medicalRecordNumber unique:true, size:0..255, nullable:true
		insuranceMemberId blank:true, nullable:true
		insuranceGroup blank:true, nullable:true
		insurancePlan blank:true, nullable:true
		birthdate nullable: true
    }
	
	static mapping = {
		medicalRecordNumber index:'medicalRecordNumber_idx'
		insurancePlan index:'insurancePlan_idx'
	}
	
}
