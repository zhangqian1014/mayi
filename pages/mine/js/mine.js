angular.module('minePage', [])
.config(function($stateProvider){
	$stateProvider
	.state('index.mine',{
		url:'/mine',
		templateUrl:'pages/mine/mine.html'
	})
})