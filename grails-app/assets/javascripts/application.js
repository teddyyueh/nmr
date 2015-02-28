//= require vendor/jquery/jquery-2.1.3.min.js
//= require vendor/jquery/jquery-ui.min.js
//= require vendor/underscore-min.js
//= require vendor/angular/angular.min.js
//= require_tree vendor/angular/modules
//= require_tree common 
//= require app/services/module
//= require app/controllers/module
//= require app/directives/module

'use strict';
//= require_self

angular.module('nmr', [
	'ngRoute',
	'ngResource',
	'ngAnimate',
	'ui.bootstrap',
	'nmr.services',
	'nmr.controllers',
	'nmr.directives',
	'nmr.constants'
]).config(['$locationProvider', function($locationProvider) {
	$locationProvider.html5Mode({
		enabled: true
	});
}]);

angular.module('nmr.constants', []);