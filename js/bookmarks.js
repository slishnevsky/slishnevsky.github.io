function getBookmarks(container, category) {
  // Fetch the JSON data from a file
  fetch('js/bookmarks.json')
    .then(response => response.json())
    .then(data => createBookmarks(container, data, category))
    .catch(error => console.error(error));
}

function createBookmarks(container, data, category) {

  // Create an unordered list element
  const listGroup = document.createElement('div');
  listGroup.className = 'list-group';


  // Iterate over the JSON data and create list items

  data[category].forEach(bookmark => {
    // Create a list item element
    const listItem = document.createElement('a');
    listItem.className = 'list-group-item';
    listItem.href = (category == 'Флаерсы') ? bookmark.link2 : bookmark.link;
    listItem.target = 'blank';
    listItem.innerHTML = bookmark.title;

    let img = document.createElement('img');
    img.className = 'icon pull-left';
    // img.src = 'https://s2.googleusercontent.com/s2/favicons?domain=https://www.circulars.ca/real-canadian-superstore/'; // + bookmark.link;
    if (category == 'Флаерсы') img.src = 'assets/icon1b.png';
    if (category == 'Магазины') img.src = 'assets/icon2b.png';
    if (category == 'Сервисы') img.src = 'assets/icon3b.png';
      
    
    

    listItem.appendChild(img);

    // Append the list item to the unordered list
    listGroup.appendChild(listItem);
  });

  // Append the unordered list to the container element
  container.appendChild(listGroup);
}

