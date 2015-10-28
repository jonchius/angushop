app.controller('MainCtrl',MainCtrl);

function MainCtrl($location, $uibModal, cartService) {

	this.$location = $location;
	this.$uibModal = $uibModal;
	this.cartService = cartService;
	this.pageClass = 'homepage';

}

MainCtrl.prototype.goToProducts = function() {

	this.$location.path('/products');
	
}

MainCtrl.prototype.viewCart = function() {

	var self = this;
	this.modalProperties = {
		animation: true, 
		templateUrl: 'templates/cart.html',
		controller: 'CartCtrl as Ctrl',
		resolve: {
			cart: function() {
				return self.cartService.cart;
			}
		}
	};
	this.cartModal = this.$uibModal.open(this.modalProperties);

}
