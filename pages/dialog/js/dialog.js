define(['angular','ng_css'],function(angular,css){
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
	.controller('dialog_ctrl', function($scope,$state){
		angular.element('.closeBtn').on('touchstart',function(){
			angular.element('.warning').hide();
		});
		angular.element('.get_back').on('touchstart', function(){
			$state.go('index.message');
		});
		//模拟对话框
		var showMsgArr = JSON.parse(localStorage.getItem('msg'));
		angular.element('.send_msg').on('touchstart', function(){
			var msg = angular.element('.text_input').val();
			if(msg != ''){
				if(showMsgArr){
					showMsgArr.push(msg);
					localStorage.setItem('msg',JSON.stringify(showMsgArr));
				}else{
					showMsgArr = [];
					showMsgArr.push(msg);
					localStorage.setItem('msg',JSON.stringify(showMsgArr));
				}
				$scope.$apply(function(){
					$scope.showMsgArr = showMsgArr;
				});
				angular.element('.text_input').val('');
			}else{
				alert('请输入有效内容');
			}

		});
		$scope.showMsgArr = showMsgArr;

	})
})
