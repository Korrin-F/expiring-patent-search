// use this to send and receive data from the servers 

// Patent View API
// ------------------------------
//const patentViewSecrets = require('../../secrets.js');
import patentViewSecrets from '../../secrets.js';

const patentViewApi = {
    urls : {
        beta : "https://search.patentsview.org/api/v1/patent/?",
        legacy : "https://api.patentsview.org/patents/query?"
    },
    headers : {
        'Accept': 'application/json',
        'Authorization': patentViewSecrets.apiKey, 
        'X-Requested-With': patentViewSecrets.csrfToken 
    }
}

function callPatentView(urlType, params){
    // url will be either beta or legacy
    let url = "";
    switch(urlType){
        case "beta":
            url = patentViewApi.urls.beta;
            break;
        case "legacy":
            url = patentViewApi.urls.legacy;
            break;
        default:
            url = patentViewApi.urls.legacy;
    }
    // data will be an object with the parameters for the API call q & f
    // construct the full url with parameters
    var fullURL = url + "q=" + JSON.stringify(params.q) + "&f=" + JSON.stringify(params.f);
    // call the API
    let response = getAPI(fullURL, patentViewApi.headers);
    return response;
}

function getAPI(url, headers){
    fetch(url, {
        method: 'GET',
        headers: headers
    })
    .then(response => response.json())
    .then(data => {
        // do something with the data
        console.log(data);
    })
    .catch(error => {
        // handle the error
        console.error(error);
    });
}

callPatentView("legacy", {q:{"patent_id":"10000574"}, f:["patent_title"]})