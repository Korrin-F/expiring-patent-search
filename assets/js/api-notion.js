// Notion API
// ------------------------------


function createHeading2Block(heading) {
    return {
        "object": "block",
        "type": "heading_2",
        "heading_2": {
          "rich_text": [
            {
              "type": "text",
              "text": {
                "content": heading
              }
            }
          ]
        }
      }
}
function createParagraphBlock(paragraph) {
    return {
        "object": "block",
        "type": "paragraph",
        "paragraph": {
          "rich_text": [
            {
              "type": "text",
              "text": {
                "content": paragraph
              }
            }
          ]
        }
      }
}

function createNotionDatabaseData(data){
    let secrets = getSecrets();
    console.log(secrets);

    let patentViewData = data
    // let notionData = {
    //     id, 
    //     title,
    //     abstract, 
    //     grantYear,
    //     filingDate,
    //     expiryDate,
    //     totalInventors, [{"inventor_first_name": "John", "inventor_last_name": "Doe"}}]
    //     totalAssignees, [{"assignee_first_name": "John", "assignee_last_name": "Doe", "assignee_organization": "Doe Inc"}]
    //     inventorsArray,
    //     assigneesArray
    // } 
    let selectOption = {
        unknown: {
            "id": "72edc088-2390-4f53-b91f-50f709714c35",
            "name": "Unknown",
            "color": "default"
        },
        expired: {
            "id": "127bc37b-c7cb-44bc-8e3f-f82cf170e6d8",
            "name": "Expired",
            "color": "green"
        },
        active: {
            "id": "fcbaf98f-edfb-4b19-800b-357ff8047207",
            "name": "Active",
            "color": "orange"
        }  
    }

    let patentStatus = {}

    if (patentViewData.expiryDate === ""){
        patentStatus = selectOption.unknown
    }// if the expiry date is in the future
    else if (Date.parse(patentViewData.expiryDate) > Date.now()){
        patentStatus = selectOption.active
    }// if the expiry date is in the past
    else if (Date.parse(patentViewData.expiryDate) < Date.now()){
        patentStatus = selectOption.expired
    }

    let childrenArray = []

    // add the abstract
    childrenArray.push(createHeading2Block("Abstract"))
    childrenArray.push(createParagraphBlock(patentViewData.abstract))
    // add inventors heading
    childrenArray.push(createHeading2Block("Inventors"))
    // add inventors
    // if there are no inventors
    if (patentViewData.inventorsArray.length === 0){
        childrenArray.push(createParagraphBlock("No inventors found"))
    }else{
        for (let inventor of patentViewData.inventorsArray){
            childrenArray.push(createParagraphBlock(`${inventor.inventor_first_name} ${inventor.inventor_last_name}`))
        }
    }
    // add assignees heading
    childrenArray.push(createHeading2Block("Assignees"))
    // add assignees
    // if there are no assignees
    if (patentViewData.assigneesArray.length === 0){
        childrenArray.push(createParagraphBlock("No assignees found"))
    }else{
        for (let assignee of patentViewData.assigneesArray){
            // if there the assignee is an organization
            if (assignee.assignee_organization){
            childrenArray.push(createParagraphBlock(assignee.assignee_organization))
            }
            // if the assignee has a first and last name
            else if (assignee.assignee_first_name && assignee.assignee_last_name){
                childrenArray.push(createParagraphBlock(`${assignee.assignee_first_name} ${assignee.assignee_last_name}`))
            }
            // if the assignee only has a first name
            else if (assignee.assignee_first_name){
                childrenArray.push(createParagraphBlock(assignee.assignee_first_name))
            }
            // if the assignee only has a last name
            else if (assignee.assignee_last_name){
                childrenArray.push(createParagraphBlock(assignee.assignee_last_name))
            }
        }
    }
    let notionDatabase = secrets.notionSecrets.NOTION_DATABASE;
    return {
        "parent": {
          "database_id": notionDatabase
        },
        "properties": {
          "filing_date": {
            "date": {
              "start": `${patentViewData.filingDate}T00:00:00Z`,
              "end": null
            }
          },
          "patent_title": {
            "rich_text": [
              {
                "text": {
                  "content": patentViewData.title
                }
              }
            ]
          },
          "patent_status": {
            "select": patentStatus
          },
          "patent_id": {
            "title": [
              {
                "text": {
                  "content": patentViewData.id
                }
              }
            ]
          }
        },
        "children": childrenArray
      }
}

function newNotionDatabaseEntry(data){
    let secrets = getSecrets();
    console.log(secrets);

    let rawNotionData = JSON.stringify(data);
    let key = secrets.notionSecrets.NOTION_KEY;
    let version = secrets.notionSecrets.NOTION_VERSION;

    let notionHeaders = new Headers();
    notionHeaders.append("Authorization", `Bearer ${key}`);
    notionHeaders.append("Content-Type", "application/json");
    notionHeaders.append("Notion-Version", version);
    
    let notionRequestOptions = {
        method: 'POST',
        headers: notionHeaders,
        body: rawNotionData,
        redirect: 'follow'
      };

    return fetch("https://api.notion.com/v1/pages/", notionRequestOptions)
    .then(response => response.json())
    .catch(error => {console.error(error);
    throw error; // Re-throw the error to be caught by the caller
    });
}



