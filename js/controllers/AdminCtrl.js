app.controller('AdminCtrl',AdminCtrl);

function AdminCtrl(productService, orderService, $location, products, $uibModal){

	this.productService = productService;
	this.$location = $location;
	this.products = products;
	this.$uibModal = $uibModal;

}

AdminCtrl.prototype.gotoEditProduct = function(selectedProduct) {

	this.$uibModal.open({
		templateUrl: 'templates/edit_product.html',
		controller: 'EditProductModalCtrl as Ctrl',
		animation: true,
		resolve: {
			productToEdit: function() {
				return selectedProduct;
			}
		}
	});

	// this.$location.path('/admin/edit_product/'+productId);

}

AdminCtrl.prototype.gotoShop = function() {

	this.$location.path('/products');
	
}