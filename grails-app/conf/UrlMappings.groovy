class UrlMappings {

	static mappings = {
		
		"/rest/complaint"(resources:"complaint")
		"/rest/complaint-location"(resources:"location")
		
        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }

        "/"(view:"/index")
        "500"(view:'/error')
	}
}
