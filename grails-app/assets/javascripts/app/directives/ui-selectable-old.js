/**
 * Functionality for making elements selectable. Selected items will be available for access in $rootScope.uiSelections, which is an
 * associative array of element ids. The keys are the ids of top level element whose descendents are selectable and the values are the
 * ids of the selected descendents.
 * 
 * TODO: TY - Consider watching 'class' on each selectable descendent (can be determined by checking 'filter' option) to add/remove ids from $rootScope.uiSelections based on existence of 'ui-selected'.
 */
(function(uiSelectable, $, undefined ) {

	/**
	 * Directive that defers to jQuery UI's Selectable widget. 
	 */
	angular.module('nmr.directives.uiSelectable.old', []).directive('uiSelectableOld', [function() {
	    return {
	        restrict: 'A',
	        link: function ($scope, $element, attrs) {
	        	// Make descendents selectable:
	        	var options = attrs.selectableOptions ? angular.fromJson(attrs.selectableOptions) : {};
	        	options = uiSelectable.normalizeSelectableOptions($scope, $element, attrs, options);
	            $element.selectable(options);
	        }
	    }
	}]).run(['$log', '$rootScope', function($log, $rootScope){
		// Populate $rootScope with properties to support selection tracking: 
		$rootScope.uiSelections = {};
	}]);
	
	uiSelectable.normalizeSelectableOptions = function($scope, $element, attrs, initialOptions) {
		
		var options = {
				
		};
		
		angular.extend(options, initialOptions);
		
		// Always track selections:
		var trackSelectionInScope = function(event, ui) {
			var key = $element.attr('id');
			if (!$scope.uiSelections[key]) {
				$scope.uiSelections[key] = [];
			}
			var selectedElementId = $(ui.selected).attr('id');
			var selectedElementIds = $scope.uiSelections[key];
			if ($.inArray(selectedElementId, selectedElementIds) < 0) {
				selectedElementIds.push(selectedElementId);
			}
		};
		if (options.selected) {
			var existingSelected = options.selected;
			options.selected = function(event, ui) {
				trackSelectionInScope(event, ui);
				existingSelected(event, ui);
			};
		}
		else {
			options.selected = trackSelectionInScope;
		}

		// Always track unselections:
		var trackUnselectionInScope = function(event, ui) {
			var key = $element.attr('id');
			var unselectedId = $(ui.unselected).attr('id');
			var selections = $scope.uiSelections[key];
			if ($.inArray(unselectedId, selections) > -1) {
				selections.splice($.inArray(unselectedId, selections), 1);
			}
		};
		if (options.unselected) {
			var existingUnselected = options.unselected;
			options.unselected = function(event, ui) {
				trackUnselectionInScope(event, ui);
				existingUnselected(event, ui);
			};
		}
		else {
			options.unselected = trackUnselectionInScope;
		}
		
		// Always look for unselected orphans after a select operation:
		var removeUnselectedOrphans = function(event, ui) {
			var key = $element.attr('id');
			var selections = $scope.uiSelections[key] || [];
			var unselectedOrphans = [];
			$.each(selections, function(index, selectedElementId) {
				var $selection = $('#' + selectedElementId, $element);
				if (!$selection.hasClass('ui-selected')) {
					unselectedOrphans.push(selectedElementId);
				}
			});
			$.each(unselectedOrphans, function(index, unselectedElementId) {
				selections.splice($.inArray(unselectedElementId, selections), 1);
			});
		};
		if (options.stop) {
			var existingStop = options.stop;
			options.stop = function(event, ui) {
				removeUnselectedOrphans(event, ui);
				existingStop(event, ui);
			};
		}
		else {
			options.stop = removeUnselectedOrphans;
		}
		
		return options;
	};

}( window.uiSelectable = window.uiSelectable || {}, jQuery ));