// Code to come

// Function to create the HTML list
function createWeather(container, data) {
  // Parse the HTML into a document object
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(data, 'text/html');

  // Get the <item> elements from the RSS feed
  const items = xmlDoc.getElementsByTagName('item');

  // Create a table element and set its attributes
  const table = document.createElement('table');
  table.className = 'table table-bordered';

  // Create the table header row
  const thead = document.createElement('thead');
  const hrow = document.createElement('tr');

  // Loop through each item and display its title and link
  for (let i = 0; i < items.length - 1; i++) {
    const title = items[i].getElementsByTagName('title')[0].textContent;

    // Create a list item element
    const cell = document.createElement('th');
    cell.style.textAlign = 'center';
    cell.textContent = title;

    // Append the container div to the RSS feed div
    hrow.appendChild(cell);
  }

  thead.appendChild(hrow);
  table.appendChild(thead);

  // Create the table body
  const tbody = document.createElement('tbody');
  const row = document.createElement('tr');

  // Loop through each item and display its title and link
  for (let i = 0; i < items.length - 1; i++) {
    const description = items[i].getElementsByTagName('description')[0].textContent;

    // Create a list item element
    const cell = document.createElement('td');
    cell.style.textAlign = 'center';
    cell.innerHTML = description;

    // Append cell to row
    row.appendChild(cell);
  }

  tbody.appendChild(row);
  table.appendChild(tbody);

  // Append the unordered list to the container element
  container.appendChild(table);
}

function getWeather(container) {
  const url = 'https://corsproxy.io/?http://rss.accuweather.com/rss/liveweather_rss.asp?metric=1&locCode=L4J2S6';
  // Fetch the RSS data
  fetch(url)
    .then(response => response.text())
    .then(data => createWeather(container, data))
    .catch(error => console.error(error));
}
