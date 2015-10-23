app.controller('AuthCtrl',AuthCtrl);

function AuthCtrl(api,$location){
	this.api = api;
	this.$location = $location;
}

AuthCtrl.prototype.authenticate = function(username,password){
	
	var self = this;
	
	var request_body = {
		username:username,
		password:password
	};

	this.api.request('/login',request_body,'POST')
	.then(function(response) {
      console.log(response);
      if(response.data.authToken != 'Invalid Credentials'){
      	//reset local storage data
      	localStorage.removeItem('products');
      	localStorage.setItem('authToken',response.data.authToken);
      	self.$location.path('/admin');
      }
    });;
}