require.config({
	paths:{
		'jquery':'./libs/js/jquery-3.1.1',
		'angular':'libs/node_modules/angular/angular.min',
		'ui-router':'./libs/node_modules/angular-ui-router/release/angular-ui-router.min',
		'ng_css':'./libs/node_modules/angular-css/angular-css.min',
		'touch':'./libs/js/touch',
		'fontZise':'./libs/js/font-size',
		'index':'./libs/js/index/index',
		'homePage':'./pages/home/js/home',
		'nearbyPage':'./pages/home/js/nearby',
		'msgPage':'./pages/message/js/message',
		'orderPage':'./pages/order/js/order',
		'orderInfoPage':'./pages/order/js/order-info',
		'minePage':'./pages/mine/js/mine',
		'loginPage':'./pages/mine/js/login',
		'filterPage':'./pages/home/js/filter',
		'locationPage':'./pages/home/js/location',
		'cityPage':'./pages/home/js/city-list',
		'collect_scan':'./pages/home/js/collection',
		'landlorInfoPage':'./pages/landlordInfo/js/landlorInfo',
		'landlordRecruit':'./pages/landlordRecruit/js/landlordRecruit',
		'outingPage':'./pages/outing/js/outing',
		'friendPage':'./pages/friend/js/friend',
		'bestCheckPage':'./pages/bestCheck/js/bestCheck',
		'weekPage':'./pages/week/js/week',
		'dialogPage':'./pages/dialog/js/dialog',
		'detailsPage':'./pages/room_details/js/room_details'
	},
	 //强依赖
    shim:{
        angular: {
            deps: ['jquery'],
            exports: 'angular'
        },
        'ui-router': {
            deps: ['angular'],
            exports: 'ui-router'
        },
        'ng_css':{
        	deps:['angular'],
        	exports:'ng_css'
        },
        'touch':{
        	exports:'touch'
        }
    }
});
require(['jquery',
		 'angular',
		 'ui-router',
		 'ng_css',
		 'touch',
		 'fontZise',
		 'index',
		 'homePage',
		 'nearbyPage',
		 'msgPage',
		 'orderPage',
		 'orderInfoPage',
		 'minePage',
		 'loginPage',
		 'filterPage',
		 'locationPage',
		 'cityPage',
		 'collect_scan',
		 'landlorInfoPage',
		 'landlordRecruit',
		 'outingPage',
		 'friendPage',
		 'bestCheckPage',
		 'weekPage',
		 'dialogPage',
		 'detailsPage'
		 ],function($,angular,touch,css){
	//手动启动angular模块
    angular.bootstrap(document, ['indexPage']);
})