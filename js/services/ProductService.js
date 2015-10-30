app.service('productService',ProductService);

function ProductService(api){

	// services
	this.api = api;
	this.products = localStorage.getItem('products');

}

ProductService.prototype.retrieveProducts = function(){

	var self = this;
	return this.api.request('/retrieve_products/team4',{},'GET');

}

ProductService.prototype.setProducts = function(products){

	// store the products in local storage so you don't have to make an API
	// request each time you are on this page
	var productStorage = JSON.stringify(products);
	localStorage.setItem('products', productStorage);
	this.products = products;

}

ProductService.prototype.getProducts = function(){

	var self = this;
	
	// if there are no products stored in localStorage, grab them from the API
	// store them in localStorage and pass back the products as a promise
	if (this.products == null) {
		return this.retrieveProducts()
		.then(function(response){
			self.setProducts(response.data.products);
			return response.data.products;
		});
	} else {
		if (typeof self.products === 'object') {
			return self.products;
		} else if (typeof self.products === 'string') {
			return JSON.parse(self.products);
		}
	}

}

ProductService.prototype.getProduct = function(id) {

	// get single product in the form of a JSON object
	if (this.products == null) {
		this.getProducts();
	}

	return JSON.parse(this.products).filter( function(product) {return product.productId === id })[0];

};

ProductService.prototype.addProduct = function(product) {

 	// add the new product to the current product list and return the updated list
	return this.api.request('/newproduct',product,'POST')
	.then(function(response){
		console.log(response);
	});

}

ProductService.prototype.editProduct = function(productId, product) {
	

	return this.api.request('/editproduct/'+productId, product, 'POST');
	
}
