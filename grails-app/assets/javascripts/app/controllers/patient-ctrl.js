angular.module('nmr.controllers.patient', ['nmr.services.dao', 'nmr.services.tags', 'nmr.constants']).controller('PatientCtrl', ['$scope', '$log', 'Tags', 'Patient', 'PARTIALS_ROOT', function($scope, $log, Tags, Patient, PARTIALS_ROOT) {
	
	$scope.patient = Patient.create();
	
	$scope.openDatepicker = function($event) {
	    $event.preventDefault();
	    $event.stopPropagation();
	    $scope.datepickerOpened = true;
	};
	
	// TODO: TY - Actually implement this:
	$scope.loadUserGroups = function($query) {
        return Tags.search('userGroups', $query, 'name');
    }
	
}]);

angular.module('nmr.controllers.patient').controller('PatientsCtrl', ['$scope', '$log', 'Patient', 'PARTIALS_ROOT', function($scope, $log, Patient, PARTIALS_ROOT) {
	
	$scope.name = '';
	$scope.mrn = '';
	$scope.patients = [];
	
	// Watch form fields to reload patient data:
	function loadPatientData() {
		Patient.query({name: $scope.name, mrn: $scope.mrn}, function(patients){
			$scope.patients = patients;
		});
	}
	
    $scope.$watchGroup(['name', 'mrn'], loadPatientData);
	
}]);