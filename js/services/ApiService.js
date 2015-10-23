
function ApiService($http) {
  this.http = $http;
}

angular.module('ShopApp').service('api', ApiService);


//constants
var BASE_URL = 'http://174.129.248.23/brainstation/shop';
var HEADERS = {headers : {'Content-Type': 'application/x-www-form-urlencoded'}};


ApiService.prototype.request = function(endpoint,data,method) {

  //build request
  if(method == 'POST'){
    data = JSON.stringify(data);
    data = this.serializeData({'data':data});
    return this.http.post(BASE_URL + endpoint,data,HEADERS)
  }
  else if(method == 'GET'){
    return this.http.get(BASE_URL + endpoint,'',HEADERS);
  }

};


//helper function for serializing data for the api
ApiService.prototype.serializeData = function(data) { 
    // If this is not an object, defer to native stringification.
    if ( ! angular.isObject( data ) ) { 
        return( ( data == null ) ? "" : data.toString() ); 
    }
    var buffer = [];
    // Serialize each key in the object.
    for ( var name in data ) { 
        if ( ! data.hasOwnProperty( name ) ) { 
            continue; 
        }
        var value = data[ name ];
        buffer.push(
            encodeURIComponent( name ) + "=" + encodeURIComponent( ( value == null ) ? "" : value )
        ); 
    }
    // Serialize the buffer and clean it up for transportation.
    var source = buffer.join( "&" ).replace( /%20/g, "+" ); 
    return(source); 
}



