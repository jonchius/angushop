app.controller('ProductCtrl',ProductCtrl);

function ProductCtrl(productService, cartService, $routeParams, $location) {

	this.productService = productService;
	this.$location = $location;
	this.productService = productService;
	this.cartService = cartService;
	this.product = this.productService.getProduct($routeParams.productId);
	this.products = this.productService.getProducts();
	
}

ProductCtrl.prototype.addtoCart = function(product) {
	console.log("working");
	this.cartService.addtoCart(product);
}

ProductCtrl.prototype.cancel = function() {

	this.$location.path('/admin');

}

ProductCtrl.prototype.gotoProduct = function(productId) {
	this.$location.path('/products/'+productId);
}

ProductCtrl.prototype.addProduct = function(name,description,price,category,quantity,status){
	
	//create the api request that makes the product on the backend
	//as part of your response you need to add it to your current
	//product array using the product service
	var request_body = {
		name: name,
		description: description,
		price: price,
		category: category,
		quantity: quantity,
		status: status
	}

	this.productService.addProduct(request_body);

  	// Reset fields after form submission
	this.name = '';
	this.description = '';
	this.price = '';
	this.category = '';
	this.quantity = '';
	this.status = '';

}