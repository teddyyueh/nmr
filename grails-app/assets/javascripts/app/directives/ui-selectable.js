/**
 * Functionality for making elements selectable. Selected items will be available for access in $rootScope.uiSelections, which is an
 * associative array of element ids. The keys are the ids of top level element whose descendents are selectable and the values are the
 * ids of the selected descendents.
 */
(function(uiSelectable, $, undefined ) {

	/**
	 * Directive that defers to jQuery UI's Selectable widget. 
	 */
	angular.module('nmr.directives.uiSelectable', []).directive('uiSelectable', [function() {
	    return {
	        restrict: 'A',
	        link: function (scope, $element, attrs) {
	        	// Make descendents selectable:
	        	var options = common.eval(scope, attrs.uiSelectable) || {};
	            $element.selectable(options);
	        }
	    }
	}]);

}( window.uiSelectable = window.uiSelectable || {}, jQuery ));