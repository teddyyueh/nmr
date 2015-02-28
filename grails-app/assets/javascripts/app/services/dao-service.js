/**
 * Service that provides basic CRUD operations for all domain resources.
 */
angular.module('nmr.services.dao', ['ngResource', 'nmr.constants']).factory('DAO', ['$resource', '$http', 'CONTEXT_PREFIX', function($resource, $http, CONTEXT_PREFIX) {
	
	var urlPatternPrefix = CONTEXT_PREFIX + '/rest/:resourceName';
	var defaultTimeoutMillis = 20000; // TODO: TY - make this a constant?
	
	// Use Grails defaults for URLs (http://grails.github.io/grails-doc/latest/guide/single.html#extendingRestfulController):
	return $resource(urlPatternPrefix + '/:id', {
        format:'json', callback:'JSON_CALLBACK'},{
        'get':   {method:'GET', timeout:defaultTimeoutMillis},
        'query': {method:'GET', isArray: true, timeout:defaultTimeoutMillis},
        'save':  {method:'POST', url: urlPatternPrefix, timeout:defaultTimeoutMillis},
        'update':{method:'PUT', timeout:defaultTimeoutMillis},
        'delete':{method:'DELETE', timeout:defaultTimeoutMillis},
        'create':{method:'GET', url:urlPatternPrefix + '/create', timeout:defaultTimeoutMillis},
        'edit':  {method:'GET', url:urlPatternPrefix + '/:id/edit', timeout:defaultTimeoutMillis}
    });
	
}]);
