// updates the content in the Main Body section

function loadFavoritesPage(){
    // grab container
    const mainContent = $('#favorites-container');
    const pageName = mainContent.attr('id').slice(0, -10); // favorites
    // --- Header ---
    createRow(pageName + "-header", mainContent, "div");
    const headerRow = $("#" + pageName + "-header-row");
    headerRow.append($(`<h2 id="${pageName}-header" class="text-center">Favorites</h2>`));

    // Create a Row to hold boostrap cards
    createRow(pageName + "-cards", mainContent, "div");
    const cardsRow = $("#" + pageName + "-cards-row");

    // grab the favorites from local storage if it exists
    let favorites = JSON.parse(localStorage.getItem("favorites"));
    // if there are favorites
    if (favorites) {
        const listGroup = $('<div class="list-group"></div>');
        // loop through the favorites
        for (let i in favorites) {
            // // create a card for each favorite
            // let card = createCard(favorites[i]);
            // // append the card to the cards row
            // cardsRow.append(card);
            
        }
    }

   
}

function createCard(object){

}
