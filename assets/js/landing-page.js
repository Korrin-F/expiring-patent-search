// updates the content in the Main Body section

// Global Variables 
const currentYear = new Date().getFullYear();
const mainSearchOption = {
    expiryYearRange: "Year Range of Expiry"
};
const optionalSearchOptions = {
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
    const mainHeaderDiv = $('#main-header-row');
    mainHeaderDiv.append("<h2 class='col'>Expiring Patent Search</h2>");

    // Date Range Selector Row
    createRow(Object.keys(mainSearchOption)[0], containerMain, "form");

    // Sub-header Row title Optional 
    createRow("sub-header", containerMain, "div");
    const subHeaderDiv = $('#sub-header-row');
    subHeaderDiv.append("<h3 class='col'>Optional</h3>");

    // create a container to hold all the options
    const optionsContainer = $('<div id="options-container" class="container-fluid"></div>');
    containerMain.append(optionsContainer);

    //  --- Rows for Optional Options ---
    for(const value in optionalSearchOptions){
        createRow(value, optionsContainer, "form");
    }
    //  --- Header Columns for Optional Options ---
    for(const key in optionalSearchOptions){
        console.log(key);
        if (optionalSearchOptions.hasOwnProperty(key)) {
        const value = optionalSearchOptions[key];
        console.log(value);
        createSearchHeader(key,value);
        }
    }



    // ---------------------------
    // SEARCH FEILDS 
    // ---------------------------

    //  --- EXPIRY DATE RANGE SELECTOR --- 
    for(const key in mainSearchOption){
        if (mainSearchOption.hasOwnProperty(key)) {
        const value = mainSearchOption[key];
        createSearchHeader(key,value);
        }
    }
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
    const radioButtonDiv = $('<div id="organization-radio-col" class="col"></div>');
    $("#organization-row").append(radioButtonDiv);
    createRadioButton("Applicant", radioButtonDiv);
    createRadioButton("Assignee", radioButtonDiv);
    createRadioButton("Inventor", radioButtonDiv);


    // ---------------------------
    //  SEARCH BUTTON 
    // ---------------------------

    createRow("search-button", containerMain, "form");
    const searchButtonDiv = $('#search-button-row');
    searchButtonDiv.append("<button id='search-button' class='btn btn-primary'>Search</button>");
}


function createDropdown(labelText, dropdownId, startYear, endYear, container) {
    // Create and append select
    const select = $(`<select id="${dropdownId}" class="form-select"></select>`);
    const title = $(`<option selected>${labelText}</option>`);
    select.append(title);
    container.append(select);
    // Populate select with a range of years
    for (let year = startYear; year <= endYear; year++) {
    select.append(`<option value="${year}">${year}</option>`);
    }
}

// --- CREATE A ROW DIV ---
function createRow(key, container, type) {
    key += "-row";
    container.append(`<${type} id="${key}" class="row"></${type}>`); 
}


// --- CREATE A SEARCH HEADER ---
function createSearchHeader(key,value){
    console.log(key);
    const row = $("#" + key + "-row");
    row.attr('class', 'input-group');
    const header = $(`<span class="input-group-text" id="${key}-header"><h4>${value}</h4></span>`);
    row.append(header);
}

// --- CREATE A TEXT FIELD ---
function createTextFieldCol(item, container){
    const textField = $(`<input type="text" class="form-control" id="${item}-text-field" placeholder="${item}" aria-label="${item}">`);
    container.append(textField);
}

// --- CREATE A RADIO BUTTON ---
function createRadioButton(text, container){
    const div = $('<div class="form-check-inline"></div>');
    const id = text.toLowerCase().replace(" ", "-") + "-radio";
    const radio = $(`<input class="form-check-input" type="radio" name="${id}" id="${id}">`);
    const label = $(`<label class="form-check-label" for="${id}"></label>`).text(text);
    div.append(radio);
    div.append(label);
    container.append(div);
}

// ------------------------------
// Collect inputs and do stuff when search buttons are clicked 
// send info to search results page 