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

