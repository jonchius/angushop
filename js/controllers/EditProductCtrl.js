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
		description: editedProduct.description,
		price: editedProduct.price,
		category: editedProduct.category,
		quantity: editedProduct.quantity,
		status: editedProduct.status
	}

	//console.log(editedProduct.productId);
	//console.log(editedProduct);

	this.productService.editProduct(editedProduct.productId, request_body)
		.then(function(response) {
			console.log("Success: product edited");
			self.$uibModalInstance.close();
		})
		.catch(function(response) {
			console.log("Error: product not edited");
		});
}


