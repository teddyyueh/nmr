'use strict';

/**
 * Functionality for making individual draggable panels that consider other selected panels during drag. Panels can be interacted with at a grouped and/or selected level.
 * 
 * A grouping of panels is a layer. A panel can be part of multiple layers. Panels selected by the user form a makeshift layer.
 * 
 * In markup, each layer can be a wrapper div. Changing z position can be as simple as moving them between wrapper divs. z-index may not have to be changed, but rather the div the panel is in.
 */
(function(workspacePanel, $, undefined ) {
	
	/**
	 * Directive that wraps arbitrary content in jQuery UI's draggable functionality. Because of this, this directive transcludes and defines an empty scope.
	 * This way, the outer scope is what is available to templates, and not the inner one defined by this directive. The goal is to have arbitrary content.  
	 */
	angular.module('nmr.directives.workspacePanel', ['nmr.directives.workspace', 'nmr.services.uiSelectable']).directive('workspacePanel', ['uiSelectableService', function(uiSelectableService) {
	    return {
	        restrict: 'A',
	        transclude: true,
	        replace: true,
	        template: "<div ng-transclude></div>",
	        link: function (scope, $element, attrs) {
	        	// Make draggable:
	        	var options = attrs.draggableOptions ? angular.fromJson(attrs.draggableOptions) : {};
	        	options = workspacePanel.normalizeDraggableOptions(scope, $element, attrs, options, uiSelectableService);
	            $element.draggable(options);
	        }
	    }
	}]).run(['$log', '$rootScope', function($log, $rootScope){
		// Populate $rootScope with properties to support grouping: 
		$rootScope.layers = {};
		$log.info('Initialized workspace panels');
	}]);
	
	workspacePanel.normalizeDraggableOptions = function(scope, $element, attrs, initialOptions, uiSelectableService) {
		
		var options = {
				containment: $element.closest('[data-workspace]'),
				cursor: 'move',
				handle: '[data-draggable-handle]',
				snap: false
		};
		
		angular.extend(options, initialOptions);
		
		// Always track drag offsets of selected panels to apply across all selected panels:		
		var trackOffsetStart = function(event, ui) {
			// Store offset in containment element so it can be shared with other panels:
			var $workspace = $element.closest('[data-workspace]');
			$workspace.data('initialDragOffset', $(this).offset());
			
			var $selectedPanels = uiSelectableService.getSelectedElements($workspace);
			$selectedPanels.each(function(index, selectedPanel){
				var $selectedPanel = $(selectedPanel);
				$selectedPanel.data("offset", $selectedPanel.offset());
			});
		};		
		options.start = options.start ? common.wrapFunctions(options.start, trackOffsetStart) : trackOffsetStart;
		
		// Always drag all selected panels if one is being dragged:
		var trackOffsetDrag = function(event, ui) {
			var $workspace = $element.closest('[data-workspace]');
			var initialDragOffset = $workspace.data('initialDragOffset');
			var $draggedElement = $(this);
			var currentDragOffset = $draggedElement.offset();
			var dt = currentDragOffset.top - initialDragOffset.top, dl = currentDragOffset.left - initialDragOffset.left;
			
			var $selectedPanels = uiSelectableService.getSelectedElements($workspace);
			$selectedPanels.each(function(index, selectedPanel){
				var $selectedPanel = $(selectedPanel), offset = $selectedPanel.data("offset");
				$selectedPanel.offset({top: offset.top + dt, left: offset.left + dl});
			});
		};
		options.drag = options.drag ? common.wrapFunctions(options.drag, trackOffsetDrag) : trackOffsetDrag;
		
		return options;
	};
	
	
	
}( window.workspacePanel = window.workspacePanel || {}, jQuery ));