//. req.js
var axiosBase = require( 'axios' );

require( 'dotenv' ).config();

var apikey = 'APIKEY' in process.env ? process.env.APIKEY : '';
var project_id = 'PROJECT_ID' in process.env ? process.env.PROJECT_ID : ''; //. IBM watsonx ダッシュボードのプロジェクト一覧から確認
//console.log( {apikey} );
//console.log( {project_id} );
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
    //console.log( 'access_token = ' + result.data.access_token );

    var axios = axiosBase.create({
      baseURL: 'https://us-south.ml.cloud.ibm.com',
      responseType: 'json',
      headers: {
        'Authorization': 'Bearer ' + result.data.access_token,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    var data = {
      'model_id': 'ibm/mpt-7b-instruct2',
      //'input': '',
      'parameters': {
        "decoding_method": "greedy",
        "max_new_tokens": 100,   //. この位はないと厳しい・・・
        "min_new_tokens": 0,
        "stop_sequences": [],
        "repetition_penalty": 1
      },
      'project_id': project_id 
    };

    var input = `
    日本語に翻訳してください\\n\\nInput:\\nAbout Watson Discovery\\nIBM Watson® Discovery is an intelligent document processing engine that helps you to gain insights from complex business documents.\\n\\n翻訳\\n
    `;
    data.input = input; 

    axios.post( '/ml/v1-beta/generation/text?version=2023-05-29', data )
    .then( function( result ){
      //console.log( {result} );
      console.log( JSON.stringify( result.data.results, null, 2 ) ); 
      /*
      [
        { 
          generated_text: "Watson Discovery はビジネスドキュメントに関する洞察を得るための知能型ドキュメント処理エンジンです。\\n\\n\n    Watson Discoveryはビジネスドキュメン トに関する洞察を得るための知能型ドキュメント処理エンジンです。\n",
          generated_token_count: 20,
          input_token_count: 61,
          stop_reason: "MAX_TOKENS"
        }
      ]
      */
    }).catch( function( err ){
      //console.log( {err} );
      console.log( err.response );
    });
  }
}).catch( function( err ){
  console.log( {err} );
});
