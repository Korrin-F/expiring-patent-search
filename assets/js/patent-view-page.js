// updates the content in the Main Body section
// example data

// patents: {
    //patent_id: "4777771", 
    //patent_title: "Grinding tool", 
    //patent_year: "1988", 
    //patent_processing_time: null, 
    //inventors: [{
        //inventor_first_name: "Paul J.", 
        //inventor_last_name: "Becker", 
        //inventor_key_id: "1069508"}, 
        //{
        //inventor_first_name: "Manfred", inventor_last_name: "Brinkmann", inventor_key_id: "3216585"}], …}

// total_patent_count: 1

let notionData;

function loadPatentViewPage(data){
    const resultsData = data;
    console.log("resultsData: " + resultsData);

    // --- Data ---
    let id = resultsData.patents[0].patent_id;
    let title = resultsData.patents[0].patent_title;
    let abstract = resultsData.patents[0].patent_abstract;
    let grantYear = resultsData.patents[0].patent_year;
    let filingDate = resultsData.patents[0].applications[0].app_date;
    let processingTime = resultsData.patents[0].patent_processing_time;
    let inventorsArray = resultsData.patents[0].inventors;
    let assigneesArray = resultsData.patents[0].assignees;
    let expiryDate = "";

    //console log the data values 
    console.log("id: " + id);
    console.log("title: " + title);
    console.log("abstract: " + abstract);
    console.log("grantYear: " + grantYear);
    console.log("filingDate: " + filingDate);
    console.log("patent_processing_time: " + processingTime);
    console.log("inventorsArray: " + inventorsArray);
    console.log("assigneesArray: " + assigneesArray);
    // total inventors
    let totalInventors = resultsData.patents[0].inventors.length; 
    console.log("totalInventors: " + totalInventors);
    // total assignees
    let totalAssignees = resultsData.patents[0].assignees.length;
    console.log("totalAssignees: " + totalAssignees);

    // --- Main Content ---
    const mainSection = $('#patentView-container');
    const pageName = mainSection.attr('id').slice(0, -10); // patentView

    // --- Header ---
    createRow(pageName + "-header", mainSection, "div");
    const headerRow = $("#" + pageName + "-header-row");
    headerRow.addClass("mt-4 mb-3");
    // col for header
    createCol(headerRow, pageName + "-header");
    const headerCol = $("#patentView-header-col");
    headerCol.addClass("col-9 mx-auto");
    headerCol.append($(`<h1 id="${pageName}-header" class="text-center">${title}</h1>`));
   
    // --- ID and Save Button Row ---
    createRow("save-id", $('#patentView-container'), "div");
    const idRow = $("#save-id-row");
    idRow.addClass("justify-content-between my-2");

    // --- ID Col & Group ---
    createCol(idRow, "id");
    const idCol = $("#id-col");
    idCol.addClass("col-6");
    createInputGroup(idCol, "id");

    // --- ID Header ---
    createInputGroupHeader($("#id-group"), "id", "Patent ID");

    // --- ID Text ---
    createInputGroupText($("#id-group"), "id", id);

    // --- Save Button ---
    createCol(idRow, "button");
    const buttonCol = $("#button-col");
    buttonCol.addClass("col-1");
    $("<button type='button' class='btn btn-primary w-100 h-100' id='save-button'>Save</button>").appendTo(buttonCol);

    // --- Filing & Expiring Date ---
    // create a row to hold the dates
    createRow("dates", mainSection, "div");
    const datesRow = $("#dates-row");
    datesRow.addClass("justify-content-start my-3");
    // create a column to hold the filing date
    createCol(datesRow, "filing"); 
    const filingCol = $("#filing-col");
    filingCol.addClass("col-6");
    // create an input group to hold the filing date
    createInputGroup(filingCol, "filing");
    const filingGroup = $("#filing-group");
    filingGroup.addClass("justify-content-start");
    // create a header field
    createInputGroupHeader(filingGroup, "filing", "Filing Date");
    // create a text field
    createInputGroupText(filingGroup, "filing", filingDate);
    // create a column to hold the expiring date
    createCol(datesRow, "expiring");
    const expiringCol = $("#expiring-col");
    expiringCol.addClass("col-6");
    // create an input group to hold the expiring date
    createInputGroup(expiringCol, "expiring");
    const expiringGroup = $("#expiring-group");
    expiringGroup.addClass("justify-content-start");
    // create a header field
    createInputGroupHeader(expiringGroup, "expiring", "Expiring Date");
    // create a text field
    // check if the patent_processing_time is null
    if (processingTime !== undefined && processingTime !== null) {
        expiryDate = addDaysToDate(filingDate, processingTime);
        createInputGroupText(expiringGroup, "expiring", expiryDate);
    } else {
        const newDateStr = addYearsToDate(filingDate, 20);
        createInputGroupText(expiringGroup, "expiring", "est-"+ newDateStr);
    }

    // --- Assignee & Inventor Row ---
    // create a row to hold the assignee and inventor
    createRow("assignee-inventor", mainSection, "div");
    const assigneeInventorRow = $("#assignee-inventor-row");
    assigneeInventorRow.addClass("my-3");
    // create a col to hold the assignee
    createCol(assigneeInventorRow, "assignee");
    const assigneeCol = $("#assignee-col");
    // add a header to the assingee col
    createInputGroupHeader(assigneeCol, "assignee", "Assignees");
    // create a list group to hold the assignees
    createlistGroup(assigneeCol, "assignee");
    const assigneeListGroup = $("#assignee-list-group");
    for(let assignee in assigneesArray){
        // create a list group item for each assignee attribute
        let name = "";
        if (assigneesArray[assignee].assignee_first_name !== undefined && assigneesArray[assignee].assignee_first_name !== null) {
            name += assigneesArray[assignee].assignee_first_name + " ";
        }
        if (assigneesArray[assignee].assignee_last_name !== undefined && assigneesArray[assignee].assignee_last_name !== null) {
            name += assigneesArray[assignee].assignee_last_name;
        }
        if (name !== "") {
            createListGroupItem(assigneeListGroup, "assignee", name);
        }
        if (assigneesArray[assignee].assignee_organization !== undefined && assigneesArray[assignee].assignee_organization !== null) {
            createListGroupItem(assigneeListGroup, "assignee", assigneesArray[assignee].assignee_organization);
        }
    }
    // create a col to hold the inventor
    createCol(assigneeInventorRow, "inventor");
    const inventorCol = $("#inventor-col");
    // add a header to the inventor col
    createInputGroupHeader(inventorCol, "inventor", "Inventors");
    // create a list group to hold the inventors
    createlistGroup(inventorCol, "inventor");
    const inventorListGroup = $("#inventor-list-group");
    for(let inventor in inventorsArray){
        // create a list group item for each inventor attribute
        let name = "";
        if (inventorsArray[inventor].inventor_first_name !== undefined && inventorsArray[inventor].inventor_first_name !== null) {
            name += inventorsArray[inventor].inventor_first_name + " ";
        }
        if (inventorsArray[inventor].inventor_last_name !== undefined && inventorsArray[inventor].inventor_last_name !== null) {
            name += inventorsArray[inventor].inventor_last_name;
        }
        if (name !== "") {
            createListGroupItem(inventorListGroup, "inventor", name);
        }
    }

    // --- Abstract ---
    // create a row to hold the abstract
    createRow("abstract", mainSection, "div");
    const abstractRow = $("#abstract-row");
    abstractRow.addClass("my-3");
    // create a col to hold the abstract
    createCol(abstractRow, "abstract");
    const abstractCol = $("#abstract-col");
    // add a header to the abstract col
    createInputGroupHeader(abstractCol, "abstract", "Abstract");
    // create a text field to hold the abstract
    createListGroupItem(abstractCol, "abstract", abstract);
    // text var
    let abstractText = $("#abstract-list-group-item");
    abstractText.addClass("p-2");

    // --- Data Object for API ---
    notionData = {
        id, 
        title,
        abstract,
        grantYear,
        filingDate,
        processingTime,
        expiryDate,
        totalInventors,
        totalAssignees,
        inventorsArray,
        assigneesArray
    }
    
}

function createInputGroup(appendTo, id){
    let inputGroup = $("<div class='input-group'>");
    inputGroup.attr("id", id + "-group");
    inputGroup.appendTo(appendTo);
}
function createInputGroupHeader(appendTo, id, text){
    let inputGroupSpan = $("<span class='input-group-text'></span>");
    let header = $(`<h4 class='field-header' id="${id}-header">${text}: </h4>`)
    header.appendTo(inputGroupSpan); 
    inputGroupSpan.appendTo(appendTo);
}
function createInputGroupText(appendTo, id, text){
    let inputGroupSpan = $("<span class='input-group-text field-text'>");
    let content = $(`<h5 class='field-text pt-1' id="${id}-text">${text}</h5>`)
    content.appendTo(inputGroupSpan);
    inputGroupSpan.appendTo(appendTo);
}
function createCol(appendTo, id){
    let col = $("<div class='col'>");
    col.attr("id", id + "-col");
    appendTo.append(col);
}
function addDaysToDate(dateStr, processingTime) {
    const originalDate = new Date(dateStr);
    let newDate = new Date(originalDate.getTime() + processingTime * 24 * 60 * 60 * 1000);
    newDate = formatAsDateString(newDate);
    return addYearsToDate(newDate, 20);
}
function addYearsToDate(dateStr, years) {
    const originalDate = new Date(dateStr);
    const newDate = new Date(originalDate);
    newDate.setFullYear(originalDate.getFullYear() + years);
    return formatAsDateString(newDate);
}
function formatAsDateString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
function createlistGroup(appendTo, id){
    let listGroup = $("<ul class='list-group'>");
    listGroup.attr("id", id + "-list-group");
    listGroup.appendTo(appendTo);
}
function createListGroupItem(appendTo, id, text){
    let listGroupItem = $("<li class='list-group-item'>");
    listGroupItem.attr("id", id + "-list-group-item");
    listGroupItem.text(text);
    listGroupItem.appendTo(appendTo);
}

$('#main').on("click", '#patentView-container', async function(event) {
    event.preventDefault();
    console.log("patentView-container clicked");
    // if the target is a button
    if (event.target.tagName === "BUTTON") {
        event.stopPropagation(); //the click was registering twice

        // create a local storage container if it does not exist called favorites
        if (localStorage.getItem("favorites") === null) {
            localStorage.setItem("favorites", JSON.stringify([notionData]));
        }// if the favorites container does exist add the new data to it
        else {
            let favorites = JSON.parse(localStorage.getItem("favorites"));
            favorites.push(notionData);
            localStorage.setItem("favorites", JSON.stringify(favorites));
        }


        // --- Send Data to Notion --- (error with cors? preflight check failed)
        // let notionQueryData = createNotionDatabaseData(notionData);
        
        // try {
        //     let response = await newNotionDatabaseEntry(notionQueryData);
        //     console.log(response);
        //     navigateToPage('patentView', response);
        // } catch (error) {
        //     // Handle errors here
        //     console.error(error);
        // }
    } 
});

