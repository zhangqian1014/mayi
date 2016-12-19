define(['angular','ng_css'],function(angular,css){
	angular.module('loginPage',[])
	.config(function($stateProvider,$urlRouterProvider){

		$stateProvider
		.state('login',{
			url:'/login',
			templateUrl:'pages/mine/html/login.html',
			css:'pages/mine/css/login.css',
			controller:function(){
				//切换菜单
				angular.element('.login-way li').on('click',function(){
					var index = angular.element(this).index();
					$(this).addClass('active').siblings().removeClass('active');
					$('.item').eq(index).show().siblings().hide();
				});

				//登录事件
				// $.('')
			}
		})
	})
})
