package com.pyrsana.nmr.complaint

/**
 * Domain that tracks where a complaint is on the body.
 * 
 * @author Teddy
 *
 */
class Location {
	
	String name
	String label
	boolean enabled = true
	
	Date dateCreated
	Date lastUpdated

    static constraints = {
		label nullable:true
    }
	
	String getLabel() {
		return label ?: name
	}
	
}
