
function createNews(container, data) {
    // Parse the XML into JavaScript object
    const parser = new window.DOMParser();
    const xmlDoc = parser.parseFromString(data, 'text/xml');

    // Get the <item> elements from the RSS feed
    const items = xmlDoc.getElementsByTagName('item');

    const listGroup = document.createElement('div');
    listGroup.className = 'list-group';

    // Loop through each item and display its title and link
    for (let i = 0; i < items.length; i++) {
        const title = items[i].getElementsByTagName('title')[0].textContent;
        const link = items[i].getElementsByTagName('link')[0].textContent;
        const enclosure = items[i].getElementsByTagName('enclosure')[0].attributes['url'].textContent;

        const img = document.createElement('img');
        img.src = enclosure;
        img.className = 'pull-left';

        const span = document.createElement('span');
        span.textContent = title;

        // Create a list item element
        const listItem = document.createElement('a');
        listItem.className = 'list-group-item clearfix';
        listItem.href = link;
        listItem.target = 'blank';
        listItem.appendChild(img);
        listItem.appendChild(span);

        // Append the container div to the RSS feed div
        listGroup.appendChild(listItem);
    }

    // Append the unordered list to the container element
    container.appendChild(listGroup);
}

function getNews(container, url) {
    // Fetch the RSS data
    fetch(url)
        .then(response => response.text())
        .then(data => createNews(container, data))
        .catch(error => console.error(error));
}