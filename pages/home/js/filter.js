angular.module('filterPage',[])
.config(function($stateProvider){
	$stateProvider
	.state('filter',{
		url:'/filter',
		// params:{
		// 	router:null
		// },
		templateUrl:'pages/home/html/filter.html',
		css:'pages/home/css/filter.css',
		controller:'filter_ctrl'
	})
})
.controller('filter_ctrl',function($scope,$stateParams,$state){
	// 返回按钮
	$scope.getBack = function(){
		// window.history.back();
		$state.go('nearby');
	}
	// var router = $stateParams.router;
	// console.log(router);
	var low = angular.element('.low');
	var high = angular.element('.high');
})
.directive('range', function(){
	return {
		restrict: 'ECMA',
		link: function($scope,$ele,$attrs){
			console.log($ele);
		}		
	}
})