// updates the content in the Main Body section
//$(document).ready(function() {
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
        const formContainer = $('<form id="form-container" class="container"></form>');
        containerMain.append(formContainer);

        // ---------------------------
        // CONTAINER AND ROWS
        // ---------------------------

        // Main Header Row
        createRow("main-header", formContainer, "div");
        const mainHeaderDiv = $('#main-header-row');
        mainHeaderDiv.append("<h2 class='col'>Expiring Patent Search</h2>");

        // Date Range Selector Row
        createRow(Object.keys(mainSearchOption)[0], formContainer, "div");

        // Sub-header Row title Optional 
        createRow("sub-header", formContainer, "div");
        const subHeaderDiv = $('#sub-header-row');
        subHeaderDiv.append("<h3 class='col'>Optional</h3>");

        // create a container to hold all the options
        const optionsContainer = $('<div id="options-container" class="container-fluid"></div>');
        formContainer.append(optionsContainer);

        //  --- Rows for Optional Options ---
        for(const value in optionalSearchOptions){
            createRow(value, optionsContainer, "div");
        }
        //  --- Header Columns for Optional Options ---
        for(const key in optionalSearchOptions){
            if (optionalSearchOptions.hasOwnProperty(key)) {
            const value = optionalSearchOptions[key];
            createSearchHeader(key,value);
            }
        }



        // ---------------------------
        // INPUT FEILDS 
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
        createTextField("keyword","Keyword", $("#keyword-row"));
        //  --- PATENT ID SEARCH ---
        createTextField("patentID","Patent ID", $("#patentID-row"));
        //  --- APPLICANT SEARCH ---
        createTextField("applicantFirstName","Applicant First Name", $("#applicant-row"));
        createTextField("applicantLastName","Applicant Last Name", $("#applicant-row"));
        createTextField("applicantID","Applicant ID", $("#applicant-row"));
        //  --- ASSIGNEE SEARCH ---
        createTextField("assigneeFistName","Assignee First Name", $("#assignee-row"));
        createTextField("assigneeLastName","Assignee Last Name", $("#assignee-row"));
        createTextField("assigneeID","Assignee ID", $("#assignee-row"));
        //  --- INVENTOR SEARCH ---
        createTextField("inventorFirstName","Inventor First Name", $("#inventor-row"));
        createTextField("inventorLastName","Inventor Last Name", $("#inventor-row"));
        createTextField("inventorID","Inventor ID", $("#inventor-row"));
        //  --- ORGANIZATION SEARCH ---
        createTextField("organizationName","Organization Name", $("#organization-row"));
        const radioButtonDiv = $('<div id="organization-radio-col" class="col"></div>');
        $("#organization-row").append(radioButtonDiv);
        createRadioButton("Applicant", radioButtonDiv);
        createRadioButton("Assignee", radioButtonDiv);
        createRadioButton("Inventor", radioButtonDiv);


        // ---------------------------
        //  SEARCH BUTTON 
        // ---------------------------

        createRow("search-button", formContainer, "div");
        const searchButtonDiv = $('#search-button-row');
        searchButtonDiv.append("<button id='search-button' class='btn btn-primary' type='submit' form='form-container' value='Submit' >Search</button>");
        // type='submit' form='form-container' value='Submit'
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
        const row = $("#" + key + "-row");
        row.attr('class', 'input-group');
        const header = $(`<span class="input-group-text" id="${key}-header"><h4>${value}</h4></span>`);
        row.append(header);
    }

    // --- CREATE A TEXT FIELD ---
    function createTextField(id, placeholder, container){
        const textField = $(`<input type="text" class="form-control" id="${id}-text-field" placeholder="${placeholder}" aria-label="${placeholder} text field">`);
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

    // set an event listener on the search button
    // main is used becasue thats what is loaded into the dom first
    $('#main').on("submit", '#form-container', function(event) {
        event.preventDefault();
        // get the inputs from the search fields
        let inputs = getInputs();
        console.log(inputs);
        // call the search results page with the inputs
        //navigateToPage('searchResults', inputs);

    });

    function getInputs(){
        // get the inputs from the search fields
        let inputs = {};
        // get the expiry date range
        inputs.expiryYearRange = {
            startYear : $('#startYear').val(),
            endYear : $('#endYear').val()
        }
        // get the keyword
        inputs.keyword = $('#keyword-text-field').val();
        // get the patent id
        inputs.patentID = $('#patentID-text-field').val();
        // get the applicant
        inputs.applicant = {
            firstName : $('#applicantFirstName-text-field').val(),
            lastName : $('#applicantLastName-text-field').val(),
            id : $('#applicantID-text-field').val()
        }
        // get the assignee
        inputs.assignee = {
            firstName : $('#assigneeFirstName-text-field').val(),
            lastName : $('#assigneeLastName-text-field').val(),
            id : $('#assigneeID-text-field').val()
        }
        // get the inventor
        inputs.inventor = {
            firstName : $('#inventorFirstName-text-field').val(),
            lastName : $('#inventorLastName-text-field').val(),
            id : $('#inventorID-text-field').val()
        }
        // get the organization
        inputs.organization = {
            name : $('#organizationName-text-field').val(),
            type : $('input[name=organization-type-radio]:checked').val()
        }
        // return the inputs
        return inputs;
    }

// load the landing page when the dom has been loaded
//loadLandingPage();
//});