angular.module("weekModul", [])
	.config(function($stateProvider, $urlRouterProvider) {

		$stateProvider
			.state({
				name: 'index.week',
				url: '/week',
				css: 'pages/week/css/week.css',
				templateUrl: 'pages/week/html/week.html',
				controller: function() {
					document.documentElement.style.fontSize = innerWidth / 10 + "px";
					window.onresize = function() {
						document.documentElement.style.fontSize = innerWidth / 10 + "px";
					}

					var goTop = document.getElementById('go-top');
					var timer='';
					goTop.onclick= function(){
						var timer=setInterval(function(){
						document.body.scrollTop-=20;
						if(document.body.scrollTop==0){
							clearInterval(timer)
						}
					},10)
						
						
						
						
					}
					
					document.onscroll = function() {
						var t = document.documentElement.scrollTop || document.body.scrollTop;
						if(t >= 140) {
							goTop.style.display = "block";
						} else {
							goTop.style.display = "none";
						};
					}

				}
			})

	})