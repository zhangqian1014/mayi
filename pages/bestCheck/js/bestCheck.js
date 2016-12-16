angular.module("bestModul", [])
	.config(function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state({
				name: 'index.bestCheck',
				ulr: 'best',
				css: "pages/bestCheck/css/bestCheck.css",

				templateUrl: "pages/bestCheck/html/bestCheck.html",
				controller: function() {
					document.documentElement.style.fontSize = innerWidth / 10 + "px";
					window.onresize = function() {
						document.documentElement.style.fontSize = innerWidth / 10 + "px";
					}

					// nav 置顶

					var titleTop = document.getElementsByTagName('nav')[0];
					var goTop = document.getElementById('go-top');

					document.onscroll = function() {
						var t = document.documentElement.scrollTop || document.body.scrollTop;
						// console.log(t)
						if(t >= 170) {
							titleTop.setAttribute("id", "title-top");
							goTop.style.display = "block";
						} else {
							titleTop.removeAttribute("id");
							goTop.style.display = "none";
						};

					}

					// 点击更多或收起
					var moreBtn = document.getElementsByClassName("moreBtn")[0];
					var moreBtn1 = document.getElementsByClassName("moreBtn1")[0];
					var moreRoom = document.getElementsByClassName("more-room");
					var moreRm = document.getElementsByClassName("more-rm");

					var flag = false;
					moreBtn.onclick = function() {
						if(!flag) {
							console.log('bbb')
							moreBtn.innerHTML = "收起";

							for(var i = 0; i < moreRoom.length; i++) {
								moreRoom[i].style.display = "block"
							};
							flag = true;
						} else {
							console.log('aaaaaa')
							moreBtn.innerHTML = "查看更多";
							for(var i = 0; i < moreRoom.length; i++) {
								moreRoom[i].style.display = "none";
							};
							flag = false;
						};
					}
					moreBtn1.onclick = function() {
						if(!flag) {
							moreBtn1.innerHTML = "收起";

							for(var i = 0; i < moreRm.length; i++) {
								moreRm[i].style.display = "block"
							};
							flag = true;
						} else {
							moreBtn1.innerHTML = "查看更多";
							for(var i = 0; i < moreRm.length; i++) {
								moreRm[i].style.display = "none";
							};
							flag = false;
						};
					}

				}

			})
	})