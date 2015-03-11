(function(common, $, undefined) {

	/**
	 * Determines the true value of the given 'value'.
	 * 
	 * @param scope The current scope.
	 * @param value The value in question.
	 * @return The evaluation of the value if it is the name of a scope variable, a JSON object if value is populated, or null otherwise.
	 */
	common.eval = function(scope, value) {
		return value ? (scope.$eval(value) || angular.fromJson(value)) : null;
	}
	
	/**
	 * Wraps a given function with before and/or after functions as well as an
	 * optional arg to represent 'this'.
	 */
	common.wrapFunctions = function(functionToWrap, before, after, thisObject) {
		return function() {
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

	/**
	 * Determine if the given arg is a Javascript Date object.
	 * 
	 * @param obj The value in question.
	 * @return true if obj is a Javascript Date based on Object's toString.
	 */
	common.isDate = function(obj) {
		return Object.prototype.toString.call(obj) === "[object Date]";
	};

	/**
	 * Determines is the given string arg is an ISO-8601 date string.
	 * 
	 * @param str The value in question.
	 * @return true if str is a string that matches the ISO-8601 regex.
	 * @see http://stackoverflow.com/questions/12756159/regex-and-iso8601-formated-datetime
	 */
	var iso8601Regex = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;
	common.isIso8601DateString = function(str) {
		return typeof(str) == 'string' && iso8601Regex.test(str);
	};
	
	/**
	 * Transforms the given fields of the given object from javascript Date to ISO-8601 date string.
	 * 
	 * Fields in objects that are either non-existent or are not javascript Dates are ignored.
	 * 
	 * @param obj The object to update.
	 * @param dateFields Array of field names to convert in the object.
	 */
	common.convertToServerDates = function(obj, dateFields) {
		if (obj && dateFields) {
			angular.forEach(dateFields, function(fieldName){
				if (common.isDate(obj[fieldName])) {
					obj[fieldName] = obj[fieldName].toISOString();
				}
			});
		}
	};
	
	/**
	 * Transforms the given fields of the given objects from ISO-8601 date string to javascript Date.
	 * 
	 * Fields in objects that are either non-existent or are not ISO-8601 date strings are ignored.
	 * 
	 * @param objs Array of objects to update.
	 * @param dateFields Array of field names to convert in each object.
	 */
	common.convertFromServerDatesArray = function(objs, dateFields) {
		if (objs && dateFields) {
			angular.forEach(objs, function(obj) {
				common.convertFromServerDates(obj, dateFields);
			});
		}
	};
	
	/**
	 * Transforms the given fields of the given object from ISO-8601 date string to javascript Date.
	 * 
	 * Fields in objects that are either non-existent or are not ISO-8601 date strings are ignored.
	 * 
	 * @param obj The object to update.
	 * @param dateFields Array of field names to convert in the object.
	 */
	common.convertFromServerDates = function(obj, dateFields) {
		if (obj && dateFields) {
			angular.forEach(dateFields, function(fieldName) {
				if (common.isIso8601DateString(obj[fieldName])) {
					obj[fieldName] = new Date(obj[fieldName]);
				}
			});
		}
	};
	
	// Not all browsers support Date.toISOString. Provide backup method:
	// Based on http://stackoverflow.com/questions/2573521/how-do-i-output-an-iso-8601-formatted-string-in-javascript
	if (!Date.prototype.toISOString) {
		(function() {
			function pad(number) {
				var r = String(number);
				if (r.length === 1) {
					r = '0' + r;
				}
				return r;
			}

			Date.prototype.toISOString = function() {
				return this.getUTCFullYear()
						+ '-'
						+ pad(this.getUTCMonth() + 1)
						+ '-'
						+ pad(this.getUTCDate())
						+ 'T'
						+ pad(this.getUTCHours())
						+ ':'
						+ pad(this.getUTCMinutes())
						+ ':'
						+ pad(this.getUTCSeconds())
						+ '.'
						+ String((this.getUTCMilliseconds() / 1000).toFixed(3))
								.slice(2, 5) + 'Z';
			};
		}());
	}
	
}(window.common = window.common || {}, jQuery));