angular.module('collect_scan',[])
.config(function($stateProvider,$urlRouterProvider){
	$stateProvider
	.state('collection_scan',{
		url:'/collection',
		templateUrl:'pages/home/html/collection.html',
		css:'pages/home/css/collection.css',
		controller:'coll_ctrl'
	})
})
.controller('coll_ctrl',function($scope,$state){
	var collectArr = JSON.parse(localStorage.getItem('collected'));
	console.log(collectArr);
	$scope.collectArr = collectArr;
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
.directive('chooseClick',function(){
	return {
		restrict:'ECMA',
		link:function($scope,$elem,$attrs){
			$elem.on('click','li',function(){
				var $this = $(this);
				console.log($this.index());
				$('.room_list').eq($this.index()).show().siblings('.room_list').hide();
			})
		}
	}
})
.directive('deleteRoom',function(){
	return {
		restrict:'ECMA',
		link:function($scope,$elem,$attrs){
			$elem.on('click',function(){
				//1、从页面中删除
				var $this = $(this);
				
				//2、从缓存中删除
				var roomId = $attrs['id'];
				$this.parent().remove();
				var localData = JSON.parse(localStorage.getItem('collected'));
				$.each(localData,function(index,elem){
					console.log(elem);
					if(roomId == elem.id){
						localData.splice(index,1);
						localData.length == 0 ? localStorage.removeItem('collected') : localStorage.setItem('collected',JSON.stringify(localData));
					}
				})
			})
		}
	}
})