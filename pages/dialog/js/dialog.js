angular.module('dialogPage',[])
.config(function($stateProvider){
	$stateProvider
	.state('dialog',{
		url:'/dialog',
		templateUrl:'pages/dialog/dialog.html',
		css:'pages/dialog/css/dialog.css',
		controller:'dialog_ctrl'
	})
})
.controller('dialog_ctrl', function($scope){

})