'use strict';

// TODO: TY - Create generic modal form opener. Resolve the model instance in the delegated to controller.
angular.module('nmr.controllers.complaint', ['nmr.services.dao', 'nmr.services.tags']).controller('ComplaintCtrl', ['$scope', '$modal', '$resource', '$routeParams', '$log', '$location', 'Tags', 'Complaint', function($scope, $modal, $resource, $routeParams, $log, $location, Tags, Complaint) {
	
	$scope.openComplaintModal = function(id, size) {
		var modalInstance = $modal.open({
			templateUrl: '/complaint/form.html',
			controller: 'ModalComplaintCtrl',
			size: size,
			resolve: {
				complaintInstance: function () {
						return id ? Complaint.get({id:id}) : Complaint.create();
		        }
			}
		});

		modalInstance.result.then(function(complaint) {
			$log.info('TODO: TY - Determine whether saved?');
			$log.info(complaint);
		}, function() {
			$log.info('Modal dismissed at: ' + new Date());
		});
	}
	
	// TODO: TY - Use $routeParams to determine whether to create or get:
	console.log('$routeParams are:');
	console.log($routeParams);
	$scope.complaintInstance = Complaint.create();
	
	$scope.$on('$routeChangeSuccess', function(event, toState, toParams, fromState, fromParams){
	    // $routeParams will be populated here if this controller is used outside ng-view:
		console.log('$routeParams populated!');
		console.log($routeParams);
	});
	
	console.log('$location.search:');
	console.log($location.search());
	
	$scope.id = $scope.id || $routeParams.id || $location.search().id;
	
	console.log('id:' + $scope.id);
	
	$scope.maxDate = new Date();
	
	$scope.openDatepicker = function($event) {
	    $event.preventDefault();
	    $event.stopPropagation();
	    $scope.datepickerOpened = true;
	};
	
	$scope.loadLocations = function($query) {
        return Tags.search('locations', $query, 'label');
    }
	
}]);

angular.module('nmr.controllers.complaint').controller('ModalComplaintCtrl', [ '$scope', '$modalInstance', 'complaintInstance', function($scope, $modalInstance, complaintInstance) {
	$scope.complaintInstance = complaintInstance;
	$scope.maxDate = new Date();
	
	$scope.openDatepicker = function($event) {
	    $event.preventDefault();
	    $event.stopPropagation();
	    $scope.datepickerOpened = true;
	};
	
	$scope.save = function() {
		$modalInstance.close($scope.complaintInstance);
	}
	
	$scope.cancel = function () {
	    $modalInstance.dismiss('cancel');
	};
	
}]);
