app.service('orderService', OrderService);

function OrderService(api) {

	this.api = api;
	this.orders = localStorage.getItem('orders');

}

OrderService.prototype.recordOrder = function(order) {

	return this.api.request('/record_order', order, 'POST')
		.then(function(response) { 
			console.log(response);
		});
	
}

OrderService.prototype.setOrders = function(orders) {

	this.orders = orders;
	var orderStorage = JSON.stringify(orders);
	localStorage.setItem('orders', orderStorage);
	
}

OrderService.prototype.getOrders = function() {

	var self = this;

	return this.api.request('/retrieve_orders/team4', {}, 'GET')
		.then(function(response) { 
			self.setOrders(response.data.orders);
			return response.data.orders;
		});

}