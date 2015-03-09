package com.pyrsana.nmr.security

import com.pyrsana.nmr.contact.EmailAddress
import com.pyrsana.nmr.contact.MailingAddress
import com.pyrsana.nmr.contact.PhoneNumber

class UserProfile {
	
	static hasMany = [phoneNumbers:PhoneNumber, mailingAddresses:MailingAddress, emailAddresses:EmailAddress]

	String firstName
	String middleName
	String lastName
	String gender // 'm' or 'f'
	
    static constraints = {
		firstName size:1..50
		middleName nullable:true, size:0..50
		lastName size:1..50
		gender size:0..1, nullable:true
    }
	
	static mapping = {
		tablePerHierarchy true
	}
	
}
