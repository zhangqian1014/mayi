angular.module("bestModul", [])
	.config(function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state({
				name: 'index.bestCheck',
				ulr: 'best',
				css: "pages/bestCheck/css/bestCheck.css",

				templateUrl: "pages/bestCheck/html/bestCheck.html",
				controller: function($scope,goTop) {
					// 置顶
					var node = document.getElementsByClassName('go-top')[0];
					goTop.scroll(node);
					$scope.gotop = function(){
						goTop.gotop();
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