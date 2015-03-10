angular.module('nmr.controllers.patient', ['nmr.services.dao', 'nmr.services.tags', 'nmr.constants']).controller('PatientCtrl', ['$scope', '$log', 'Tags', 'Patient', function($scope, $log, Tags, Patient) {
	
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

angular.module('nmr.controllers.patient').controller('PatientsCtrl', ['$scope', '$log', 'Patient', function($scope, $log, Patient) {
	
	$scope.name = '';
	$scope.mrn = '';
	$scope.patients = [];
	
	$scope.itemsPerPage = 2;
	$scope.totalPatients = 0; // TODO: TY - currently not used; but could be to save performance: total-items="totalPatients"
	
	// Watch form fields to reload patient data:
	function loadPatientData() {
		Patient.query({name: $scope.name, mrn: $scope.mrn}, function(patients){
			$scope.patients = patients;
			$scope.totalPatients = $scope.patients ? $scope.patients.length : 0;
		});
	}
	
    $scope.$watchGroup(['name', 'mrn'], loadPatientData);
	
}]);