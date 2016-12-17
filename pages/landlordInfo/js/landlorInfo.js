
angular.module('landlorInfoPage', [])
.config(function($stateProvider){
	$stateProvider
	.state('landlorInfo',{
		url:"/landlorInfo",
		templateUrl:'pages/landlordInfo/html/landlorInfo.html',
		css:'pages/landlordInfo/css/landlorInfo.css',
		controller:'land-ctrl'
	})
})
.controller('land-ctrl', function($scope,$state){
	var goTop = document.getElementById('go-top');
	document.body.scrollTop = 0;
	document.onscroll = function() {
		var t = document.documentElement.scrollTop || document.body.scrollTop;
		if(t >= 170) {
			goTop.style.display = "block";
		} else {
			goTop.style.display = "none";
		};
	}
	$scope.gohash = function(){
		// $state.go();
		window.history.back();
	}
})
