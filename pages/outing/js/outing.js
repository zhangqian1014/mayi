define(['angular','ng_css'],function(angular,css){
	angular.module("outingModul", [])
	.config(function($stateProvider, $urlRouterProvider) {

		$stateProvider
			.state({
				name: 'index.outing',
				url: 'outing',
				css: 'pages/outing/css/outing.css',
				templateUrl: 'pages/outing/html/outing.html',
				controller: function() {
					document.documentElement.style.fontSize = innerWidth / 10 + "px";
					window.onresize = function() {
						document.documentElement.style.fontSize = innerWidth / 10 + "px";
					}
					var sublimBtn = document.getElementsByClassName('submitBtn')[0];
					var subName = document.getElementsByClassName('subName')[0];
					var hideInput = document.getElementsByClassName('hide-input')[0];
					var hideBox = document.getElementsByClassName('hideBox')[0];
					var closeBtn = document.getElementsByClassName('close')[0];
					var userName = document.getElementsByClassName('userName')[0];

					sublimBtn.onclick = function() {

						console.log(subName.value)
						if(subName.value.length == 0) {
							hideInput.style.display = "block";
							setTimeout(function() {
								hideInput.style.display = "none";
							}, 2000);
						} else {
							userName.innerHTML = subName.value;
							hideBox.style.display = "block";

						}
					}
					closeBtn.onclick = function() {

						hideBox.style.display = "none";

					}

				}
			})
	})
})
