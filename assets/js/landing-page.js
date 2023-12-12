// updates the content in the Main Body section

// what year is it? 
var currentYear = new Date().getFullYear();
var mainSearchOption = {
    expiryYearRange: "Year Range of Expiry"
};
var optionalSearchOptions = {
    keyword: "Keyword", 
    patentID:"Patent ID", 
    applicant: "Applicant", 
    assignee:"Assignee", 
    inventor:"Inventor", 
    organization:"Organization"
};


function loadLandingPage() {
    // updates the content in the Main Body section
    $('#landing').attr('class','show'); 
    // ---------------------------

    const containerMain = $('#landing');

    // ---------------------------
    // CONTAINER AND ROWS
    // ---------------------------

    // Main Header Row
    createRow("main-header", containerMain, "div");
    var mainHeaderDiv = $('#main-header-row');
    mainHeaderDiv.append("<h2 class='col'>Expiring Patent Search</h2>");

    // Date Range Selector Row
    createRow(Object.keys(mainSearchOption)[0], containerMain, "form");

    // Sub-header Row title Optional 
    createRow("sub-header", containerMain, "div");
    var subHeaderDiv = $('#sub-header-row');
    subHeaderDiv.append("<h3 class='col'>Optional</h3>");

    // create a container to hold all the options
    var optionsContainer = $('<div id="options-container" class="container-fluid"></div>');
    containerMain.append(optionsContainer);

    //  --- Rows for Optional Options ---
    for(var value in optionalSearchOptions){
        createRow(value, optionsContainer, "form");
    }
    //  --- Header Columns for Optional Options ---
    for(const key in optionalSearchOptions){
        console.log(key);
        if (optionalSearchOptions.hasOwnProperty(key)) {
        const value = optionalSearchOptions[key];
        console.log(value);
        createDivSearchHeaderCol(key,value);
        }
    }



    // ---------------------------
    // SEARCH FEILDS 
    // ---------------------------

    //  --- EXPIRY DATE RANGE SELECTOR --- 
    // createDivRow(mainSearchOption, containerMain);
    for(const key in mainSearchOption){
        console.log(key);
        if (mainSearchOption.hasOwnProperty(key)) {
        const value = mainSearchOption[key];
        console.log(value);
        createDivSearchHeaderCol(key,value);
        }
    }
    
    // Get the current year
    const currentYear = new Date().getFullYear();
    const expiryYearRangeRow = $('#expiryYearRange-row');
    // Create and append start year dropdown with a range of years
    createDropdown('Start Year', 'startYear', currentYear-5, currentYear+5, expiryYearRangeRow); 
    // Create and append end year dropdown with a range of years
    createDropdown('End Year', 'endYear', currentYear-5, currentYear+5, expiryYearRangeRow);

    //  --- KEYWORD SEARCH ---
    createTextFieldCol("Keyword", $("#keyword-row"));
    //  --- PATENT ID SEARCH ---
    createTextFieldCol("Patent ID", $("#patentID-row"));
    //  --- APPLICANT SEARCH ---
    createTextFieldCol("Applicant First Name", $("#applicant-row"));
    createTextFieldCol("Applicant Last Name", $("#applicant-row"));
    createTextFieldCol("Applicant ID", $("#applicant-row"));
    //  --- ASSIGNEE SEARCH ---
    createTextFieldCol("Assignee First Name", $("#assignee-row"));
    createTextFieldCol("Assignee Last Name", $("#assignee-row"));
    createTextFieldCol("Assignee ID", $("#assignee-row"));
    //  --- INVENTOR SEARCH ---
    createTextFieldCol("Inventor First Name", $("#inventor-row"));
    createTextFieldCol("Inventor Last Name", $("#inventor-row"));
    createTextFieldCol("Inventor ID", $("#inventor-row"));
    //  --- ORGANIZATION SEARCH ---
    createTextFieldCol("Organization Name", $("#organization-row"));
    var radioButtonDiv = $('<div id="organization-radio-col" class="col"></div>');
    $("#organization-row").append(radioButtonDiv);
    createRadioButton("Applicant", radioButtonDiv);
    createRadioButton("Assignee", radioButtonDiv);
    createRadioButton("Inventor", radioButtonDiv);


    // ---------------------------
    //  SEARCH BUTTON 
    // ---------------------------

    createRow("search-button", containerMain, "form");
    var searchButtonDiv = $('#search-button-row');
    searchButtonDiv.append("<button id='search-button' class='btn btn-primary'>Search</button>");
}

// --- EXPIRY YEAR RANGE SELECTOR ---
// Function to create and append label and select tags
function createDropdown(labelText, dropdownId, startYear, endYear, container) {
    const col = $('<div class="col"></div>');
    container.append(col);

    // Create and append label
    col.append(`<label for="${dropdownId}">${labelText}:</label>`);

    // Create and append select
    const select = $(`<select id="${dropdownId}"></select>`);
    col.append(select);

    // Populate select with a range of years
    for (let year = startYear; year <= endYear; year++) {
    select.append(`<option value="${year}">${year}</option>`);
    }
}

// --- CREATE A ROW DIV ---
function createRow(key, container, type) {
    // create a row div for each search option and the headers 
    // append each row div to the container
    
    // add the word row at the end of each item in the array
    key += "-row";
    // create a div with the id of the item in the array
    container.append(`<${type} id="${key}" class="row"></${type}>`); 
}

// --- CREATE A HEADER COLUMN DIV ---
// function createDivSearchHeaderCol(key,value){
//     console.log(key);
//     var row = $("#" + key + "-row");
//     key += "-col";
//     var col = $(`<div id="${key}" class="col"></div>`);
//     row.append(col);
//     var header = $(`<h4>${value}</h4>`).attr('id', key + "-header");
//     col.append(header);
// }

function createDivSearchHeaderCol(key,value){
    console.log(key);
    var row = $("#" + key + "-row");
    // testing bootstraps input group
    row.attr('class', 'input-group');
    var header = $(`<span class="input-group-text" id="${key}-header"><h4>${value}</h4></span>`);
    row.append(header);
}

// --- CREATE A TEXT FIELD COL ---
// function createTextFieldCol(item, container){
//     var col = $(`<div id="${item}-col" class="col"></div>`);
//     container.append(col);
//     var textField = $(`<input type="text" class="form-control" id="${item}-text-field" placeholder="${item}" aria-label="${item}">`);
//     col.append(textField);
// }

function createTextFieldCol(item, container){
    var textField = $(`<input type="text" class="form-control" id="${item}-text-field" placeholder="${item}" aria-label="${item}">`);
    container.append(textField);
}

// --- CREATE A RADIO BUTTON ---
function createRadioButton(text, container){
    var div = $('<div class="form-check"></div>');
    var id = text.toLowerCase().replace(" ", "-") + "-radio";
    var radio = $(`<input class="form-check-input" type="radio" name="${id}" id="${id}">`);
    var label = $(`<label class="form-check-label" for="${id}"></label>`).text(text);
    div.append(radio);
    div.append(label);
    container.append(div);
}

// ------------------------------
// Collect inputs and do stuff when search buttons are clicked 
// send info to search results page 