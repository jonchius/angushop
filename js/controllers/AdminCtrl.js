app.controller('AdminCtrl',AdminCtrl);

function AdminCtrl(productService, $location, products){

	var self = this;

	this.productService = productService;
	this.$location = $location;
	this.products = products;

}

AdminCtrl.prototype.gotoEditProduct = function(productId) {

	this.$location.path('/admin/edit_product/'+productId);

}

AdminCtrl.prototype.gotoShop = function() {

	this.$location.path('/');
	
}