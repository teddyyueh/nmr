//= require jquery/jquery-2.1.3.min.js
//= require jquery/jquery-ui.min.js
//= require angular/angular.min.js
//= require_tree angular/modules
//= require_tree common 
//= require app/directives/module
//= require app/services/module

'use strict';
//= require_self

angular.module('nmr', [
	'ngRoute',
	'ngResource',
	'ngAnimate',
	'nmr.directives',
	'nmr.services',
	'nmr.constants'
]);

angular.module('nmr.constants', []);