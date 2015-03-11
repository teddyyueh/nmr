angular.module('nmr.controllers.patient', ['nmr.services.dao', 'nmr.services.patient', 'nmr.services.tags', 'nmr.constants']).controller('PatientCtrl', ['$scope', '$log', 'Tags', 'Patient', 'PatientDataService', '$modalInstance', function($scope, $log, Tags, Patient, PatientDataService, $modalInstance) {
	
	$scope.patient = Patient.create();
	
	$scope.openDatepicker = function($event) {
	    $event.preventDefault();
	    $event.stopPropagation();
	    $scope.datepickerOpened = true;
	};
	
	$scope.save = function() {
		var create = !($scope.patient.id);
		new Patient($scope.patient).$save(function(p, responseHeaders){
			$scope.patient = p;
			if (create) {
				PatientDataService.addPatient(p);
			}
			$modalInstance.close(p);
		});
	}
	
}]);

angular.module('nmr.controllers.patient').controller('PatientsCtrl', ['$scope', '$log', 'Patient', 'PatientDataService', function($scope, $log, Patient, PatientDataService) {
	
	$scope.name = '';
	$scope.mrn = '';
	$scope.patients = PatientDataService.getPatients();
	
	$scope.itemsPerPage = 2;
	$scope.totalPatients = 0; // TODO: TY - currently not used; but could be to save performance: total-items="totalPatients"
	
	// Watch form fields to reload patient data:
	function loadPatientData() {
		Patient.query({name: $scope.name, mrn: $scope.mrn}, function(patients){
			PatientDataService.setPatients(patients);
			//$scope.patients = patients;
			$scope.totalPatients = $scope.patients ? $scope.patients.length : 0;
		});
	}
	
    $scope.$watchGroup(['name', 'mrn'], loadPatientData);
	
}]);