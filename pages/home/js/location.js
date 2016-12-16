angular.module('locationPage', [])
.config(function($stateProvider){
	$stateProvider
	.state('area',{
		url:'/area',
		templateUrl:'pages/home/html/select_location.html',
		controller:'locationctrl'
	})
})
.controller('locationctrl',function($scope,$http){
	$scope.name = "name";
	$http.get('http://localhost:9999/area?kw=shanghai')
	.success(function(data){
		angular.element('.location_container').html(data);
		$('.go_back').attr('href','#/nearby')
	})
	// $('.go_back').on('click', function(){
	// 	$(this).attr('href','#/nearby') 
	// })
})