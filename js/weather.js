async function getWeather(container) {
  // Fetch the HTML page from Weather forecast
  const response = await fetch('https://cors-anywhere.herokuapp.com/https://weather.gc.ca/city/pages/on-143_metric_e.html');
  
  const data = await response.text();
  createWeather(container, data)
}

function createWeather(container, data) {
  // Parse the HTML into a document object
  const parser = new DOMParser();
  const document = parser.parseFromString(data, 'text/html');

  const items = parseHtml(document);

  // Create a table
  const table = document.createElement('table');
  table.className = 'table table-bordered';

  // Create a table header
  const thead = document.createElement('thead');
  const hrow = document.createElement('tr');

  // Create table header with day names
  items.forEach(item => {
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

  // Create the weekday name cells
  items.forEach(item => {
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

  // Append the table header to the table
  tbody.appendChild(row);
  table.appendChild(tbody);

  container.appendChild(table);
}

// Weather parser for https://weather.gc.ca/city/pages/on-143_metric_e.html
function parseHtml(document) {

  const items = [];

  let xpath = '//*[@id="mainContent"]/details[1]/div[1]';
  let day = 'Now';
  let img = document.evaluate(xpath + '/div[1]/img', document).iterateNext().src.replace(window.location.host, 'weather.gc.ca');
  let temp = document.evaluate(xpath + '/div[1]/p/span', document).iterateNext().textContent + 'C';
  let cond = document.evaluate(xpath + '/div[2]/div[1]/dl/dd[1]/span', document).iterateNext().textContent;

  items.push({ day: day, img: img, temp: temp, cond: cond });

  xpath = '//*[@id="mainContent"]/details[2]/div[1]/div/div[1]';
  day = 'Today'
  // day = document.evaluate(xpath + '/div[1]/a/strong', document).iterateNext().textContent;
  img = document.evaluate(xpath + '/a/img', document).iterateNext().src.replace(window.location.host, 'weather.gc.ca');
  temp = document.evaluate(xpath + '/a/p[1]/strong/span[1]', document).iterateNext().textContent + '°C';
  cond = document.evaluate(xpath + '/a/p[3]', document).iterateNext().textContent;

  items.push({ day: day, img: img, temp: temp, cond: cond });

  for (let i = 2; i < 4; i++) {
    const xpath = '//*[@id="mainContent"]/details[2]/div[1]/div/div[' + i + ']';
    const day = document.evaluate(xpath + '/div[1]/strong', document).iterateNext().textContent;
    const img = document.evaluate(xpath + '/div[2]/img', document).iterateNext().src.replace(window.location.host, 'weather.gc.ca');
    const temp = document.evaluate(xpath + '/div[2]/p[1]/strong/span[1]', document).iterateNext().textContent + '°C';
    const cond = document.evaluate(xpath + '/div[2]/p[3]', document).iterateNext().textContent;

    items.push({ day: day, img: img, temp: temp, cond: cond });
  }
  return items;
}

