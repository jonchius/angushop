app.service('orderService', OrderService);

function OrderService(api) {

	this.api = api;

}

OrderService.prototype.recordOrder = function(order) {

	return this.api.request('/record_order', order, 'POST');
	
}