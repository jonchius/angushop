app.controller('MainCtrl',MainCtrl);

function MainCtrl($location) {

	this.$location = $location;

}

MainCtrl.prototype.goToProducts = function() {

	this.$location.path('/products');
	
}