// updates the content in the Main Body section

// what year is it? 
var currentYear = new Date().getFullYear();

function loadLandingPage() {
    // updates the content in the Main Body section
    $('#landing').attr('class','show'); 

    // search options cards
    // ---------------------------
    //  Expiry date range selector
    // Get the current year
    const currentYear = new Date().getFullYear();

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

    // Create and append start year dropdown with a range of years
    createDropdown('Start Year', 'startYear', currentYear-5, currentYear+5);

    // Create and append end year dropdown with a range of years
    createDropdown('End Year', 'endYear', currentYear-5, currentYear+5);








    // 1. search by keyword of patent title
    // 2. search by patent number
    // 3. search by inventor
    // 4. search by assignee
    

}

// ------------------------------
// Collect inputs and do stuff when search buttons are clicked 
// send info to search results page 