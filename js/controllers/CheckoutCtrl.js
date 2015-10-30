app.controller('CheckoutCtrl',CheckoutCtrl);

function CheckoutCtrl($uibModalInstance, order, orderService, productService, cartService) {

	this.$uibModalInstance = $uibModalInstance;
	this.order = order;
	this.orderService = orderService;
	this.productService = productService;
	this.cartService = cartService;

}

CheckoutCtrl.prototype.confirm = function() {

	this.customer = { 
		name: this.customerName,
		address: this.customerAddress
	}

	this.order.cart = { products: this.cartService.cart.products, customer: this.customer };

	this.request_body = {
		cart: this.order.cart,
		total: this.order.total,
		tax: this.order.tax,
		final_total: this.order.final_total
	}

	this.orderService.recordOrder(this.request_body);

	for (var i=0; i<this.order.cart.products.length; i++) {
		var productInStock = this.productService.getProduct(this.order.cart.products[i].product.productId);
		productInStock.quantity = parseInt(productInStock.quantity) - parseInt(this.order.cart.products[i].quantity);
		var newProduct = this.productService.editProduct(productInStock.productId, productInStock);
		console.log(newProduct);
	}

	this.cartService.clearCart();	
	this.$uibModalInstance.close();

}

CheckoutCtrl.prototype.cancel = function() {

	this.$uibModalInstance.close();

}