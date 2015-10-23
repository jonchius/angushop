app.controller('AdminCtrl',AdminCtrl);

function AdminCtrl(productService,$location,products){
	var self = this;

	//services
	this.productService = productService;
	this.products = products;
	console.log(this.products);

}
