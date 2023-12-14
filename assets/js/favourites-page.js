// updates the content in the Main Body section

function loadFavoritesPage(){
    // grab container
    const mainContent = $('#favorites-container');
    const pageName = mainContent.attr('id').slice(0, -10); // favorites
    // --- Header ---
    createRow(pageName + "-header", mainContent, "div");
    const headerRow = $("#" + pageName + "-header-row");
    headerRow.addClass("text-center mt-4 mt-3");
    createCol(headerRow, pageName)
    const headerCol = $("#" + pageName + "-header-col");
    headerCol.addClass("col-12 mx-auto");
    headerRow.append($(`<h1 id="${pageName}-header" class="text-center">Favorites</h1>`));

    // Create a Row to hold boostrap cards
    //createRow(pageName + "-cards", mainContent, "div");
    //const cardsRow = $("#" + pageName + "-cards-row");

    // grab the favorites from local storage if it exists
    let favorites = JSON.parse(localStorage.getItem("favorites"));
    // if there are favorites
    if (favorites) {
        const listGroup = $('<div class="list-group my-2"></div>');
        mainContent.append(listGroup);
        // loop through the favorites
        for (let i in favorites) {
            // // create a card for each favorite
            // let card = createCard(favorites[i]);
            // // append the card to the cards row
            // cardsRow.append(card);
            let id = favorites[i].id;
            let title = favorites[i].title;
            // create a button like this -> <button type="button" class="list-group-item list-group-item-action" data-id="${id}"></button>
            let button = $(`<button type="button" class="list-group-item list-group-item-action" data-id="${id}"><strong>${id}</strong> | ${title}</button>`);
            // append the button to the list group
            listGroup.append(button);
        }
    }

   
}

// function createCard(object){

// }
function convertToPatentViewObject(data){
    return {
        patents: [
            {
                patent_id: data.id,
                patent_title: data.title,
                patent_abstract: data.abstract,
                patent_year: data.grantYear,
                applications: [{app_date: data.filingDate}],
                patent_processing_time: data.prosessingTime,
                inventors: data.inventorsArray,
                assignees: data.assigneesArray
            }
        ]
    }
}

$('#main').on("click", '#favorites-container', async function(event) {
    event.preventDefault();
    console.log("favorites-container clicked");
    // if the target is a button
    if (event.target.tagName === "BUTTON") {
        event.stopPropagation(); //the click was registering twice

        // grab the patent id (data-id) from the button that was clicked
        let id = $(event.target).attr("data-id");
        // grab the favorites from local storage if it exists
        let favorites = JSON.parse(localStorage.getItem("favorites"));
        // cycle through the favorites array of objects and grab the object that contains the id
        let data = favorites.find(favorite => favorite.id === id);
        // convert the data object into a patentView object
        let patentViewData = convertToPatentViewObject(data);
        // navigate to the patentView page
        navigateToPage('patentView', patentViewData);
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
);