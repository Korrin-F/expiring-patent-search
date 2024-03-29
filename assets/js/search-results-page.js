// updates the content in the Main Body section

// DATA RETURN EXAMPLE
// {count: 25, patents: Array(25), total_patent_count: 100000}
// patents: [{patent_id: "4777771", patent_title: "Grinding tool"}, {patent_id: "4816636", patent_title: "Wire cut electric discharge machine"}, {patent_id: "4857704", patent_title: "Apparatus for thermal treatments of thin parts such as silicon wafers"}, {patent_id: "4895632", patent_title: "Device for providing a stripe shaped coating on an…gated conductive strip by an electrolytic process"}, {patent_id: "4990278", patent_title: "Corrosion inhibited deicing composition and method of its use"}, {patent_id: "5069057", patent_title: "Punch press with independently operated pressing units driven by a crankshaft"}, {patent_id: "5085871", patent_title: "Feed compositon for fowls"}, {patent_id: "5102223", patent_title: "Method and apparatus for measuring a three-dimensional curved surface shape"}, {patent_id: "5359461", patent_title: "Portable cosmetic mirror apparatus"}, {patent_id: "5447419", patent_title: "Scroll-type compressor having clearances during reverse rotation and improper assembly prevention"}, …] (25)
// 

function loadSearchResultsPage(data){
    const resultsData = data;
    console.log("resultsData: " + resultsData);
    const mainContent = $('#searchResults-container');
      // main content id strip off -container and # 
    const pageName = mainContent.attr('id').slice(0, -10); // searchResults
    
    // --- Header ---
    createRow(pageName + "-header", mainContent, "div");
    const headerRow = $("#" + pageName + "-header-row");
    headerRow.addClass("text-center mt-4 mt-3");
    headerRow.append($(`<h1 id="${pageName}-header" class="text-center">Search Results</h1>`));

    // --- Info Row ---
    createRow(pageName + "-info", mainContent, "div");
    const infoRow = $("#" + pageName + "-info-row");
    infoRow.addClass("text-center");
    // if total_patent_count > 100000
    if (resultsData.total_patent_count == 100000) {
        infoRow.append($(`<p>Showing <span>${resultsData.count}</span> of <span>${resultsData.total_patent_count.toLocaleString()}</span>+ patents</p>`));
    }else{
        infoRow.append($(`<p>Showing <span>${resultsData.count}</span> of <span>${resultsData.total_patent_count.toLocaleString()}</span> patents.</p>`));
    }

    // --- Results Container ---
    const resultsContainer = $(`<div id="${pageName}-container" class="container-fluid"></div>`);
    mainContent.append(resultsContainer);

    // --- Results Row ---
    // div with class list group and append to resultsContainer
    const listGroup = $('<div class="list-group"></div>');
    resultsContainer.append(listGroup);

    // --- Result Buttons ---
    //cycle through the pantents array 
    for (let object in resultsData.patents){
        let id = resultsData.patents[object].patent_id;
        let title = resultsData.patents[object].patent_title;
        // create a button like this -> <button type="button" class="list-group-item list-group-item-action" data-id="${id}"></button>
        let button = $(`<button type="button" class="list-group-item list-group-item-action" data-id="${id}">${title}</button>`);
        // append the button to the list group
        listGroup.append(button);
    }

 
}


// grab the patent id (data-id) from the button that was clicked
// let query = {"patent_id":"${id}"}
// data to request
// let fields = ["patent_id","patent_title","patent_year","app_date","patent_processing_time","assignee_first_name","assignee_last_name","assignee_organization","assignee_type","inventor_first_name","inventor_last_name"]
// let params = {q:query, f:fields}

$('#main').on("click", '#searchResults-container', async function(event) {
    event.preventDefault();
    console.log("searchResults-container clicked");
    // if the target is a button
    if (event.target.tagName === "BUTTON") {
        event.stopPropagation(); //the click was registering twice

        let id = $(event.target).attr("data-id");
        let query = {"patent_id":`${id}`}
        let fields = ["patent_id","patent_title","patent_abstract","patent_year","app_date","patent_processing_time","assignee_first_name","assignee_last_name","assignee_organization","assignee_type","inventor_first_name","inventor_last_name"]
        let params = {q:query, f:fields}

        try {
            let response = await callPatentView("legacy", params);
            console.log(response);
            navigateToPage('patentView', response);
        } catch (error) {
            // Handle errors here
            console.error(error);
        }
    } 
});