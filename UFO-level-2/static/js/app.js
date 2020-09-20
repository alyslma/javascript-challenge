// from data.js
var tableData = data;

// Define variables
var t_body = d3.select("tbody");
var filterButton = d3.select("#filter-btn");
var resetButton = d3.select("#reset-btn");

// Form table 
formTable(tableData);

// Define function to form a table
function formTable(dataForTable) {
    // Add rows of data for each UFO sighting
    dataForTable.forEach((row) => {
        var t_row = t_body.append("tr");

        Object.entries(row).forEach(([k,v]) => {
            t_row.append("td").text(v);
        });
    });
}

// Define button actions on click
filterButton.on("click", runFilter);
resetButton.on("click", resetTable);

// Use values inputted by user to filter through date column to find rows that match user input
function runFilter() {
    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Get the value property of the input element
    var userDate = d3.select("#datetime").property("value");
    var userCity = d3.select("#city").property("value").toLowerCase();
    var userState = d3.select("#state").property("value").toLowerCase();
    var userCountry = d3.select("#country").property("value").toLowerCase();
    var userShape = d3.select("#shape").property("value").toLowerCase();
    // Define dataTable variable to hold original data and filtered 
    var dataTable = data;

    // Filter based on user input
    if (userDate != "") {
        dataTable = dataTable.filter(dateSighting => {
            return dateSighting.datetime === userDate;
        });
    }

    if (userCity != "") {
        dataTable = dataTable.filter(dateSighting => {
            return dateSighting.city === userCity;
        });
    }

    if (userState != "") {
        dataTable = dataTable.filter(dateSighting => {
            return dateSighting.state === userState;
        });
    }

    if (userCountry != "") {
        dataTable = dataTable.filter(dateSighting => {
            return dateSighting.country === userCountry;
        });
    }

    if (userShape != "") {
        dataTable = dataTable.filter(dateSighting => {
            return dateSighting.shape === userShape;
        });
    }

    // Clear previous table
    t_body.html("");

    // Display filtered data in table
    formTable(dataTable);
}

function resetTable() {
    t_body.html("");
    formTable(tableData);
}