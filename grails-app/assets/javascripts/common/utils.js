(function(common, $, undefined ) {

	/**
	 * Wraps a given function with before and/or after functions as well as an optional arg to represent 'this'.
	 */
	common.wrapFunctions = function (functionToWrap, before, after, thisObject) {
	    return function () {
	        var args = Array.prototype.slice.call(arguments), result;
	        if (before) {
	        	before.apply(thisObject || this, args);
	        }
	        result = functionToWrap.apply(thisObject || this, args);
	        if (after) {
	        	after.apply(thisObject || this, args);
	        }
	        return result;
	    };
	};

}( window.common = window.common || {}, jQuery ));