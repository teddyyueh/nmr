import com.pyrsana.nmr.security.PatientProfile;

class UrlMappings {

	static mappings = {
		
		"/rest/complaint"(resources:"complaint")
		"/rest/complaint-location"(resources:"location")
		
		"/rest/$controller/$action/$id?(.$format)?"{
			constraints {
				
			}
		}
		
		"/rest/$controller"{
			action = [GET:'show', PUT:'update', DELETE:'delete', POST:'save']
			constraints {
				
			}
		}
		
        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }

        "/"(view:"/index")
        "500"(view:'/error')
	}
}
