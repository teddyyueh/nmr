package com.pyrsana.nmr.complaint

import grails.rest.Resource

/**
 * Domain that tracks a patient's complaint that a doctor addresses.
 * 
 * @author Teddy
 *
 */
@Resource()
class Complaint {
	
	static hasMany = [locations:Location]
	
	int severity = 5
	Date onsetDate = new Date()
	String comments = ''
	boolean resolved = false
	
    static constraints = {
		severity min:1, max:10
		onsetDate max:new Date()
		comments nullable:true, maxSize: 9999
    }
	
	static mapping = {
		comments sqlType: 'blob'
	}

	
}
