app.service('cartService', CartService);

function CartService() {

	this.cart = [];

}

CartService.prototype.addtoCart = function(product) {

	this.cart.push(product);
	
}
