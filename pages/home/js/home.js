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
.controller('homectrl', function($scope,$state,$http,goTop){
	$http.get('../../../data/homeData.json')
	.success(function(data){
		console.log(data.dataList);
		$scope.bannerData = data.dataList.bannerData;
		$scope.listPic = data.dataList.listPic;
		$scope.landlordList = data.dataList.landlordList;
	});
	$http.get('http://localhost:9999/city?kw=beijing')
	.success(function(data){
		var showRoom = data.data;
		$scope.datas = showRoom;
		$(function(){
			//判断是否有已收藏的room
			var bufferData = JSON.parse(localStorage.getItem('collected'));
			if(bufferData){
				angular.forEach(bufferData,function(obj,i,a){
					if(obj.id == showRoom[i].id){
						//将心设置成红色
						console.log($('.collection')[0]);
						$('.collection').eq(i).addClass('collected');
					}
				})
			}
		})
	});
	var node = document.getElementsByClassName('goTop')[0];
	goTop.scroll(node);
	$scope.gotop = function(){
		goTop.gotop();
	}
	
})
.directive('collRoom',function(addService){
	return {
		restrict:'ECA',
		link:function($scope,$elem,$attrs){
			$elem.on('click',function(){
				var $this = $(this);
				var roomId = $attrs['id'];
				addService.collRoom($this,roomId,$scope);
				
			})
		}
	}
})
.service('addService',function(){
	this.collRoom = function($this,roomId,$scope){
		//如果是空心则加入收藏，如果是红心则取消收藏，根据情况判断,去除重复
		// 取出缓存中的数据，进行对比
		var localData = JSON.parse(localStorage.getItem('collected'));
		if(localData){
			$.each(localData,function(index,elem){
				//如果缓存中存在了这条记录,则移除
				if(roomId == elem.id){	
					//红心收藏
					$this.removeClass('collected');
					if(localData.length == 1){
						localStorage.removeItem('collected')
					}else{
						localData.splice(index,1);
						localStorage.setItem('collected',JSON.stringify(localData));
					}
					return false;
				}
				//如果遍历到最后依然不存在，则添加收藏
				if(index == localData.length - 1){
					$this.addClass('collected');
					addCollection(roomId,localData);
				}
			});
		}else{
			$this.addClass('collected');
			addCollection(roomId,[]);
		}

		function addCollection(roomId,collectAarr){
			var showRoom = $scope.datas;
			$.each(showRoom,function(i,v){
				if(roomId == v.id){
					collectAarr.push(v);
					localStorage.setItem('collected',JSON.stringify(collectAarr));
					console.log(JSON.parse(localStorage['collected']));
				}
			})
		}
	}
})
.service('goTop', function(){
	this.scroll = function(node){
		document.onscroll = function() {
			var t = document.documentElement.scrollTop || document.body.scrollTop;
			if(t >= 140) {
				node.style.display = "block";
			} else {
				node.style.display = "none";
			};
		}
	}
	this.gotop = function(){
		var timer=setInterval(function(){
			document.body.scrollTop-=20;
			if(document.body.scrollTop==0){
				clearInterval(timer)
			}
		},10)
	}
})