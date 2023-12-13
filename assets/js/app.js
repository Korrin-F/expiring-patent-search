
// controls initialization of the app and the main view

// initialize the app

// keep track of the current page view
var currentPage = 'landing';
var pageViews = {
    landing: "Search",
    searchResults: "Results",
    patentView: "Patent View",
    favorites: "Favorites"
}
//var pageViews = ['landing', 'searchResults', 'patentView', 'favorites'];

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
            showTab('landing');
            break;
        case 'searchResults':
            loadSearchResultsPage(data);
            showTab('searchResults');
            break;
        case 'patentView':
            loadPatentViewPage(data);
            showTab('patentView');
            break;
        case 'favorites':
            loadFavoritesPage();
            showTab('favorites');
            break;
        default:
            console.error('invalid page name');
    }
}


// Function to initialize the app
function initializeApp() {
    // Load the header and footer data
    loadHeader();
    // create a section for each page with an id using the page views array and a class of hide
    // for(var view in pageViews){
    //     var section = $('<section>').attr('id', pageViews[view]).addClass('hide');
    //     $('#main').append(section);
    // }
    // Create navigation links dynamically
    var tabsContainer = $('#myTabs');
    for (var key in pageViews) {
        if (pageViews.hasOwnProperty(key)) {
            var navItem = $('<li>').addClass('nav-item').attr('role', 'presentation');
            var navLink = $('<button>').addClass('nav-link').attr({
                'id': key + '-tab',
                'data-bs-toggle': 'tab',
                'data-bs-target': '#' + key + '-pane',
                'type': 'button',
                'role': 'tab',
                'aria-controls': key + '-pane',
                'aria-selected': false // Set all tabs initially as not selected
            }).text(pageViews[key]);
            navItem.append(navLink);
            tabsContainer.append(navItem);
        }
    }

    // Create tab panes dynamically
    var tabContent = $('#myTabContent');
    for (var key in pageViews) {
        if (pageViews.hasOwnProperty(key)) {
            var tabPane = $('<div>').addClass('tab-pane fade').attr({
                'id': key + '-pane',
                'role': 'tabpanel',
                'aria-labelledby': key + '-tab',
                'tabindex': '0'
            });
            tabContent.append(tabPane);
        }
    }

    // Create sections for each page with a class of 'hide'
    for (var key in pageViews) {
        if (pageViews.hasOwnProperty(key)) {
            var section = $('<section>').attr('id', key).addClass('hide');
            $('#main').append(section);
        }
    }

    
    // Load the landing page
    navigateToPage('landing');

}

function showTab(tabName) {
    let tabPane = $('#' + tabName + '-pane');
    tabPane.addClass('active show');
    let tab = $('#' + tabName + '-tab');
    tab.attr('aria-selected', true).addClass('active');
}

function hideAllPages(){
    // loop through the page views array
    for(var view in pageViews){
        // grab all the page sections in the array and change their class to hide
        $('#' + pageViews[view]).attr('class', 'hide');
    }
}

function loadHeader(){
    // create a header row
    $('#header').append($('<div id="logo-row" class="row py-2"></div>'));
    // add logo column
    $('#logo-row').append($('<div id="logo-col" class="col-3 m-auto"></div>'));
    // add logo
    $('#logo-col').append($('<img id="logo" class="img-fluid" src="assets/images/logo.png" alt="logo"/>'));
}

// Call the initializeApp function when the DOM is ready
document.addEventListener('DOMContentLoaded', initializeApp);

