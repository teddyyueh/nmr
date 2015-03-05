package com.pyrsana.nmr.security

import grails.rest.Resource;

/**
 * Represents Spring Security user. Additions to the generated class from the s2-quickstart script is a UserProfile field:
 *  
 * 1) Each user can have a different profile instance/class. This way, all users can share the same user class, but depend on a different profile
 * in order to have different fields/functionality.
 */
@Resource()
class User {
	
	transient springSecurityService

	UserProfile profile
	String username
	String password
	boolean enabled = true
	boolean accountExpired
	boolean accountLocked
	boolean passwordExpired

	static transients = ['springSecurityService']

	static constraints = {
		username blank: false, unique: true
		password blank: false
	}

	static mapping = {
		password column: '`password`'
	}

	Set<RoleGroup> getAuthorities() {
		UserRoleGroup.findAllByUser(this).collect { it.roleGroup }
	}

	def beforeInsert() {
		encodePassword()
	}

	def beforeUpdate() {
		if (isDirty('password')) {
			encodePassword()
		}
	}

	protected void encodePassword() {
		password = springSecurityService?.passwordEncoder ? springSecurityService.encodePassword(password) : password
	}
}
