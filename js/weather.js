async function getWeather(container) {
  // Fetch the HTML page from Weather forecast using a CORS proxy
  const targetUrl = 'https://weather.gc.ca/api/app/v3/en/Location/43.655,-79.383?type=city';
  const proxyUrl = "https://corsproxy.io/?url=" + encodeURIComponent(targetUrl);
  const response = await fetch(proxyUrl);
  const data = await response.json();
  createWeather(container, data[0])
}

// Function to parse the HTML and extract weather data
function createWeather(container, data) {
  const temp = data.observation.temperature.metric + '°C';
  const cond = data.observation.condition;
  const forecast = data.dailyFcst.daily
  .filter((_, i) => i % 2 === 1)
  .slice(0, 4)
  .map(day => {
    return {
      day: day.date,
      img: `https://weather.gc.ca/weathericons/${day.iconCode}.gif`,
      temp: day.temperature.metric + '°C',
      cond: day.summary
    };
  });

  // const header = container.querySelector('.panel-heading');
  // const tempNow = document.createElement('span');
  // tempNow.className = 'badge';
  // tempNow.textContent += 'сейчас ' + temp;
  // tempNow.style.backgroundColor = '#D9534F';
  // tempNow.style.fontSize = '14px';
  // tempNow.style.fontWeight = 'bold';
  // tempNow.style.float = 'right';
  // header.appendChild(tempNow);

  // Create a table element to display the weather data
  const table = document.createElement('table');
  table.className = 'table table-bordered';

  // Create a table header element to display the day names
  const thead = document.createElement('thead');
  const hrow = document.createElement('tr');

  // Create the table header with day names
  forecast.forEach(day => {
    const cell = document.createElement('th');
    cell.style.width = '25%';
    cell.textContent = day.day;
    hrow.appendChild(cell);
  });

  // Append the table header to the table
  thead.appendChild(hrow);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  const row = document.createElement('tr');

  // Create the weather data cells for each day
  forecast.forEach(day => {
    const cell = document.createElement('td');
    let img = document.createElement('img');
    img.src = day.img;
    let temp = document.createElement('h4');
    temp.textContent = day.temp;
    let cond = document.createElement('span');
    cond.textContent = day.cond;

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
// function parseHtml(xmlDoc) {

//   const items = [];

//   // Extract weather data for the current day
//   let xpath = '//*[@id="mainContent"]/details[1]/div[1]';
//   let day = 'Now';
//   let img = xmlDoc.evaluate(xpath + '/div[1]/img', xmlDoc).iterateNext().src.replace(window.location.host, 'weather.gc.ca');
//   let temp = xmlDoc.evaluate(xpath + '/div[1]/p/span', xmlDoc).iterateNext().textContent + 'C';
//   let cond = xmlDoc.evaluate(xpath + '/div[2]/div[1]/dl/dd[1]/span', xmlDoc).iterateNext().textContent;

//   items.push({ day: day, img: img, temp: temp, cond: cond });

//   // Extract weather data for the next three days
//   xpath = '//*[@id="mainContent"]/details[2]/div[1]/div/div[1]';
//   day = 'Today';
//   img = xmlDoc.evaluate(xpath + '/a/img', xmlDoc).iterateNext().src.replace(window.location.host, 'weather.gc.ca');
//   temp = xmlDoc.evaluate(xpath + '/a/p[1]/strong/span[1]', xmlDoc).iterateNext().textContent + '°C';
//   cond = xmlDoc.evaluate(xpath + '/a/p[3]', xmlDoc).iterateNext().textContent;

//   items.push({ day: day, img: img, temp: temp, cond: cond });

//   for (let i = 2; i < 5; i++) {
//     const xpath = '//*[@id="mainContent"]/details[2]/div[1]/div/div[' + i + ']';
//     const day = xmlDoc.evaluate(xpath + '/div[1]/strong', xmlDoc).iterateNext().textContent;
//     const img = xmlDoc.evaluate(xpath + '/div[2]/img', xmlDoc).iterateNext().src.replace(window.location.host, 'weather.gc.ca');
//     const temp = xmlDoc.evaluate(xpath + '/div[2]/p[1]/strong/span[1]', xmlDoc).iterateNext().textContent + '°C';
//     const cond = xmlDoc.evaluate(xpath + '/div[2]/p[3]', xmlDoc).iterateNext().textContent;

//     items.push({ day: day, img: img, temp: temp, cond: cond });
//   }
//   return items;
// }

