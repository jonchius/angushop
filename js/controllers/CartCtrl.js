app.controller('CartCtrl',CartCtrl);

var TAX_RATE = 0.13; 

function CartCtrl($uibModal, $uibModalInstance, cartService, cart){

	this.$uibModal = $uibModal;
	this.$uibModalInstance = $uibModalInstance;
	this.cartService = cartService;
	this.cart = this.cartService.cart;
	this.order = {};
	
	this.total = 0;
	this.tax = 0;
	this.final_total = 0;

}

CartCtrl.prototype.close = function() {
	this.$uibModalInstance.close();
}

CartCtrl.prototype.clear = function() {
	this.order = {}; this.cart = [];
	this.total = this.tax = this.final_total = 0;
}

CartCtrl.prototype.checkout = function() {
	var self = this;

	this.final_total = this.findTotal();
	this.order = {
		cart: self.cart,
		total: self.total,
		tax: self.tax,
		final_total: self.final_total
	}

	this.modalProperties = {
	    animation:true,
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

  	this.cart = [];

}

CartCtrl.prototype.findTotal = function(){

	if (this.cart.length > 0) {

		this.total = 0;
		
		for (var i=0; i < this.cart.length; i++){
			this.total += parseFloat(this.cart[i].price);
		}
		
		this.tax = this.total * TAX_RATE;
		this.final_total = this.total + parseFloat(this.tax);
	
	} 

	return parseFloat(this.final_total);

}