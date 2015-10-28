app.controller('CheckoutCtrl',CheckoutCtrl);

function CheckoutCtrl($uibModalInstance, order, orderService, cartService) {

	this.$uibModalInstance = $uibModalInstance;
	this.order = order;
	this.orderService = orderService;
	this.cartService = cartService;

}

CheckoutCtrl.prototype.close = function() {

	var self = this;

	var request_body = {
		cart: this.order.cart,
		total: this.order.total,
		tax: this.order.tax,
		final_total: this.order.final_total
	}

	this.orderService.recordOrder(request_body);

	this.cartService.cart = [];
	this.cartService.final_total = 0;
	this.cartService.tax = 0;
	this.cartService.total = 0;

	this.$uibModalInstance.close();


}

CheckoutCtrl.prototype.cancel = function() {

	this.$uibModalInstance.close();

}