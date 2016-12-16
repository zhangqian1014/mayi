angular.module("friendModul", [])
	.config(function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state({
				name: "index.friend",
				url: 'friend',
				css: 'pages/friend/css/friend.css',
				templateUrl: 'pages/friend/html/friend.html',
				controller: function() {

					document.documentElement.style.fontSize = innerWidth / 10 + "px";
					window.onresize = function() {
						document.documentElement.style.fontSize = innerWidth / 10 + "px";
					}
				}
			})
	})