angular.module('nearbyPage',[])
.config(function($stateProvider,$urlRouterProvider){
	$stateProvider
	.state('nearby',{
		url:'/nearby',
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
			// let p1 = $stateParams.p1;
			// console.log(p1);
			
            // 获取数据
			$http.get('http://localhost:9999/city?kw=' + 'beijing')
			.success(function(data){
				$scope.datas = data.data;
				angular.forEach(data.data, function(dataObj,index,arrar){
					if(index >= 20){
						return false
					}
					hotMap(dataObj,index);
				})

			})
			// 地图
  			var map = new AMap.Map('map_container', {
  				resizeEnable:true,
                center: [116.397428,39.90923],
                zoom: 10
            });
            map.plugin(["AMap.ToolBar"], function() {
                map.addControl(new AMap.ToolBar());
            });
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