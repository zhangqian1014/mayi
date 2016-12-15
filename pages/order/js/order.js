angular.module('orderPage',[])
.config(function($stateProvider){
	$stateProvider
	.state('index.order',{
		url:'/order',
		templateUrl:'pages/order/order.html'
	})
})