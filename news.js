
function createList(container, data) {
    // Parse the XML into JavaScript object
    const parser = new window.DOMParser();
    const xmlDoc = parser.parseFromString(data, 'text/xml');

    // Get the <item> elements from the RSS feed
    const items = xmlDoc.getElementsByTagName('item');

    const listGroup = document.createElement('div');
    listGroup.setAttribute('class', 'list-group');

    // Loop through each item and display its title and link
    for (let i = 0; i < items.length; i++) {
        const title = items[i].getElementsByTagName('title')[0].textContent;
        const link = items[i].getElementsByTagName('link')[0].textContent;
        const enclosure = items[i].getElementsByTagName('enclosure')[0].attributes['url'].textContent;

        const img = document.createElement('img');
        img.src = enclosure;

        // Create a list item element
        const listItem = document.createElement('a');
        listItem.className = 'list-group-item';
        listItem.href = link;
        listItem.target = 'blank';
        listItem.textContent = title;
        listItem.appendChild(img);

        // Append the container div to the RSS feed div
        listGroup.appendChild(listItem);
    }

    // Append the unordered list to the container element
    container.appendChild(listGroup);
}

function createNews(container, url) {
    url = 'https://cors-anywhere.herokuapp.com/' + url;
    // Fetch the JSON data from a file
    fetch(url)
        .then(response => response.json())
        .then(data => createList(container, data))
        .catch(error => console.error(error));
}