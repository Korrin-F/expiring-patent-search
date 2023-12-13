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
    headerRow.append($(`<h2 id="${pageName}-header">Search Results</h2>`));

    // --- Info Row ---
    createRow(pageName + "-info", mainContent, "div");
    const infoRow = $("#" + pageName + "-info-row");
    // paragraph "Showing" 
    infoRow.append($(`<p>Showing </p>`));
    // span data.count
    infoRow.append($(`<span>${resultsData.count}</span>`));
    // paragrah "of"
    infoRow.append($(`<p> of </p>`));
    // span data.total_patent_count
    infoRow.append($(`<span>${resultsData.total_patent_count}</span>`));
    // if total_patent_count > 100000
    if (resultsData.total_patent_count == 100000) {
        infoRow.append($(`<p>+ </p>`));
    }
    // then add paragragh "+"
    infoRow.append($(`<p> patents.</p>`));

    
    // --- Results Container ---


 
}
