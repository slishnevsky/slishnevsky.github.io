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
    listItem.href = bookmark.link;
    listItem.target = 'blank';
    // const splitstring1 = 'Canada Flyers';
    // const splitstring2 = 'Canada Shopping';
    // if (bookmark.title.includes(splitstring1)) {
    //   listItem.innerHTML = '<strong>' + bookmark.title.split(splitstring1)[0] + '</strong>' + splitstring1;
    // } else if (bookmark.title.includes(splitstring2)) {
    //   listItem.innerHTML = '<strong>' + bookmark.title.split(splitstring2)[0] + '</strong>' + splitstring2;
    // } else {
    //   listItem.textContent = bookmark.title;
    // }

    listItem.innerHTML = bookmark.title;

    let img = document.createElement('img');
    img.className = 'icon pull-left';
    img.src = 'https://s2.googleusercontent.com/s2/favicons?domain=' + bookmark.link;
    listItem.appendChild(img);

    // Append the list item to the unordered list
    listGroup.appendChild(listItem);
  });

  // Append the unordered list to the container element
  container.appendChild(listGroup);
}

