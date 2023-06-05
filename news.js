// Function to fetch and parse RSS feed
function fetchRSSFeed(url) {
  // Make HTTP request to fetch the RSS feed
  fetch(url)
    .then(response => response.text())
    .then(data => {
      // Parse the XML response
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, "text/xml");

      // Extract the relevant data from the XML document
      const items = xmlDoc.querySelectorAll("item");
      const results = [];

      items.forEach(item => {
        const title = item.querySelector("title").textContent;
        const link = item.querySelector("link").textContent;

        results.push({ title, link });
      });

      // Display the results in HTML
      return displayResults(results);
    })
    .catch(error => console.log(error));
}

// Function to display the results in HTML
function displayResults(results) {
  const container = document.createElement('ul');
  var eventItem = document.createElement('li');

  results.forEach(result => {
    const link = document.createElement("a");
    link.href = result.link;
    link.textContent = result.title;

    const listItem = document.createElement("li");
    listItem.appendChild(link);

    container.appendChild(listItem);

    return container;
  });
}

// Call the fetchRSSFeed function with the RSS feed URL
// const rssFeedUrl = "https://example.com/rss-feed.xml";
// fetchRSSFeed(rssFeedUrl);
