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
			
			var temp = localStorage.getItem('products');
					temp = JSON.parse(temp);

			for (var i=0; i<temp.length; i++) {
				if(response.data.productId == temp[i].productId) {
					temp.splice(i,1,response.data);
				}
			}
			localStorage.setItem('products', JSON.stringify(temp));
			self.$uibModalInstance.close();
		})
		.catch(function(response) {
			console.log("Error: product not edited");
		});
}


