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
	
	def teddy() {
		log.info("huh")
	}
	
	@Override
	protected Object createResource() {
		def instance = resource.newInstance()
		def bindObject = getObjectToBind()
		
		// Make sure the profile is instantiated with the right class:
		if (!bindObject.profile?.id && params.profileClass) {
			instance.profile = params.profileClass.newInstance()
		}
		
		if (params.id) {
			bindData(instance, bindObject, [exclude: ['password']])
		}
		else {
			bindData(instance, bindObject)
		}
		return instance
	}
	
	@Override
	protected Object getObjectToBind() {
		return request.JSON
	}
	
}
