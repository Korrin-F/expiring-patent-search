// updates the content in the Main Body section

// what year is it? 
var currentYear = new Date().getFullYear();
var mainSearchOption = "expiryYearRange";
var optionalSearchOptions = ["keyword", "patentID", "applicant", "assignee", "inventor", "organization"]


function loadLandingPage() {
    // updates the content in the Main Body section
    $('#landing').attr('class','show'); 
    // ---------------------------

    const containerMain = $('#landing');

    // ---------------------------
    // CONTAINER AND ROWS
    // ---------------------------

    // Main Header Row
    createDivRow("main-header", containerMain);
    var mainHeaderDiv = $('#main-header-row');
    mainHeaderDiv.append("<h2 class='col'>Expiring Patent Search</h2>");

    // Date Range Selector Row
    createDivRow(mainSearchOption, containerMain);

    // Sub-header Row title Optional 
    createDivRow("sub-header", containerMain);
    var subHeaderDiv = $('#sub-header-row');
    subHeaderDiv.append("<h3 class='col'>Optional</h3>");

    // create a container to hold all the options
    var optionsContainer = $('<div id="options-container" class="container-fluid"></div>');
    containerMain.append(optionsContainer);

    //  --- Rows for Optional Options ---
    for(var item in optionalSearchOptions){
        createDivRow(optionalSearchOptions[item], optionsContainer);
    }
    //  --- Header Columns for Optional Options ---
    for(var item in optionalSearchOptions){
        createDivSearchHeaderCol(optionalSearchOptions[item]);
    }



    // ---------------------------
    // SEARCH FEILDS 
    // ---------------------------

    //  --- EXPIRY DATE RANGE SELECTOR --- 
    // createDivRow(mainSearchOption, containerMain);
    createDivSearchHeaderCol(mainSearchOption);
    // Get the current year
    const currentYear = new Date().getFullYear();
    const expiryYearRangeRow = $('#expiryYearRange-row');
    // Create and append start year dropdown with a range of years
    createDropdown('Start Year', 'startYear', currentYear-5, currentYear+5, expiryYearRangeRow); 
    // Create and append end year dropdown with a range of years
    createDropdown('End Year', 'endYear', currentYear-5, currentYear+5, expiryYearRangeRow);

    //  --- KEYWORD SEARCH ---

    //  --- PATENT ID SEARCH ---

    //  --- APPLICANT SEARCH ---

    //  --- ASSIGNEE SEARCH ---

    //  --- INVENTOR SEARCH ---

    //  --- ORGANIZATION SEARCH ---



    // ---------------------------
    //  SEARCH BUTTON 
    // ---------------------------
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
function createDivRow(item, container) {
    // create a row div for each search option and the headers 
    // append each row div to the container
    
    // add the word row at the end of each item in the array
    item += "-row";
    // create a div with the id of the item in the array
    container.append(`<div id="${item}" class="row"></div>`); 
}

// --- CREATE A HEADER COLUMN DIV ---
function createDivSearchHeaderCol(item){
    var row = $("#" + item + "-row");
    item += "-col";
    var col = $(`<div id="${item}" class="col"></div>`);
    row.append(col);
    var header = $(`<h4>header_placement for ${item}</h4>`).attr('id', item + "-header");
    col.append(header);
}




    // 1. search by keyword of patent title
    // 2. search by patent number
    // 3. search by inventor
    // 4. search by assignee
    



// ------------------------------
// Collect inputs and do stuff when search buttons are clicked 
// send info to search results page 