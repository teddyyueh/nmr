package com.pyrsana.nmr.contact

/**
 * Implementations have information regarding how to contact an entity, be it a user or otherwise.
 */
interface ContactInformation {

	/**
	 * 
	 * @return The contact information for the instance.
	 */
	String getInfo()
	
	/**
	 * 
	 * @param info The contact information to use in the instance.
	 */
	void setInfo(String info)
	
	/**
	 * 
	 * @return The type of information in the instance.
	 */
	Type getType()
	
	/**
	 * 
	 * @param type The type of information in the instance.
	 */
	void setType(Type type)
	
}
