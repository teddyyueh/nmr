package com.pyrsana.nmr.contact

class PhoneNumber implements ContactInformation {

	String info
	Type type
	
    static constraints = {
		info size:10..20, matches: "[0-9]+"
    }
}
