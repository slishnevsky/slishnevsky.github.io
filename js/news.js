async function getNews(container, feedUrl, count) {
  // Fetch the RSS data
  const response = await fetch('https://api.codetabs.com/v1/proxy/?quest=' + feedUrl);
  // const response = await fetch(feedUrl);
  const data = await response.text();
  createNews(container, data, count)
}

function createNews(container, data, count) {
  // Parse the XML into JavaScript object
  const parser = new window.DOMParser();
  const xmlDoc = parser.parseFromString(data, 'text/xml');

  // Get the <item> elements from the RSS feed
  const items = xmlDoc.getElementsByTagName('item');

  const listGroup = document.createElement('div');
  listGroup.className = 'list-group';
  if (items.length < count) count = items.length;

  // Loop through each item and display its title and link
  for (let i = 0; i < count; i++) {
    // const title = items[i].getElementsByTagName('title')[0].textContent;
    const title = items[i].querySelector('title').textContent;
    const description = items[i].querySelector('description').textContent;
    const link = items[i].querySelector('link').textContent;

    let imageSrc = 'assets/news.png';

    if (items[i].querySelector('enclosure')) 
      imageSrc = items[i].querySelector('enclosure').attributes['url'].value;
    if (items[i].querySelector('content')) 
      imageSrc = items[i].querySelector('content').attributes['url'].value;
    if (items[i].querySelector('thumbnail')) 
      imageSrc = items[i].querySelector('thumbnail').attributes['url'].value;

    // Create a list item element
    const listItem = document.createElement('a');
    listItem.className = 'list-group-item clearfix';
    listItem.style.fontSize = 'smaller';
    listItem.href = link;
    listItem.target = 'blank';

    const img = document.createElement('img');
    img.src = imageSrc;
    img.className = 'pull-left';
    img.style.width = '100px';
    img.style.height = '70px';
    img.style.margin = '-10px 10px -10px -15px';
    listItem.appendChild(img);

    const div = document.createElement('div');
    div.textContent = title;
    listItem.appendChild(div);

    // Append the container div to the RSS feed div
    listGroup.appendChild(listItem);
  }

  // Append the unordered list to the container element
  container.appendChild(listGroup);
}

