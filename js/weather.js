async function getWeather(container) {
  // Fetch the HTML page from Weather forecast using a CORS proxy
  const corsProxy = 'https://corsproxy.io/?url=';
  const response = await fetch(corsProxy + 'https://weather.gc.ca/en/location/index.html?coords=43.655,-79.383');
  const data = await response.text();
  createWeather(container, data)
}

// Function to parse the HTML and extract weather data
function createWeather(container, data) {
  // Create a DOMParser object to parse the HTML data
  const parser = new DOMParser();
  const document = parser.parseFromString(data, 'text/html');

  // Extract the weather data from the parsed HTML
  const items = parseHtml(document);

  const header = container.querySelector('.panel-heading');
  let tempNow = document.createElement('span');
  tempNow.className = 'badge';
  tempNow.textContent += 'сейчас ' + items[0].temp;
  tempNow.style.backgroundColor = '#D9534F';
  tempNow.style.fontSize = '14px';
  tempNow.style.fontWeight = 'bold';
  tempNow.style.float = 'right';
  header.appendChild(tempNow);

  // Create a table element to display the weather data
  const table = document.createElement('table');
  table.className = 'table table-bordered';

  // Create a table header element to display the day names
  const thead = document.createElement('thead');
  const hrow = document.createElement('tr');

  // Create the table header with day names
  items.forEach(item => {
    if (item == items[0]) return; // Skip the first item as it is handled separately
    const cell = document.createElement('th');
    cell.style.width = '25%';
    cell.textContent = item.day;
    if (item == items[0]) cell.style.border = '2px solid #D9534F';
    hrow.appendChild(cell);
  });

  // Append the table header to the table
  thead.appendChild(hrow);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  const row = document.createElement('tr');

  // Create the weather data cells for each day
  items.forEach(item => {
    if (item == items[0]) return; // Skip the first item as it is handled separately
    const cell = document.createElement('td');
    if (item == items[0]) cell.style.border = '2px solid #D9534F';
    let img = document.createElement('img');
    img.src = item.img;
    let temp = document.createElement('h4');
    temp.textContent = item.temp;
    let cond = document.createElement('span');
    cond.textContent = item.cond;

    cell.appendChild(img);
    cell.appendChild(temp);
    cell.appendChild(cond);
    row.appendChild(cell);
  });

  // Append the weather data cells to the table
  tbody.appendChild(row);
  table.appendChild(tbody);

  container.appendChild(table);
}

// Function to parse the HTML and extract weather data
function parseHtml(document) {

  const items = [];

  // Extract weather data for the current day
  let xpath = '//*[@id="mainContent"]/details[1]/div[1]';
  let day = 'Now';
  let img = document.evaluate(xpath + '/div[1]/img', document).iterateNext().src.replace(window.location.host, 'weather.gc.ca');
  let temp = document.evaluate(xpath + '/div[1]/p/span', document).iterateNext().textContent + 'C';
  let cond = document.evaluate(xpath + '/div[2]/div[1]/dl/dd[1]/span', document).iterateNext().textContent;

  items.push({ day: day, img: img, temp: temp, cond: cond });

  // Extract weather data for the next three days
  xpath = '//*[@id="mainContent"]/details[2]/div[1]/div/div[1]';
  day = 'Today';
  img = document.evaluate(xpath + '/a/img', document).iterateNext().src.replace(window.location.host, 'weather.gc.ca');
  temp = document.evaluate(xpath + '/a/p[1]/strong/span[1]', document).iterateNext().textContent + '°C';
  cond = document.evaluate(xpath + '/a/p[3]', document).iterateNext().textContent;

  items.push({ day: day, img: img, temp: temp, cond: cond });

  for (let i = 2; i < 5; i++) {
    const xpath = '//*[@id="mainContent"]/details[2]/div[1]/div/div[' + i + ']';
    const day = document.evaluate(xpath + '/div[1]/strong', document).iterateNext().textContent;
    const img = document.evaluate(xpath + '/div[2]/img', document).iterateNext().src.replace(window.location.host, 'weather.gc.ca');
    const temp = document.evaluate(xpath + '/div[2]/p[1]/strong/span[1]', document).iterateNext().textContent + '°C';
    const cond = document.evaluate(xpath + '/div[2]/p[3]', document).iterateNext().textContent;

    items.push({ day: day, img: img, temp: temp, cond: cond });
  }
  return items;
}

