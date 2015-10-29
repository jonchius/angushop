app.service('cartService', CartService);

var TAX_RATE = 0.13; 

function CartService() {

	this.cart = { products: [], customer: {} };
	this.total = 0;
	this.tax = 0;
	this.final_total = 0;

}

CartService.prototype.addtoCart = function(product, quantity) {

	this.cart.products.push({product:product, quantity:quantity});

}

CartService.prototype.clearCart = function() {
	this.final_total = this.tax = this.total = 0; 
	this.cart = { products: [], customer: {} }; 
}

CartService.prototype.findTotal = function(){

	if (this.cart.products.length > 0) {

		this.total = 0;
		
		for (var i=0; i < this.cart.products.length; i++){
			this.total += parseFloat(this.cart.products[i].product.price * Math.floor(this.cart.products[i].quantity));
		}
		
		this.tax = this.total * TAX_RATE;
		this.final_total = parseFloat(this.total + this.tax);
	
	} 

	return parseFloat(this.final_total);

}