import grails.converters.JSON

import com.pyrsana.nmr.converters.marshaller.SelectivelyDeepNoClassJsonMarshaller

class BootStrap {

    def init = { servletContext ->
		
		JSON.registerObjectMarshaller(new SelectivelyDeepNoClassJsonMarshaller())
		
    }
    def destroy = {
    }
}
