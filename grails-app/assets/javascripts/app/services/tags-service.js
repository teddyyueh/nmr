/**
 * Service that provides basic CRUD operations for all domain resources.
 */
angular.module('nmr.services.tags', []).factory('Tags', ['$http', '$q', function($http, $q) {
	
	var service = {data:{}};
	
	service.load = function(key, url) {
        $http.get(url).success(function(response) {
            service.data[key] = response;
        });
    };
	
	service.search = function(key, query, fieldName, maxRecords) {
        var filterFunction, deferred = $q.defer();
        
        if (fieldName) {
        	filterFunction = function(x) { return x[fieldName] ? x[fieldName].toLowerCase().indexOf(query.toLowerCase()) > -1 : false; };
        }
        else {
        	filterFunction = function(x) { return x.toLowerCase().indexOf(query.toLowerCase()) > -1; };
        }

        var items = _.chain(service.data[key])
            .filter(filterFunction)
            .take(maxRecords || 10)
            .value();

        deferred.resolve(items);
        return deferred.promise;
    }
	
	service.data['locations'] = [
	                             {id:1, name:'head', label:'Head'},
	                             {id:1, name:'neck', label:'Neck'},
	                             {id:1, name:'arm', label:'Arm'},
	                             {id:1, name:'back', label:'Back'},
	                             {id:1, name:'thumb', label:'Thumb'},
	                             {id:1, name:'pinky finger', label:'Pinky Finger'},
	                             {id:1, name:'index finger', label:'Index Finger'},
	                             {id:1, name:'middle finger', label:'Middle Finger'},
	                             {id:1, name:'ring finger', label:'Ring Finger'},
	                             {id:1, name:'butt', label:'Butt'},
	                             {id:1, name:'elbow', label:'Elbow'},
	                             {id:1, name:'knee', label:'Knee'},
	                             {id:1, name:'thigh', label:'Thigh'},
	                             {id:1, name:'nose', label:'Nose'}
	];
	
	return service;
	
}]);
