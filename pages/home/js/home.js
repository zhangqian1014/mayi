angular.module('homePage', [])
.config(function($stateProvider,$urlRouterProvider) {
	$stateProvider
	.state('index.home',{
		url:'/home',
		params:{
			name:'北京',
			url:'/beijing'
		},
		templateUrl:'pages/home/home.html',
		css:'pages/home/css/home.css',
		controller:'homectrl'
	})
})
.controller('homectrl', function($scope,$state,$http){
	$http.get('../../../data/homeData.json')
	.success(function(data){
		console.log(data.dataList);
		$scope.bannerData = data.dataList.bannerData;
		$scope.listPic = data.dataList.listPic;
		$scope.landlordList = data.dataList.landlordList;
	});
	$http.get('http://localhost:9999/city?kw=beijing')
	.success(function(data){
		$scope.datas = data.data;
	})
})