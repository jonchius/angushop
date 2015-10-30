app.controller('EditProductModalCtrl', EditProductModalCtrl);

function EditProductModalCtrl($uibModalInstance, productService, productToEdit) {

	this.$uibModalInstance = $uibModalInstance;
	this.productService = productService;
	this.productToEdit = productToEdit;

	console.log(this.productToEdit);

}

EditProductModalCtrl.prototype.cancel = function() {
  this.$uibModalInstance.dismiss('cancel');
};

EditProductModalCtrl.prototype.saveEdits = function(editedProduct) {

	var self = this;

	var request_body = {
		name: editedProduct.name,
		image: editedProduct.image, 
		description: editedProduct.description,
		price: editedProduct.price,
		category: editedProduct.category,
		quantity: editedProduct.quantity,
		status: editedProduct.status
	}

	this.productService.editProduct(editedProduct.productId, request_body)
		.then(function(response) {
			console.log("Success: product edited");
			self.$uibModalInstance.close();
			console.log(response);
			// self.productService.setProducts(self.productService.products);
		})
		.catch(function(response) {
			console.log("Error: product not edited");
		});
}


