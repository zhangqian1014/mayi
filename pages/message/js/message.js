define(['angular','ng_css'],function(angular,css){
	angular.module('msgPage', [])
	.config(function($stateProvider) {
		$stateProvider
		.state('index.message',{
			url:'/message',
			templateUrl:'pages/message/message.html',
			css:"pages/message/css/message.css"
		})
	})
})
