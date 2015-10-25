app.controller('AdminCtrl',AdminCtrl);

function AdminCtrl(productService, $location, products){

	var self = this;

	this.productService = productService;
	this.$location = $location;
	this.products = products;

}
