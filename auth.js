//. auth.js
var axiosBase = require( 'axios' );

require( 'dotenv' ).config();

var apikey = 'APIKEY' in process.env ? process.env.APIKEY : '';
console.log( {apikey} );
var axios_urlencoded = axiosBase.create({
  baseURL: 'https://iam.cloud.ibm.com',
  //responseType: 'json',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json'
  }
});

var params = new URLSearchParams();
params.append( 'grant_type', 'urn:ibm:params:oauth:grant-type:apikey' );
params.append( 'apikey', apikey );

axios_urlencoded.post( '/identity/token', params )
.then( function( result ){
  if( result && result.data && result.data.access_token ){
    console.log( 'access_token = ' + result.data.access_token );
  }
}).catch( function( err ){
  console.log( {err} );
});
