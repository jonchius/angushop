app.service('cartService', CartService);

function CartService() {

	this.cart = [];
	this.total = 0;
	this.tax = 0;
	this.final_total = 0;

}

CartService.prototype.addtoCart = function(product, quantity) {
	this.cart.push({product:product, quantity:quantity});
}

CartService.prototype.clearCart = function() {
	this.final_total = this.tax = this.total = 0; 
	this.cart = []; 
}

CartService.prototype.checkout = function() {


}

CartService.prototype.findTotal = function(){

	if (this.cart.length > 0) {

		this.total = 0;
		
		for (var i=0; i < this.cart.length; i++){
			this.total += parseFloat(this.cart[i].product.price * this.cart[i].quantity);
		}
		
		this.tax = this.total * TAX_RATE;
		this.final_total = parseFloat(this.total + this.tax);
	
	} 

	return parseFloat(this.final_total);

}