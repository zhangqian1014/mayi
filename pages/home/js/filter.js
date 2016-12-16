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
.controller('filter_ctrl',function($scope,$state,$stateParams){
	// 返回按钮
	$scope.getBack = function(){
		// window.history.back();
		$state.go('nearby');
	}
	// 清空按钮
	$scope.clear = function(){
		angular.element('.search_form').find('li,span').removeClass('activeColor');
	}
	
})
.directive('range', function(){
	return {
		restrict: 'ECMA',
		link: function($scope,$ele,$attrs){
			$ele.on('click','li,span',function(){
				$(this).addClass('activeColor').siblings().removeClass('activeColor');
			})
		}		
	}
})