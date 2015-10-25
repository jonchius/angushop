app.controller('ProductCtrl',ProductCtrl);

function ProductCtrl($routeParams, productService, $location) {

	this.productService = productService;
	this.product = this.productService.getProduct($routeParams.editproductId);
	this.$location = $location;
	
}

ProductCtrl.prototype.cancel = function() {

	this.$location.path('/admin');

}

// ProductCtrl.prototype.editProduct = function(name,description,price,category,quantity,status){

// 	//create the api request that makes the product on the backend
// 	//as part of your response you need to add it to your current
// 	//product array using the product service
// 	var request_body = {
// 		name: name,
// 		description: description,
// 		price: price,
// 		category: category,
// 		quantity: quantity,
// 		status: status
// 	}

// 	this.productService.editProduct(this.product.productId, request_body);

//   	// Reset fields after form submission
// 	this.name = '';
// 	this.description = '';
// 	this.price = '';
// 	this.category = '';
// 	this.quantity = '';
// 	this.status = '';

// }

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