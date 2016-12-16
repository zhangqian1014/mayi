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
.controller('city-ctrl',function($scope,$http){
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

		$(function(){
			$('.input').on('keyup',function(e){
				if((e.originalEvent.keyCode >= 65 && e.originalEvent.keyCode <= 90) || e.originalEvent.keyCode == 8){
					var value = $(this).val().trim();
					if(value){
						$.get('http://localhost:9999/getSuggest?value=' + value,function(data){
							console.log(data.list);
						});
					}
				}		
			});
		})
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
			// $elem.on('keyup','input',function(){
			// 	console.log(cityArr);
			// });
			$elem.on('click','.cancel',function(){
				$elem.find('.place-list').show().siblings('.search_list').hide();
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
// .directive('location',function($state){
// 	return {
// 		restrict:'ECA',
// 		link:function($scope,$elem,$attrs){
// 			$elem.on('focus',function(){
// 				// $state.go('city-list'); 
// 				window.location.hash = '#/city-list'
// 			})
// 		}
// 	}
// })