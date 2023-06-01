// HTML element to display the RSS feed
const rssContainer = document.getElementById('rssContainer');

// Fetch the RSS feed
fetch('https://example.com/rss-feed.xml')
  .then(response => response.text())
  .then(data => {
    // Parse the XML data
    const parser = new DOMParser();
    const xml = parser.parseFromString(data, 'text/xml');

    // Extract the relevant information from the XML
    const items = xml.getElementsByTagName('item');

    // Create an HTML string with the feed items
    let html = '';
    for (let i = 0; i < items.length; i++) {
      const title = items[i].getElementsByTagName('title')[0].textContent;
      const link = items[i].getElementsByTagName('link')[0].textContent;

      html += `<a href="${link}">${title}</a><br>`;
    }

    // Display the feed in the HTML element
    rssContainer.innerHTML = html;
  })
  .catch(error => {
    console.error('Error:', error);
    rssContainer.textContent = 'Failed to fetch RSS feed.';
  });
