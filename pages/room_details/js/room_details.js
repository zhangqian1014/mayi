angular.module('detailsPage', [])
.config(function($stateProvider){
	$stateProvider
	.state('details',{
		url:'/details',
		params:{
			roomObj:null,
			roomId:null
		},
		templateUrl:'pages/room_details/html/room_details.html',
		css:'pages/room_details/css/room_details.css',
		controller:'det_ctrl'
	})
})
.controller('det_ctrl',function($scope,$stateParams){
	document.body.scrollTop = 0;
	angular.element('.more_wraper').on('click', function(){
		angular.element('.more_pop').toggle();
	});
	angular.element('.get_back').on('click', function(){
		window.history.back();
	});
	$scope.roomInfoData = $stateParams.roomObj;

})