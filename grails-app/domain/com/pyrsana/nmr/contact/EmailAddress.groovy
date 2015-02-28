package com.pyrsana.nmr.contact

class EmailAddress implements ContactInformation {

	String info
	Type type
	
    static constraints = {
		info email:true, size:6..255
    }
	
}
