angular.module('landlordRecruit',[])
.config(function($stateProvider){
	$stateProvider
	.state('landlord',{
		url:'/landlord',
		templateUrl:'pages/landlordRecruit/html/landlordRecruit.html',
		css:'pages/landlordRecruit/css/landlordRecruit.css'
	})
})