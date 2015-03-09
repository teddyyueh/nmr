'use strict';

/**
 * Functionality for making draggable, selectable panels that can be interacted with at a grouped and/or selected level.
 * 
 * A grouping of panels is a layer. A panel can be part of multiple layers. Panels selected by the user form a makeshift layer.
 * 
 * In markup, each layer can be a wrapper div. Changing z position can be as simple as moving them between wrapper divs. z-index may not have to be changed, but rather the div the panel is in.
 */
(function(workspace, $, undefined ) {
	
	/**
	 * Directive that chains other directives together to prepare workspaces.  
	 */
	angular.module('nmr.directives.workspace', ['nmr.directives.uiSelectable']).directive('workspace', [function() {
	    return {
	        restrict: 'A',
	        transclude: true,
	        replace: true,
	        template: '<div class="workspace" data-ui-selectable=\'{"filter": "[data-workspace-panel]", "cancel": "[data-workspace-panel],[data-workspace-panel-trigger],[data-unselectable]"}\' ng-transclude></div>'
	    }
	}]);
	
}( window.workspace = window.workspace || {}, jQuery ));