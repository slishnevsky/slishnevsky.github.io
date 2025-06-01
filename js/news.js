async function getNews(container, feedUrl, count) {
  // Fetch the RSS data from a proxy server to bypass CORS restrictions
  const corsProxy = 'https://corsproxy.io/?url=';
  const response = await fetch(corsProxy + feedUrl);
  const data = await response.text();
  createNews(container, data, count)
}

// Display the news items in the specified container
function createNews(container, data, count) {
  // Parse the XML into JavaScript object using DOMParser()
  const parser = new window.DOMParser();
  const xmlDoc = parser.parseFromString(data, 'text/xml');

  // Get the <item> elements from the RSS feed
  let items = xmlDoc.getElementsByTagName('item');
  if (items.length === 0) {
    items = xmlDoc.getElementsByTagName('entry');
  }

  const listGroup = document.createElement('div');
  listGroup.className = 'list-group';
  if (items.length < count) count = items.length;

  // Loop through each item and display its title and link
  for (let i = 0; i < count; i++) {
    let title = items[i].querySelector('title').textContent;
    let link = items[i].querySelector('link').textContent;
    let imageSrc = ''; // Declare imageSrc before using it

    if (items[i].querySelector('link').attributes['href']) 
      link = items[i].querySelector('link').attributes['href'].value;

    imageSrc = './assets/news.png'; // Default image if none found

    // Fetch and display the image for each news item
    if (items[i].querySelector('enclosure')) 
      imageSrc = items[i].querySelector('enclosure').attributes['url'].value;
    if (items[i].querySelector('content')) 
      imageSrc = items[i].querySelector('content').attributes['url'].value;
    if (items[i].querySelector('thumbnail')) 
      imageSrc = items[i].querySelector('thumbnail').attributes['url'].value;
    if (items[i].querySelector('group > thumbnail')) 
      imageSrc = items[i].querySelector('group > thumbnail').attributes['url'].value;

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

