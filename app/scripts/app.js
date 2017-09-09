var app = angular.module('designApp', ['ui.router', 'ngResource']).config(function($stateProvider, $urlRouterProvider) {


	$stateProvider.state('app', {
		url: '/',

		views: {
			'header': {
				templateUrl: 'views/header.html'
			},

			'content': {
				templateUrl: 'views/home.html',
				controller: 'HomeController'
			},

			'footer': {
				templateUrl: 'views/footer.html'
			}
		}
	}).state('app.about', {
		url: 'about',

		views: {

			'content@': {
				templateUrl: 'views/about.html',
				controller: 'AboutController'
			}
		}
	}).state('app.services', {
		url: 'services',

		views: {
			'content@': {
				templateUrl: 'views/services.html',
				controller: 'ServicesController'
			}
		}
	}).state('app.contact', {
		url: 'contact', 

		views: {
			'content@': {
				templateUrl: 'views/contact.html',
				controller: 'ContactController'
			}
		}
	});

	$urlRouterProvider.otherwise('/');
});