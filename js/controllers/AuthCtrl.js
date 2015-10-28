app.controller('AuthCtrl',AuthCtrl);

function AuthCtrl(api, $location){
	// inject API service and the Angular $location service into this controller
	this.api = api;
	this.$location = $location;

}

AuthCtrl.prototype.authenticate = function(username, password){
	
	// make a variable to access the AuthCtrl object in promises' then() method calls
	var self = this;

	// encode user input parameters (username and password) into a JSON object
	var request_body = {
		username: username,
		password: password
	};

	// make a request to the /login API endpoint 
	this.api.request('/login', request_body, 'POST')
	.then(function(response) {

		// then... if the API response's authToken is not invalid AND not blank
    	if (response.data.authToken != 'Invalid Credentials' && response.data.authToken != null) {
	      	
	      	// remove products item from local storage
	      	localStorage.removeItem('products');

	      	// store admin session in local storage with key called authToken and value of api response's authToken value
	      	localStorage.setItem('authToken',response.data.authToken);
	      	
	      	// send user to admin page
	      	self.$location.path('/admin');

      	}

    });

};