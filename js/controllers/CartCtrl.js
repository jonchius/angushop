app.controller('CartCtrl',CartCtrl);

function CartCtrl($uibModal, $uibModalInstance, cartService, cart){

	this.$uibModal = $uibModal;
	this.$uibModalInstance = $uibModalInstance;
	this.cartService = cartService;
	this.cart = this.cartService.cart;
	this.order = {};

}

CartCtrl.prototype.close = function() {
	this.$uibModalInstance.close();
}

CartCtrl.prototype.clear = function() {
	this.cartService.clearCart();
}

CartCtrl.prototype.checkout = function() {

	var self = this;

	this.order = {
		cart: self.cart,
		total: self.cartService.total,
		tax: self.cartService.tax,
		final_total: self.cartService.final_total
	}

	this.modalProperties = {
	    animation: true,
	    templateUrl: 'templates/checkout.html',
	    controller: 'CheckoutCtrl as Ctrl',
	    resolve: {
	    	order: function(){
	    		return self.order;
	    	}
	    }
  	}

  	this.$uibModalInstance.close();
  	this.$uibModalInstance = this.$uibModal.open(this.modalProperties);


}

