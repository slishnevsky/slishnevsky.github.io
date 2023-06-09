// Function to create the HTML list
function createBookmarks(container, data, category) {

  // Create an unordered list element
  const listGroup = document.createElement('div');
  listGroup.className = 'list-group';


  // Iterate over the JSON data and create list items
  for (let i = 0; i < data[category].length; i++) {
    const item = data[category][i];

    // Create a list item element
    const listItem = document.createElement('a');
    listItem.className = 'list-group-item';
    listItem.href = item.link;
    listItem.target = 'blank';
    listItem.textContent = item.title;

    // Append the list item to the unordered list
    listGroup.appendChild(listItem);
  }

  // Append the unordered list to the container element
  container.appendChild(listGroup);
}

function getBookmarks(container, category) {
  // Fetch the JSON data from a file
  fetch('bookmarks.json')
    .then(response => response.json())
    .then(data => createBookmarks(container, data, category))
    .catch(error => console.error(error));
}

