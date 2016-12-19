define(['angular','ng_css'],function(angular,css){
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
		var currentRoom = $stateParams.roomObj;
		console.log(currentRoom);
		//存放浏览记录的是一个数组
		var scannerData = JSON.parse(localStorage.getItem('scan_history'));
		if(scannerData){
			//直接将新纪录压入到数组中，先判断数组中是否存在该记录，
			//需要注意的是，angular.foreach不能使用return false 结束循环，所以要自己定义变量
			var flag = true;
			angular.forEach(scannerData,function(data,index,array){
				if(currentRoom.id == data.id){
					console.log('id已存在');
					flag = false;
				}
				if(flag){
						if(index == array.length - 1){
						//如果不存在该房间的浏览记录，则加入到缓存中
						scannerData.push(currentRoom);
						console.log('已存在添加');
						localStorage.setItem('scan_history',JSON.stringify(scannerData));
					}
				}
			})
		}else{
			//如果缓存中还没有历史记录，则新建
			localStorage.setItem('scan_history',JSON.stringify([currentRoom]));
		}
	})
})
