package com.pyrsana.nmr.complaint

import grails.rest.Resource

/**
 * Domain that tracks where a {@link Complaint} is on the body.
 * 
 * @author Teddy
 *
 */
@Resource(formats=['json', 'xml'])
class Location {
	
	String name
	String label
	boolean enabled = true
	
	Date dateCreated
	Date lastUpdated

    static constraints = {
		name: unique: true
		label nullable:true
    }
	
	String getLabel() {
		return label ?: name
	}
	
}
