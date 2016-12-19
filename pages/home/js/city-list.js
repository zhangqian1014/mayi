define(['angular','ng_css'],function(angular,css){
	angular.module('cityPage',[])
	.config(function($stateProvider){
		$stateProvider
		.state('city',{
			url:'/city',
			templateUrl:'pages/home/html/city-list.html',
			css:'pages/home/css/city-list.css',
			controller:'city-ctrl'
		})
	})
	.controller('city-ctrl',function($scope,$http,$rootScope,$state){
		$scope.getback = function(){
			$state.go('index.home');
		}
		$http.get('http://localhost:9999/data/cityListData.json')
		.then(function(res){
			$scope.opencitys = res.data.opencitys;

			var spellArr = ['A','B','C','D','E','F','G','H','J',
				'K','L','M','N','P','Q','R','S','T','W','X','Y','Z'];
			
			var cityArr = [];
			angular.forEach(spellArr,function(elem,index){
				var obj = {
					category:'',
					cityList:[]
				}
				obj.category = elem;
				angular.forEach(res.data.opencitys,function(e,i){
					if(e.simplespellcn.charAt(0) == elem.toLowerCase()){
						obj.cityList.push(e);
					}
				});
				cityArr.push(obj);
				obj = null;
			});
			$scope.cityArr = cityArr;
			$scope.flag = true;

			// $scope.spellArr = ['A','B','C','D','E','F','G','H','J',
			// 	'K','L','M','N','P','Q','R','S','T','W','X','Y','Z'];
		});
	})
	.directive('inputSearch',function(){
		return {
			restrict:'ECA',
			replace:true,
			link:function($scope,$elem,$attrs){
				$elem.on('focus','input',function(){
					$elem.find('.place-list').hide().siblings('.search_list').show();
				});
				$elem.on('keyup','input',function(e){
					if((e.originalEvent.keyCode >= 65 && e.originalEvent.keyCode <= 90) || e.originalEvent.keyCode == 8){
						var value = $(this).val().trim();
						console.log(value);
						if(value){
							$.get('http://localhost:9999/getSuggest?value=' + value,function(data){
								console.log(data);
								var searchArr = [];
								var data = data.list;
								for(p in data){
									var obj = {
										category: p,
										list: data[p]
									}
									searchArr.push(obj);
									obj = null;
								}
								console.log(searchArr);
								$scope.$apply(function(){
									$scope.searchArr = searchArr;
									$scope.title = 'jja';
								})
								console.log($scope);
								$elem.find('.search_list ul').show();
								
							});
						}
						else{
							$('.sort_list').hide();
						}
					}		
				});

				$elem.on('click','.cancel',function(){
					$elem.find('.place-list').show().siblings('.search_list').hide();
					$elem.find('.input').val('');
				});
			}
		}
	})
	.filter('myFilter',function(){
		return function(elem,arg){
			if(elem.charAt(0).toUpperCase() == arg){
				return elem;
			}
		}
	})
})
