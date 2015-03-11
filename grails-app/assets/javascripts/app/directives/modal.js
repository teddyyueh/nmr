/**
 * Directive that opens a Bootstrap modal dialog when triggered.
 */
angular.module('nmr.directives.modal', ['ui.bootstrap']).directive('modalTrigger', ['$modal', '$templateRequest', function($modal, $templateRequest) {
    return {
        restrict: 'A',
        link: function (scope, $element, attrs) {
        	// Preload the template, if necessary:
			if (common.eval(scope, attrs.preload)) {
				$templateRequest(attrs.templateUrl);
			}
        	
        	$element.bind(attrs.modalTrigger || 'click', function(event) {
        		var modalArgs = {
            			templateUrl: attrs.templateUrl,
            			size: attrs.size || 'lg',
            			backdrop: (angular.isDefined(attrs.backdrop) ? angular.fromJson(attrs.backdrop) : true),
            			windowClass: attrs.windowClass || '',
            			resolve: common.eval(scope, attrs.resolve) || {},
            			scope: attrs.scope
            	};
        		if (attrs.useCtrl) {
        			modalArgs.controller = attrs.useCtrl;
        		}
            	scope.modalInstance = $modal.open(modalArgs);
                scope.modalInstance.result.then(function(value){
                    console.log('Modal finished:' + value);
                    if (attrs.resultHandler) {
                    	var handler = common.eval(scope, attrs.resultHandler);
                    	handler(value);
                    }
                }, function(value){
                    console.log('Modal dismissed at : ' + new Date());
                    if (attrs.dismissHandler) {
                    	var handler = common.eval(scope, attrs.dismissHandler);
                    	handler(value);
                    }
                });
	        });
        }
    };
}]);