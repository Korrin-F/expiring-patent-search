// updates the content in the Main Body section

// what year is it? 
var currentYear = new Date().getFullYear();
var mainSearchOption = "expiryYearRange";
var optionalSearchOptions = ["keyword", "patentID", "applicant", "assignee", "inventor", "organization"]


function loadLandingPage() {
    // updates the content in the Main Body section
    $('#landing').attr('class','show'); 

    const container = $('#landing');

    // ---------------------------
    // SEARCH OPTIONS 
    // ---------------------------

    //  --- Expiry date range selector --- 
    createDivRow(mainSearchOption);
    // Get the current year
    const currentYear = new Date().getFullYear();
    // Create and append start year dropdown with a range of years
    createDropdown('Start Year', 'startYear', currentYear-5, currentYear+5);
    // Create and append end year dropdown with a range of years
    createDropdown('End Year', 'endYear', currentYear-5, currentYear+5);

    //  --- Optional Header ---
    // Create and append header
    createDivRow("sub-header");
    var subHeaderDiv = $('#sub-header-row');
    subHeaderDiv.append("<h3>Optional</h3>");

    //  --- Rows for Optional Options ---
    for(var item in optionalSearchOptions){
        createDivRow(optionalSearchOptions[item]);
    }
}

// --- EXPIRY YEAR RANGE SELECTOR ---
// Function to create and append label and select tags
function createDropdown(labelText, dropdownId, startYear, endYear) {
    const container = $('#landing');

    // Create and append label
    container.append(`<label for="${dropdownId}">${labelText}:</label>`);

    // Create and append select
    const select = $(`<select id="${dropdownId}"></select>`);
    container.append(select);

    // Populate select with a range of years
    for (let year = startYear; year <= endYear; year++) {
    select.append(`<option value="${year}">${year}</option>`);
    }
}

function createDivRow(item) {
    // create a row div for each search option and the headers 
    // append each row div to the container
    const container = $('#landing');
    // add the word row at the end of each item in the array
    item += "-row";
    // create a div with the id of the item in the array
    container.append(`<div id="${item}" class="row"></div>`); 
}







    // 1. search by keyword of patent title
    // 2. search by patent number
    // 3. search by inventor
    // 4. search by assignee
    



// ------------------------------
// Collect inputs and do stuff when search buttons are clicked 
// send info to search results page 