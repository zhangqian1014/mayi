angular.module('msgPage', [])
.config(function($stateProvider) {
	$stateProvider
	.state('index.message',{
		url:'/message',
		templateUrl:'pages/message/message.html'
	})
})