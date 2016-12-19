angular.module("weekModul", [])
	.config(function($stateProvider, $urlRouterProvider) {

		$stateProvider
			.state({
				name: 'index.week',
				url: '/week',
				css: 'pages/week/css/week.css',
				templateUrl: 'pages/week/html/week.html',
				controller: function(goTop,$scope) {

					var node = document.getElementsByClassName('backTop')[0];
					goTop.scroll(node);
					$scope.gotop = function(){
						goTop.gotop();
					}
				}
			})

	})