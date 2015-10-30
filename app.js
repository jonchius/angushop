var app = angular.module('ShopApp',['ngRoute', 'ngAnimate', 'ui.bootstrap', 'ngMessages']);

app.config(function($routeProvider,$httpProvider){
	
	$routeProvider.when('/',{
		templateUrl:'templates/home.html',
		controller:'MainCtrl as Ctrl',
	})
	.when('/login',{
		templateUrl:'templates/login.html',
		controller:'AuthCtrl as Ctrl'
	})
	.when('/admin',{
		templateUrl:'templates/admin.html',
		controller:'AdminCtrl as Ctrl',
		resolve:{
			path: function($location){
				if(localStorage.getItem('authToken') == null){
					$location.path('/login');
				}
			},
			products:function(productService){
				return productService.getProducts();
			},
			order:function(orderService) {
				return orderService.getOrders();
			}
		}
	})
	.when('/products', {
		templateUrl:'templates/products.html',
		controller: 'ProductCtrl as Ctrl',
		resolve: {
			products:function(productService) {
				return productService.getProducts();
			}
		}
	})
	.when('/products/:productId', {
		templateUrl:'templates/product.html',
		controller: 'ProductCtrl as Ctrl',
		// resolve: {
		// 	return productService.getProduct();
		// }
	})
	.otherwise({
		redirectTo:'/'
	});

	$httpProvider.interceptors.push(function() {
    	return {
      		'request': function(config) {
        		config.headers = config.headers || {};
        		if (localStorage.authToken) {
          			config.headers.Authorization = localStorage.authToken;
        		}
        		return config;
      		}
    	};
  	});

});
