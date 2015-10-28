app.service('cartService', CartService);

function CartService() {

	this.cart = [];

}

CartService.prototype.addtoCart = function(product, quantity) {

	this.cart.push({product:product, quantity:quantity});
	console.log(this.cart);
	
}
