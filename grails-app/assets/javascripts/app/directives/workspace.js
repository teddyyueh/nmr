'use strict';

/**
 * Functionality for making individual draggable panels that consider other selected panels during drag. Panels can be interacted with at a grouped and/or selected level.
 * 
 * A grouping of panels is a layer. A panel can be part of multiple layers. Panels selected by the user form a makeshift layer.
 * 
 * In markup, each layer can be a wrapper div. Changing z position can be as simple as moving them between wrapper divs. z-index may not have to be changed, but rather the div the panel is in.
 */
angular.module('nmr.directives.workspace', ['nmr.directives.uiSelectable', 'nmr.services.uiSelectable']).directive('workspace', [function() {
    return {
        restrict: 'A',
        transclude: true,
        replace: true,
        template: '<div class="workspace" data-ui-selectable=\'{"filter": "[data-workspace-panel]", "cancel": "[data-workspace-panel],[data-workspace-panel-trigger],[data-unselectable]"}\' ng-transclude></div>'
    }
}]).factory('workspacePanelService', ['$http', '$templateCache', '$compile', '$controller', 'uiSelectableService', function($http, $templateCache, $compile, $controller, uiSelectableService) {

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
	 * @param panelParams Object that contains params to use in creating the panel.
	 * 				$workspace Element representing the workspace to add the new panel to.
	 * 				templateUrl Path to the desired template to load as the new workspace panel.
	 * 				panelAttr String to set data-workspace-panel attr.
	 * 				httpParams Object to pass to $http during template retrieval
	 * 				controller The name of the controller to apply
	 * 				ctrlLocals Object to pass to $controller when invoking the controller.
	 * 				scope The scope to use as the parent scope during template compilation.
	 * 				scopeParams Values to set in the panel scope.
	 */
	workspacePanelService.createPanel = function(panelParams){
		$http.get(panelParams.templateUrl, {
			params: panelParams.httpParams || {},
            cache: $templateCache
        }).then(function(response) {
        	// Populate the new scope:
        	var parentScope = panelParams.scope || angular.element($workspace).scope();
        	var panelScope = parentScope.$new();
        	
        	// Apply controller:
        	var ctrlInstance
        	if (panelParams.controller) {
        		var ctrlLocals = panelParams.ctrlLocals || {};
        		ctrlLocals.$scope = panelScope;
        		ctrlInstance = $controller(panelParams.controller, ctrlLocals);
        	}
        	
        	// Apply scope updates:
            angular.forEach(panelParams.scopeParams || {}, function(value, key) {
            	panelScope[key] = value;
            });
        	
        	// Insert content prior to compiling it to account for directives that need depend on context (e.g. workspacePanel needs to find the closest workspace):
        	var $content = $('<div data-workspace-panel="' + (panelParams.panelAttr || '{}') + '">' + response.data + '</div>');
        	panelParams.$workspace.append($content);
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
	            	if ($workspace.length == 0) {
	            		throw new Error('workspacePanelTrigger must be used within a workspace or have a workspaceSelector attr provided.');
	            	}
	            	if (!attrs.templateUrl) {
	            		throw new Error('workspacePanelTrigger must have a templateUrl attr provided.');
	            	}
	            	workspacePanelService.createPanel({
	            		$workspace: $workspace,
	            		templateUrl: attrs.templateUrl,
	            		controller: attrs.useCtrl,
	            		ctrlLocals: common.eval(scope, attrs.ctrlLocals),
	            		panelAttr: attrs.panelAttr,
	            		httpParams: common.eval(scope, attrs.httpParams),
	            		scope: angular.element($workspace).scope(),
	            		scopeParams: common.eval(scope, attrs.scopeParams)
	            	});
	            });
	        });
		}
	};
	
}]).run(['$log', '$rootScope', function($log, $rootScope){
	// Populate $rootScope with properties to support grouping: 
	$rootScope.layers = {};
	$log.info('Initialized workspace panels');
}]);