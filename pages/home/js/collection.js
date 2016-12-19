angular.module('collect_scan',[])
.config(function($stateProvider,$urlRouterProvider){
	$stateProvider
	.state('collection_scan',{
		url:'/collection',
		params:{
			currentRoom:null
		},
		templateUrl:'pages/home/html/collection.html',
		css:'pages/home/css/collection.css',
		controller:'coll_ctrl'
	})
})
.controller('coll_ctrl',function($scope,$state){

	//取出收藏记录
	var collectArr = JSON.parse(localStorage.getItem('collected'));
	$scope.collectArr = collectArr;

	//取出浏览记录
	var historyData = JSON.parse(localStorage.getItem('scan_history'));
	$scope.historyData = historyData;
	$scope.gohash = function(){
		$state.go('index.home');
	}



	// window.onscroll = function(){
	// 	var choose = document.getElementsByClassName('choose')[0];
	// 	var top = document.body.scrollTop || document.documentElement.scrollTop;
	// 	console.log(top);
	// 	if(choose.offsetTop < top){
	// 		$('.choose').addClass('fixed');
	// 		$('.empty').show();
	// 	}
	// 	else if(top < 50){
	// 		console.log('aaa');
	// 		$('.choose').removeClass('fixed');
	// 		$('.empty').hide();
	// 	}
	// }

})
//标签点击切换的自定义指令
.directive('chooseClick',function(){
	return {
		restrict:'ECMA',
		link:function($scope,$elem,$attrs){
			$elem.on('click','li',function(){
				var $this = $(this);
				$this.addClass('active').siblings().removeClass('active');
				$('.room_list').eq($this.index()).show().siblings('.room_list').hide();
				//浏览记录长按删除事件
				touch.on('.scanner','hold',function(e){
					console.log($(this).parent('a'));
					var currentRoom = JSON.parse($(this).parent('a').attr('data-obj'));
					$scope.$apply(function(){
						$scope.currentRoom = currentRoom;
					});
					$('.delete_page').css('display','flex');
					// $('.delete_page').find('p:eq(0)').html(currentRoom.sName);
				})

			})
		}
	}
})
.service('delService',function(){
	this.delLocal = function(key,roomId,element){
		//1、获取缓存
		var localData = JSON.parse(localStorage.getItem(key));
		
		$.each(localData,function(index,elem){
			if(roomId == elem.id){
				localData.splice(index,1);
				localData.length == 0 ? localStorage.removeItem(key) 
				: localStorage.setItem(key,JSON.stringify(localData));

				if(element){
					//删除页面中的数据
					element.eq(index).remove();
				}

				//结束遍历
				return false;
			}
		})
	}
})
//取消收藏的自定义指令
.directive('deleteRoom',function(delService){
	return {
		restrict:'ECMA',
		link:function($scope,$elem,$attrs){

			$elem.on('click',function(){
				//1、从页面中删除
				var $this = $(this);
				$this.parent().remove();
				//2、从缓存中删除
				var roomId = $attrs['id'];

				//使用service模块定义的方法
				delService.delLocal('collected',roomId);
			})
		}
	}
})
//取消收藏的自定义指令
.directive('delRoom',function(delService){
	return {
		restrict:'ECMA',
		link:function($scope,$elem,$attrs){
			$elem.on('click',function(){
				//1、从页面中删除
				var $this = $(this);
				
				//2、从缓存中删除
				var roomId = $attrs['id'];
				$this.parent().hide();

				//使用service模块定义的方法
				delService.delLocal('scan_history',roomId,$('.scanner'));
			})
		}
	}
})