// Notion API
// ------------------------------


const notionApi = {
    url : 'https://api.notion.com/v1/',
    headers : {
        'Accept': 'application/json',
        'Authorization': `Bearer ${notion.NOTION_KEY}`, //notion.NOTION_KEY,
        'Notion-Version': notion.NOTION_VERSION 
    }
}

function newNotionDatabaseEntry(data){
    let rawNotionData = JSON.stringify(data);

    let notionHeaders = new Headers();
    notionHeaders.append("Authorization", `Bearer ${notion.NOTION_KEY}`);
    notionHeaders.append("Content-Type", "application/json");
    notionHeaders.append("Notion-Version", `${notion.NOTION_VERSION}`);
    
    let notionRequestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: rawNotionData,
        redirect: 'follow'
      };

    return fetch("https://api.notion.com/v1/pages/:id", notionRequestOptions)
    .then(response => response.json())
    .catch(error => {console.error(error);
    throw error; // Re-throw the error to be caught by the caller
    });
}

function postAPI(url, headers, body){
    // Return the fetch Promise
    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
    })
    .then(response => response.json())
    .catch(error => {
        console.error(error);
        throw error; // Re-throw the error to be caught by the caller
    });
}

