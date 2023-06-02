// Assuming you have a JSON file named 'data.json'
// with an array of items in the following format:
// [
//   { "id": 1, "name": "Item 1" },
//   { "id": 2, "name": "Item 2" },
//   { "id": 3, "name": "Item 3" }
// ]

// Function to create the HTML list
function createList(jsonData) {
  // Get the container element where the list will be placed
  const container = document.getElementById('list-container');

  // Create an unordered list element
  const ul = document.createElement('ul');

  // Iterate over the JSON data and create list items
  for (let i = 0; i < jsonData.length; i++) {
    const item = jsonData[i];

    // Create a list item element
    const li = document.createElement('li');
    li.textContent = item.name;

    // Append the list item to the unordered list
    ul.appendChild(li);
  }

  // Append the unordered list to the container element
  container.appendChild(ul);
}

// Fetch the JSON data from a file
fetch('data.json')
  .then(response => response.json())
  .then(data => createList(data))
  .catch(error => console.error(error));
