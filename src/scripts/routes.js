var angular = require('angular');

var app = angular.module('app');

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'dist/views/home.html',
			controller: 'HomeCtrl'
		});

	$urlRouterProvider.otherwise('/');
}]);