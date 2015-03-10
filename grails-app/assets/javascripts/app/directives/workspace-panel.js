'use strict';

/**
 * Functionality for making individual draggable panels that consider other selected panels during drag. Panels can be interacted with at a grouped and/or selected level.
 * 
 * A grouping of panels is a layer. A panel can be part of multiple layers. Panels selected by the user form a makeshift layer.
 * 
 * In markup, each layer can be a wrapper div. Changing z position can be as simple as moving them between wrapper divs. z-index may not have to be changed, but rather the div the panel is in.
 */
angular.module('nmr.directives.workspacePanel', ['nmr.directives.workspace', 'nmr.services.uiSelectable']).factory('workspacePanelService', ['$http', '$templateCache', '$compile', 'uiSelectableService', function($http, $templateCache, $compile, uiSelectableService) {

	var workspacePanelService = {};
	
	/**
	 * Sets up options to pass to draggable that support workspace panels with consideration to options already extracted/known.
	 * 
	 * @return object containing all known options to make the given element a draggable workspace panel.
	 */
	workspacePanelService.normalizeDraggableOptions = function(scope, $element, attrs, extractedOptions) {
		
		var options = {
				containment: $element.closest('[data-workspace]'),
				cursor: 'move',
				handle: '[data-draggable-handle]',
				snap: false
		};
		
		angular.extend(options, extractedOptions);
		
		// Always track drag offsets of selected panels to apply across all selected panels:		
		var trackOffsetStart = function(event, ui) {
			// Store offset in containment element so it can be shared with other panels:
			var $workspace = $element.closest('[data-workspace]');
			$workspace.data('initialDragOffset', $(this).offset());
			
			// TODO: TY - Check if clicked panel is part of selectedPanels with consideration to ctrl being pressed. Clear selectedPanels if this is a new selection:
			
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
	
	/**
	 * Add a new panel to the given workspace using the html template found at templateUrl. 
	 * A new scope will be created for the resulting panel. The parent scope will be the scope of the workspace.
	 * 
	 * NOTE: Be sure to wrap this function with scope.$apply if panel is to be processed by AngularJS. 
	 * 
	 * @param scope The scope being applied. (Currently just being passed just in case...)
	 * @param $workspace Element representing the workspace to add the new panel to.
	 * @param templateUrl Path to the desired template to load as the new workspace panel.
	 * @param params Params to send with $http request.
	 * @param scopeParams Values to update in the resulting scope.
	 */
	workspacePanelService.createPanel = function($workspace, templateUrl, params, scopeParams) {
		console.log('Creating panel from template: ' + templateUrl);
		$http.get(templateUrl, {
			params: params || {},
            cache: $templateCache
        }).then(function(response) {
        	// Populate the new scope:
        	var workspaceScope = angular.element($workspace).scope();
        	var panelScope = workspaceScope.$new();
        	angular.forEach(scopeParams || {}, function(value, key){
        		panelScope[key] = value;
        	});
        	
        	// TODO: TY - Wrap $content in data-workspace-panel div and look for a trigger (.panel, .panel-header):
        	
        	// Insert content prior to compiling it to account for directives that need depend on context (e.g. workspacePanel needs to find the closest workspace):
        	var $content = $(response.data);
            $workspace.append($content);
            $content.replaceWith($compile($content)(panelScope));
        });
	};
	
	return workspacePanelService;
	
}]).directive('workspacePanel', ['workspacePanelService', function(workspacePanelService) {
	/**
	 * Directive that wraps arbitrary content in jQuery UI's draggable functionality. Because of this, this directive transcludes and defines an empty scope.
	 * This way, the outer scope is what is available to templates, and not the inner one defined by this directive. The goal is to have arbitrary content.  
	 */
    return {
        restrict: 'A',
        link: function (scope, $element, attrs) {
        	// Make panels draggable and selectable:
        	var options = common.eval(scope, attrs.workspacePanel) || {};
        	options = workspacePanelService.normalizeDraggableOptions(scope, $element, attrs, options);
            $element.draggable(options);
        }
    };
    
}]).directive('workspacePanelTrigger', ['$routeParams', '$templateRequest', 'workspacePanelService', function($routeParams, $templateRequest, workspacePanelService){
	return {
		restrict: 'A',
		link: function(scope, $element, attrs) {
			// Preload the template, if necessary:
			if (common.eval(scope, attrs.preload)) {
				$templateRequest(attrs.templateUrl);
			}
			
			// Create new panel on click:
			$element.bind(attrs.workspacePanelTrigger || 'click', function(event) {
	            scope.$apply(function() {
	            	var $workspace = attrs.workspaceSelector ? $(attrs.workspaceSelector) : $element.closest('[data-workspace]');
	            	workspacePanelService.createPanel($workspace, attrs.templateUrl, common.eval(scope, attrs.workspacePanelParams), common.eval(scope, attrs.workspacePanelScopeParams));
	            });
	        });
		}
	};
	
}]).run(['$log', '$rootScope', function($log, $rootScope){
	// Populate $rootScope with properties to support grouping: 
	$rootScope.layers = {};
	$log.info('Initialized workspace panels');
}]);