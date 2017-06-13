const angular = require('angular');
const angularRoute = require('angular-route');
const angularJwt = require('angular-jwt');
const angularCss = require('angular-css');

const APIservice = require('./services/APIservice')
const authService = require('./services/authService')
const authInterceptor = require('./services/authInterceptor')
const storageService = require('./services/storageService')

const loginController = require('./controllers/loginController')
const registerController = require('./controllers/registerController')
const mainController = require('./controllers/mainController')

angular
	.module('skymanagerApp', [ 'ngRoute', 'angularCSS', 'angular-jwt' ])

	.factory('authService', authService)
	.factory('storageService', storageService)
	.factory('authInterceptor', authInterceptor)
	.factory('APIservice', APIservice)

	.controller('loginController', loginController)
	.controller('registerController', registerController)
	.controller('mainController', mainController)

	.config( function( $routeProvider ) {
		$routeProvider
			.when('/', {
				templateUrl: '../templates/landing.html',
				controller: 'registerController'
			})
			.when('/game', {
				templateUrl: '../templates/news.html',
				css: '../css/game.css',
				secure: true
			})
			.when('/game/table', {
				templateUrl: '../templates/table.html',
				css: '../css/game.css',
				secure: true
			})
			.when('/game/squad', {
				templateUrl: '../templates/squad.html',
				controller: 'mainController',
				css: '../css/game.css',
				secure: true
			})
			.when('/game/lineup', {
				templateUrl: '../templates/lineup.html',
				css: '../css/game.css',
				secure: true
			})
			.when('/game/market', {
				templateUrl: '../templates/market.html',
				css: '../css/game.css',
				secure: true
			})
			.when('/game/sales', {
				templateUrl: '../templates/sales.html',
				css: '../css/game.css',
				secure: true
			})
			.otherwise('/')
	})

	.config( function( $httpProvider ) {
		$httpProvider
			.interceptors.push('authInterceptor')
	})

	.run( function( $rootScope, $location, storageService, authService ){
			if ( authService.isLoggedIn() ) {
				const token = storageService.getToken()
				authService.setCredentials(token)
			}

			$rootScope.$on( "$routeChangeStart", function(event, next, current) {
				if (next && next.secure) {
					console.log("this route is secured!!")
					if ( !authService.isLoggedIn() ) {
						$location.path("/login");
						console.log("this is shiet!!")
					}
				}
			})
	})
