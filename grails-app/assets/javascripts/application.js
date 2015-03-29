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
    'ngTagsInput',
    'ngFabForm',
    'angularUtils.directives.dirPagination',
	'nmr.services',
	'nmr.controllers',
	'nmr.directives',
	'nmr.constants'
]).config(['$httpProvider', '$locationProvider', 'paginationTemplateProvider', function($httpProvider, $locationProvider, paginationTemplateProvider) {
	
	//$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
	
	$locationProvider.html5Mode({
		enabled: true
	});
	
	paginationTemplateProvider.setPath('/assets/vendor/angular/modules/dirPagination.tpl.html');
}]);

angular.module('nmr.constants', []);