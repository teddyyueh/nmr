/**
 * Service that provides data cache for Patient.
 */
angular.module('nmr.services.patient', ['nmr.services.dao.patient']).factory('PatientDataService', [function() {
	
	var patients = [];
	var service = {};
	
	service.getPatients = function(){
		return patients;
	}
	
	service.setPatients = function(newPatients){
		patients.length = 0;
		angular.forEach(newPatients, function(newPatient){
			service.addPatient(newPatient);
		});
	}
	
	service.addPatient = function(newPatient){
		patients.push(newPatient);
	}
	
	return service;
}]);
