// controls initialization of the app and the main view

// initialize the app

// keep track of the current page view
var currentPage = 'landing';
var pageViews = ['landing', 'searchResults', 'patentView', 'favorites'];

// switch page views 
function navigateToPage(newPage, data){
    // update the current page view tracker
    currentPage = newPage;
    // hide all pages
    hideAllPages();
    // show/hide pages based on page name
    switch(newPage){
        case 'landing':
            loadLandingPage();
            break;
        case 'searchResults':
            loadSearchResultsPage(data);
            break;
        case 'patentView':
            loadPatentViewPage(data);
            break;
        case 'favorites':
            loadFavoritesPage();
            break;
        default:
            console.error('invalid page name');
    }
}


// Function to initialize the app
function initializeApp() {
    // Load the header and footer data

    // create a section for each page with an id using the page views array and a class of hide
    for(var view in pageViews){
        var section = $('<section>').attr('id', pageViews[view]).addClass('hide');
        $('#main').append(section);
    }

    // Load the landing page
    navigateToPage('landing');

}

function hideAllPages(){
    // loop through the page views array
    for(var view in pageViews){
        // grab all the page sections in the array and change their class to hide
        $('#' + pageViews[view]).attr('class', 'hide');
    }
}

// Call the initializeApp function when the DOM is ready
document.addEventListener('DOMContentLoaded', initializeApp);
