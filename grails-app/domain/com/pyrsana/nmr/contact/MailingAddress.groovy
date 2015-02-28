package com.pyrsana.nmr.contact

class MailingAddress implements ContactInformation {

	static transients = ['info']
	
	String streetAddress
	String city
	String state
	String zipCode
	Type type
	
    static constraints = {
		streetAddress size:1..255
		city size:1..255
		state size:2..2
		zipCode size:6..12
    }
	
	@Override
	String getInfo() {
		return "${streetAddress}, ${city}, ${state} ${zipCode}"
	}
	
	/**
	 * Parses the given info for field values.
	 * 
	 * @param info Mailing address expected in the form of "streetAddress, city, state, zipCode". Info parts will be trimmed before set.
	 */
	@Override
	void setInfo(String info) {
		List<String> fieldOrder = ['streetAddress', 'city', 'state', 'zipCode']
		String[] infoParts = info?.split(',')
		infoParts.eachWithIndex { String part, index ->
			this[fieldOrder[index]] = part.trim()
		}
	}
	
}
