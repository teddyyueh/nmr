(function(uiSelectable, $, undefined ) {

	/**
	 * Service that knows how to leverage jQuery UI's Selectable widget, which is applied in the nmr.directives.uiSelectable module.
	 */
	angular.module('nmr.services.uiSelectable', ['nmr.directives.uiSelectable']).factory('uiSelectableService', [function() {
	    var service = {};
	    
	    service.getSelectedElements = function($selectableContainer) {
	    	return $selectableContainer.find('.ui-selected');
	    };
	    
	    return service;
	}]);
	

}( window.uiSelectable = window.uiSelectable || {}, jQuery ));