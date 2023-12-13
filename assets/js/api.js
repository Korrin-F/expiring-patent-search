// use this to send and receive data from the servers 

// Patent View API
// ------------------------------
//const patentViewSecrets = require('../../secrets.js');
//import patentViewSecrets from './secrets.js';

const patentViewApi = {
    urls : {
        beta : "https://search.patentsview.org/api/v1/patent/?",
        legacy : "https://api.patentsview.org/patents/query?"
    },
    headers : {
        'Accept': 'application/json',
        'Authorization': '123', //patentViewSecrets.apiKey, 
        'X-Requested-With': '123' //patentViewSecrets.csrfToken 
    }
}
function callPatentView(urlType, params) {
    let url = "";
    switch (urlType) {
        case "beta":
            url = patentViewApi.urls.beta;
            break;
        case "legacy":
            url = patentViewApi.urls.legacy;
            break;
        default:
            url = patentViewApi.urls.legacy;
    }

    var fullURL = url + "q=" + JSON.stringify(params.q) + "&f=" + JSON.stringify(params.f);

    // Return a Promise
    return getAPI(fullURL, patentViewApi.headers);
}


 function getAPI(url, headers){
    // Return the fetch Promise
    return fetch(url, {
        method: 'GET',
        headers: headers
    })
    .then(response => response.json())
    .catch(error => {
        console.error(error);
        throw error; // Re-throw the error to be caught by the caller
    });
}
// testing the API call for trading view 
// for some reason it is working when using 123 as the api key and csrf token
//callPatentView("legacy", {q:{"_and":[{"_gte":{"app_date":"2007-01-04"}},{"_lte":{"app_date":"2007-12-31"}}]}, f:["patent_title"]})
callPatentView("legacy", {q:{
    "_and": [
      {"_or": [{"patent_type": "Plant"}, {"patent_type": "Utility"}]},
      {"patent_id": "10000574"}
    ]
  }, f:["patent_title"]})

//export {callPatentView};
