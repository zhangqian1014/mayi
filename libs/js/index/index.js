angular.module('indexPage', ['ui.router','angularCSS','homePage','msgPage','orderPage','minePage','nearbyPage','filterPage'])
.config(function($stateProvider,$urlRouterProvider){
	$urlRouterProvider.otherwise('/index/home');
	$stateProvider
	.state('index',{
		url:'/index',
		templateUrl:'pages/footer/footer.html',
		css:'pages/footer/css/footer.css'
	})
})
.controller('indexCtrl',function($scope){
	// console.log($);
})