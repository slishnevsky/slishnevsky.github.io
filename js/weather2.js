function getWeather(container) {
  // Fetch the HTML page from Weather forecast
  const url = 'https://corsproxy.io/?' + encodeURIComponent('https://www.theweathernetwork.com/ca/weather/ontario/toronto');

  fetch(url)
    .then(response => response.text())
    .then(data => createWeather(container, data))
    .catch(error => console.error(error));
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

function parseHtml(document) {

  const items = [];
  
  for (let i = 1; i < 5; i++) {
    const xpath = xpath + '//*[@id="seven-day-periods"]/div[2]/div[' + i + ']';
    const day = document.evaluate(xpath + '/div[1]/span[1]', document).iterateNext().textContent;
    const cond = document.evaluate(xpath + '/div[2]/span[1]', document).iterateNext().textContent;
    const img = document.evaluate(xpath + '/div[3]/img[1]', document).iterateNext().src.replace(window.location.host, 'weather.gc.ca');
    const temp = document.evaluate(xpath + '/div[4]/span[1]', document).iterateNext().textContent + '°C';

    items.push({ day: day, img: img, temp: temp, cond: cond });
  }
  return items;
}

