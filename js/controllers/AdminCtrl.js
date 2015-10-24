app.controller('AdminCtrl',AdminCtrl);

function AdminCtrl(productService,$location,products){

	this.test = "Hello from Admin Controller";
	
	var self = this;

	//services
	this.productService = productService;
	this.products = products;
	console.log(this.products);

}
