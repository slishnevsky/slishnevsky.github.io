// Code to come

// Function to create the HTML list
function createWeather(container, data) {
    // Parse the HTML into a document object
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, 'text/html');

    // Get the <item> elements from the RSS feed
    const items = xmlDoc.getElementsByTagName('item');

    // Create a table element and set its attributes
    var table = document.createElement('table');
    table.className = 'table table-bordered';

    // Create the table header row
    var thead = document.createElement('thead');
    var tr = document.createElement('tr');

    // Loop through each item and display its title and link
    for (let i = 0; i < items.length - 1; i++) {
        const title = items[i].getElementsByTagName('title')[0].textContent;

        // Create a list item element
        var th = document.createElement('th');
        th.style = 'text-align: center';
        th.textContent = title;

        // Append the container div to the RSS feed div
        tr.appendChild(th);
    }

    thead.appendChild(tr);
    table.appendChild(thead);

    // Create the table body
    var tbody = document.createElement('tbody');
    var tr = document.createElement('tr');

    // Loop through each item and display its title and link
    for (let i = 0; i < items.length - 1; i++) {
        const description = items[i].getElementsByTagName('description')[0].textContent;

        // Create a list item element
        var td = document.createElement('td');
        td.style = 'text-align: center';
        td.innerHTML = description;

        // Append cell to row
        tr.appendChild(td);
    }

    tbody.appendChild(tr);

    table.appendChild(tbody);

    // Append the unordered list to the container element
    container.appendChild(table);
}

function getWeather(container, url) {
    // Fetch the RSS data
    fetch(url)
        .then(response => response.text())
        .then(data => createWeather(container, data))
        .catch(error => console.error(error));
}
