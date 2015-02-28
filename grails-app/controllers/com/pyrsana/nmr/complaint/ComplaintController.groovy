package com.pyrsana.nmr.complaint

import static org.springframework.http.HttpStatus.*
import grails.rest.RestfulController;
import grails.transaction.Transactional


class ComplaintController extends RestfulController {
	
	static responseFormats = ['json', 'xml']

	ComplaintController() {
		super(Complaint)
	}
    
	@Override
	public Object create() {
		return super.create()
	}
	
}
