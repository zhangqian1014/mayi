angular.module('homePage', [])
.config(function($stateProvider,$urlRouterProvider) {
	$stateProvider
	.state('index.home',{
		url:'/home',
		templateUrl:'pages/home/home.html',
		css:'pages/home/css/home.css'
	})
})