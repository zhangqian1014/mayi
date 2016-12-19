angular.module('nearbyPage',[])
.config(function($stateProvider,$urlRouterProvider){
	$stateProvider
	.state('nearby',{
		url:'/nearby',
		params:{
			name:null,
			url:null,
			position:true
		},
		templateUrl:'pages/home/html/home.nearbySource.html',
		css:'pages/home/css/nearby.css',
		controller: function($scope,$state,$stateParams,$http){
			$('.search_condition li').on('touchstart', function(){
				$(this).addClass('active').siblings().removeClass('active');
				$('.nearby_list_content>div').eq($(this).index()).show().siblings().hide();
			});
			// 返回按钮
			$scope.getBack = function(){
				// window.history.back();
				$state.go('index.home');
			}
			
			// 排序选项
			angular.element('.sortBtn').on('touchstart', function(){
				angular.element('.choose_sort').toggle();
			});
			angular.element('.sort_ul').find('li').on('touchstart', function(){
				$(this).addClass('on').siblings().removeClass('on');
			})

			//判断请求参数是否存在
			if($stateParams.name){
				var paramsName = $stateParams.name;
				$('.location_city').html(paramsName);
				var paramsUrl = $stateParams.url.substring(1);
			}
			var cityPosition = $stateParams.position;
		    // 地图
  			var map = new AMap.Map('map_container', {
  				resizeEnable:true,
                // zoom: 11
            });
	       if(cityPosition){
		       	 //实例化城市查询类
		        var citysearch = new AMap.CitySearch();
		        //自动获取用户IP，返回当前城市
		        citysearch.getLocalCity(function(status, result) {
		            if (status === 'complete' && result.info === 'OK') {
		                if (result && result.city && result.bounds) {
		                    var cityInfo = result.city.substring(0,result.city.length - 1);
		                   	$http.get('http://localhost:9999/data/citySpell.json')
		                   	.success(function(res){
		                   		var cityList = res.opencitys;
		                   		var flag = true;
		                   		angular.forEach(cityList,function(data,index,array){
		                   			if(flag){
		                   				if(cityInfo == data.namechinese){
		                   					console.log(!$stateParams.name);
	                   					  	if(!$stateParams.name){
								            	paramsName = data.namechinese;
								            	paramsUrl = data.url;
								            	$('.location_city').html(paramsName);
								            }
								            console.log(paramsName,paramsUrl);
								            getRoomData(paramsUrl);
		                   					flag = false;
		                   				}
		                   			}
		                   		});	
		                   	});
		                }
		            } else {
		                alert('定位失败');
		            }
		        });
	       }else{
	       		getRoomData(paramsUrl);
	       }
            map.plugin(["AMap.ToolBar"], function() {
                map.addControl(new AMap.ToolBar());
            });
            // 设置地图中心
            map.setCity([paramsName]);


            
            // 获取数据
			function getRoomData(paramsUrl){
				$http.get('http://localhost:9999/city?kw=' + paramsUrl)
				.success(function(data){
					var showRoom = [];
					angular.forEach(data.data, function(dataObj,index,arrar){
						if(index >= 20){
							return false
						}
						showRoom.push(dataObj);
						//调用地图
						hotMap(dataObj,index);
					})
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
				})
			}

	       // 设置地图显示热点
			function hotMap(list,i){
				var longitude = list['latlng'].split(',');
				var marker = new AMap.Marker({
					map:map,
					icon:"pages/home/images/map_iconss.png",
					position:[Number(longitude[1].trim()),Number(longitude[0].trim())]
				});
				marker.content = i;
				marker.on('click', markerClick);
			}
			function markerClick(e){
				var index = e.target.content;
				$('.room_show li').eq(index).show().siblings().hide();
			}

			// 点击地图表现消失li
			$('#map_container').on('touchstart',function(e){
				if(e.target.nodeName != 'IMG'){
					$('.room_show li').hide();
				}
			})
		}
	})
})
.directive('collectRoom',function($http,$rootScope){
	return {
		restrict:'ECA',
		link:function($scope,$elem,$attrs){
			$elem.on('click',function(){
				var $this = $(this);
				var roomId = $attrs['id'];

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
			})
		}
	}
})