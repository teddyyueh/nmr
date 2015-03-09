/**
 * Service that provides CRUD operations for Patient.
 */
angular.module('nmr.services.dao.patient', ['ngResource', 'nmr.constants', 'nmr.services.dao']).factory('Patient', ['$resource', '$http', 'CONTEXT_PREFIX', function($resource, $http, CONTEXT_PREFIX) {
	
	var urlPatternPrefix = CONTEXT_PREFIX + '/rest/patient';
	var dateFields = ['birthdate'];
	var defaultTimeoutMillis = 20000; // TODO: TY - make this a constant?
	
	var transformRequestFunctions = [function(data, headersGetter){
		common.convertToServerDates(data, dateFields);
		return data;
	}].concat($http.defaults.transformRequest);
	
	var transformResponseFunctions = [function(data, headersGetter){
		var converter = angular.isArray(data) ? common.convertFromServerDatesArray : common.convertFromServerDates;
		converter(data, dateFields);
		return data;
	}].concat($http.defaults.transformResponse);
	
	var defaultOptions = {
			transformRequest:transformRequestFunctions, 
			transformResponse:transformResponseFunctions, 
			timeout:defaultTimeoutMillis
	};
	
	// Use Grails defaults for URLs (http://grails.github.io/grails-doc/latest/guide/single.html#extendingRestfulController):
	return $resource(urlPatternPrefix + '/:id', {
        format:'json', callback:'JSON_CALLBACK'},{
        'get':   angular.extend({method:'GET'}, defaultOptions),
        'query': angular.extend({method:'GET', isArray: true, url: '/patient/query'}, defaultOptions),
        'save':  angular.extend({method:'POST', url: urlPatternPrefix}, defaultOptions),
        'update':angular.extend({method:'PUT'}, defaultOptions),
        'delete':angular.extend({method:'DELETE'}, defaultOptions),
        'create':angular.extend({method:'GET', url:urlPatternPrefix + '/create'}, defaultOptions),
        'edit':  angular.extend({method:'GET', url:urlPatternPrefix + '/:id/edit'}, defaultOptions)
    });
	
}]);
