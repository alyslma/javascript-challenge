// from data.js
var tableData = data;

// Define variables
var t_body = d3.select("tbody");
var filterButton = d3.select("#filter-btn");
var resetButton = d3.select("#reset-btn");
var form = d3.select("form");

// Append a table to page and add new rows of data for each UFO sighting
formTable(tableData);

function formTable(dataTable) {

    dataTable.forEach((row) => {
        var t_row = t_body.append("tr");

        Object.entries(row).forEach(([k,v]) => {
            t_row.append("td").text(v);
        });
    });
}

// Use date form to search through date column to find rows that match user input
filterButton.on("click", runFilter);
resetButton.on("click", resetTable);
form.on("submit", runFilter);

function runFilter() {
    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Get the value property of the input element
    var userInput = d3.select("#datetime").property("value");

    if (userInput != "") {
        dataTable = data.filter(dateSighting => {
            return dateSighting.datetime === userInput;
        });

        // Clear previous table
        t_body.html("");

        // Display filtered data in table
        formTable(dataTable);
    }

}

function resetTable() {
    t_body.html("");
    formTable(tableData);
}

