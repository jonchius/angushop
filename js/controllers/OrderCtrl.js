app.controller('OrderCtrl',OrderCtrl);

function OrderCtrl(orderService){

	this.orderService = orderService;
	this.orders = this.orderService.orders;
	
}