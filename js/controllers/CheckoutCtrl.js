app.controller('CheckoutCtrl',CheckoutCtrl);

function CheckoutCtrl($uibModalInstance, order, orderService, productService, cartService) {

	this.$uibModalInstance = $uibModalInstance;
	this.order = order;
	this.orderService = orderService;
	this.productService = productService;
	this.cartService = cartService;
	this.customerName = '';
	this.customerAddress = '';
	this.customerCity = '';
	this.customerSubcountry = '';
	this.customerCountry = '';
	this.customerPostal = '';
	this.customerPhone = '';
	this.customerEmail = '';
	this.customerCreditName = '';
	this.customerCreditCard = '';
	this.customerCreditExpiry = '';
	this.customerCreditCVC = '';

}

CheckoutCtrl.prototype.confirm = function() {

	this.customer = { 
		name: this.customerName,
		address: this.customerAddress,
		city: this.customerCity,
		subcountry: this.customerSubcountry,
		country: this.customerCountry,
		postal: this.customerPostal,
		phone: this.customerPhone,
		email: this.customerEmail,
		creditName: this.customerCreditName,
		creditCard: this.customerCreditCard,
		creditExpiry: this.customerCreditExpiry,
		creditCVC: this.customerCreditCVC
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
		var self = this;
		var productInStock = this.productService.getProduct(this.order.cart.products[i].product.productId)
		productInStock.quantity = parseInt(productInStock.quantity) - parseInt(self.order.cart.products[i].quantity);
		var newProduct = self.productService.editProduct(productInStock.productId, productInStock)
			.then(function (response) { 

				var temp = localStorage.getItem('products');
				temp = JSON.parse(temp);

				for (var i=0; i<temp.length; i++) {
					if(response.data.productId == temp[i].productId) {
						temp.splice(i,1,response.data);
					}	
				}
				localStorage.setItem('products', JSON.stringify(temp));

			});	
	}

	this.cartService.clearCart();	
	this.$uibModalInstance.close();


}

CheckoutCtrl.prototype.cancel = function() {

	this.$uibModalInstance.close();

}