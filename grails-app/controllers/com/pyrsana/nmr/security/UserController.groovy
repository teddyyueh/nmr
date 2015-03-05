package com.pyrsana.nmr.security

import grails.rest.RestfulController

class UserController extends RestfulController {

    static responseFormats = ['json', 'xml']
	
	UserController() {
		super(User)
	}
	
	@Override
	public Object create() {
		if(handleReadOnly()) {
			return
		}
		respond(createResource(), [includes:['profile.deep'], excludes:['password']])
	}
	
	@Override
	protected Object createResource() {
		def instance = resource.newInstance()
		def bindObject = getObjectToBind()
		
		// Make sure the profile is instantiated with the right class:
		if (!bindObject.profile?.id && params.profileClass) {
			instance.profile = params.profileClass.newInstance()
		}
		
		bindData(instance, bindObject, [exclude: ['password']])
		return instance
	}
	
	@Override
	protected Object getObjectToBind() {
		
		return super.getObjectToBind()
	}
	
}
