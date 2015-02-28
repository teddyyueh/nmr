package com.pyrsana.nmr.complaint

import grails.test.mixin.TestFor
import spock.lang.Specification

/**
 * See the API for {@link grails.test.mixin.domain.DomainClassUnitTestMixin} for usage instructions
 */
@TestFor(Location)
class LocationSpec extends Specification {

    def setup() {
		
    }

    def cleanup() {
		Location.where { }.deleteAll()
    }

    void "test default grails binding"() {
		when:
			Location location = new Location(name:'Test Name', label: 'Test Label', enabled: false).save()
		then:
			location.id
			location.name == 'Test Name'
			location.label == 'Test Label'
			!location.enabled
    }
	
	void "test location without label and default enabled"() {
		when:
			Location location = new Location(name:'Test Name').save()
		then:
			location.id
			location.name == 'Test Name'
			location.label == 'Test Name'
			location.enabled
	}
	
}
