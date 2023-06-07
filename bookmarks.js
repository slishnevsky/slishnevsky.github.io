// Assuming you have a JSON file named 'data.json'
// with an array of items in the following format:
// [
//   { "id": 1, "name": "Item 1" },
//   { "id": 2, "name": "Item 2" },
//   { "id": 3, "name": "Item 3" }
// ]

// Function to create the HTML list
function createList(jsonData, container) {
  // Get the container element where the list will be placed
  // const container = document.getElementById('list-container');

  // Create an unordered list element
  const ul = document.createElement('ul');
  ul.setAttribute('class', 'list-group');

  // Iterate over the JSON data and create list items
  for (let i = 0; i < jsonData['Магазины'].length; i++) {
    const item = jsonData['Магазины'][i];

    // Create a list item element
    const li = document.createElement('li');
    li.setAttribute('class', 'list-group-item');
    li.textContent = item.title;

    // Append the list item to the unordered list
    ul.appendChild(li);
  }

  // Append the unordered list to the container element
  container.appendChild(ul);
}

function createBookmarks(container) {
  // Fetch the JSON data from a file
  fetch('bookmarks.json')
    .then(response => response.json())
    .then(data => createList(data, container))
    .catch(error => console.error(error));
}

