// Fetch bookmarks from JSON file and display them
async function getBookmarks(container, category) {
  const response = await fetch('js/bookmarks.json');
  const data = await response.json();
  createBookmarks(container, data, category);
}

function createBookmarks(container, data, category) {
  // Create an unordered list element
  const listGroup = document.createElement('div');
  listGroup.className = 'list-group';

  // Iterate over the JSON data and create list items
  data[category].forEach(bookmark => {
    const listItem = document.createElement('a');
    listItem.className = 'list-group-item';
    listItem.href = bookmark.link;
    listItem.target = 'blank';

    if (category == 'Флаерсы') listItem.innerHTML = '<span class="btn btn-xs icon btn-danger glyphicon glyphicon-usd"></span>';
    if (category == 'Магазины') listItem.innerHTML = '<span class="btn btn-xs icon btn-success glyphicon glyphicon-shopping-cart"></span>';
    if (category == 'Сервисы') listItem.innerHTML = '<span class="btn btn-xs icon btn-primary glyphicon glyphicon-cog"></span>';

    listItem.innerHTML += bookmark.title;

    // Append the list item to the unordered list
    listGroup.appendChild(listItem);
  });

  // Append the unordered list to the container element
  container.appendChild(listGroup);
}

