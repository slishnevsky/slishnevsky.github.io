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
    const splitstring = 'Canada Flyers';
    if (item.title.includes(splitstring)) {
      listItem.innerHTML = '<strong>' + item.title.split(splitstring)[0] + '</strong>' + splitstring;  
    } else {
      listItem.textContent = item.title;
    }

    let img = document.createElement('img');
    img.className = 'icon pull-left';
    img.src = 'https://s2.googleusercontent.com/s2/favicons?domain=' + item.link;

    listItem.appendChild(img);

    // Append the list item to the unordered list
    listGroup.appendChild(listItem);
  }

  // Append the unordered list to the container element
  container.appendChild(listGroup);
}

function getBookmarks(container, category) {
  // Fetch the JSON data from a file
  fetch('js/bookmarks.json')
    .then(response => response.json())
    .then(data => createBookmarks(container, data, category))
    .catch(error => console.error(error));
}

