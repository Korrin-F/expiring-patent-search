// updates the content in the Main Body section
// example data

// patents: {
    //patent_id: "4777771", 
    //patent_title: "Grinding tool", 
    //patent_year: "1988", 
    //patent_processing_time: null, 
    //inventors: [{
        //inventor_first_name: "Paul J.", 
        //inventor_last_name: "Becker", 
        //inventor_key_id: "1069508"}, 
        //{
        //inventor_first_name: "Manfred", inventor_last_name: "Brinkmann", inventor_key_id: "3216585"}], …}

// total_patent_count: 1



function loadPatentViewPage(data){
    const resultsData = data;
    console.log("resultsData: " + resultsData);

    // --- Data ---
    let id = resultsData.patents[0].patent_id;
    let title = resultsData.patents[0].patent_title;
    let abstract = resultsData.patents[0].patent_abstract;
    let grantYear = resultsData.patents[0].patent_year;
    let filingDate = resultsData.patents[0].applications[0].app_date;
    let patent_processing_time = resultsData.patents[0].patent_processing_time;
    let inventorsArray = resultsData.patents[0].inventors;
    let assigneesArray = resultsData.patents[0].assignees;
    //console log the data values 
    console.log("id: " + id);
    console.log("title: " + title);
    console.log("abstract: " + abstract);
    console.log("grantYear: " + grantYear);
    console.log("filingDate: " + filingDate);
    console.log("patent_processing_time: " + patent_processing_time);
    console.log("inventorsArray: " + inventorsArray);
    console.log("assigneesArray: " + assigneesArray);

    // --- Main Content ---
    const mainContent = $('#patentView-container');
    const pageName = mainContent.attr('id').slice(0, -10); // patentView

    // --- Header ---
    createRow(pageName + "-header", mainContent, "div");
    const headerRow = $("#" + pageName + "-header-row");
    headerRow.append($(`<h2 id="${pageName}-header" class="text-center">${title}</h2>`));


    // total inventors
    let totalInventors = resultsData.patents[0].inventors.length; 
    console.log("totalInventors: " + totalInventors);
    // total assignees
    let totalAssignees = resultsData.patents[0].assignees.length;
    console.log("totalAssignees: " + totalAssignees);
    
}