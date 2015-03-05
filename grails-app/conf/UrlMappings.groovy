import com.pyrsana.nmr.security.PatientProfile;

class UrlMappings {

	static mappings = {
		
		"/rest/complaint"(resources:"complaint")
		"/rest/patient"(resources:"user") {
			profileClass = PatientProfile
		}
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
