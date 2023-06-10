// Code to come

// Function to create the HTML list
function createWeather(container, data) {
  // Parse the HTML into a document object
  const parser = new DOMParser();
  const document = parser.parseFromString(data, 'text/html');

  const elements = new Array();
  parseHtml(document, elements);

  // Create a table
  const table = document.createElement('table');
  table.className = 'table table-bordered';

  // Create a table header
  const thead = document.createElement('thead');
  const hrow = document.createElement('tr');

  // Create table header with day names
  for (let i = 0; i < elements.length; i++) {
    const cell = document.createElement('th');
    cell.appendChild(elements[i].day);
    hrow.appendChild(cell);
  }

  // Append the table header to the table
  thead.appendChild(hrow);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  const row = document.createElement('tr');

  // Create the weekday name cells
  for (let i = 0; i < elements.length; i++) {
    const cell = document.createElement('td');
    cell.appendChild(elements[i].img);
    cell.appendChild(elements[i].temperature);
    cell.appendChild(elements[i].conditions);
    row.appendChild(cell);
  }

  // Append the table header to the table
  tbody.appendChild(row);
  table.appendChild(tbody);

  container.appendChild(table);
}

function parseHtml(document, elements) {

  let day = document.createTextNode('Today');
  let img = document.querySelector('#mainContent > details.panel.panel-default.wxo-obs.hidden-details-print-close > div.hidden-xs.row.no-gutters > div.col-sm-2.brdr-rght.text-center.currcond-height.hidden-print > img');
  img.src = img.src.replace(document.baseURI, 'https://weather.gc.ca/');
  let temp = document.querySelector('#mainContent > details.panel.panel-default.wxo-obs.hidden-details-print-close > div.hidden-xs.row.no-gutters > div.col-sm-2.brdr-rght.text-center.currcond-height.hidden-print > p > span');
  let temperature = document.createElement('h4');
  temperature.textContent = temp.textContent;
  let conditions = document.querySelector('#mainContent > details.panel.panel-default.wxo-obs.hidden-details-print-close > div.hidden-xs.row.no-gutters > div.col-sm-10.text-center.currcond-height.hidden-print > div:nth-child(2) > dl > dd:nth-child(2) > span');
  conditions.style = 'font-size: smaller';

  elements.push({ day: day, img: img, temperature: temperature, conditions: conditions });

  const table = document.querySelector('#mainContent > details.mrgn-tp-lg.panel.panel-default.wxo-fcst.hidden-details-print-close > div.hidden-xs > div');

  for (let i = 2; i < 5; i++) {
    let day = table.querySelector('div:nth-child(' + i + ') > div.div-row.div-row1.div-row-head > strong');
    day = document.createTextNode(day.textContent);
    let img = table.querySelector('div:nth-child(' + i + ') > div.div-row.div-row2.div-row-data > img');
    img.src = img.src.replace(document.baseURI, 'https://weather.gc.ca/');
    let temp = table.querySelector('div:nth-child(' + i + ') > div.div-row.div-row2.div-row-data > p.mrgn-bttm-0.high > strong');
    let temperature = document.createElement('h4');
    temperature.textContent = temp.textContent;
    let cond = document.querySelector('div:nth-child(' + i + ') > div.div-row.div-row2.div-row-data > p:nth-child(4)');
    let conditions = document.createElement('span');
    conditions.textContent= cond.textContent;
    conditions.style = 'font-size: smaller';

    elements.push({ day: day, img: img, temperature: temperature, conditions: conditions });
  }
}

function getWeather(container) {
  const url = 'https://corsproxy.io/?https://weather.gc.ca/city/pages/on-143_metric_e.html';
  // Fetch the RSS data
  fetch(url)
    .then(response => response.text())
    .then(data => createWeather(container, data))
    .catch(error => console.error(error));
}
