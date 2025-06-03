async function getCalendar(container1, container2) {
  const response = await gapi.client.calendar.calendarList.list();
  let calendars = response.result.items;
  let requests = [];
  calendars.forEach(calendar => {
    const request = gapi.client.calendar.events.list({
      'calendarId': calendar.id,
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 10,
      'orderBy': 'startTime'
    });
    requests.push(request);
  });

  calendars = await Promise.all(requests);
  let events = [];
  calendars.forEach(calendar => {
    events = events.concat(calendar.result.items);
  });

  // Sorting events by date and taking first (most recent) 10 events
  events = events.sort(compareDates).slice(0, 10);

  createCalendar(container1, events);
  createEvents(container2, events);
};

function createCalendar(container, events) {
  // Create a new date object for the specified month and year
  const today = new Date();
  const date = new Date(today.getFullYear(), today.getMonth(), 1);

  // Get the number of days in the specified month
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

  // Get the first day of the week for the specified month and year
  let firstDayIndex = date.getDay();
  firstDayIndex = (firstDayIndex === 0) ? 6 : firstDayIndex - 1;

  // Set weekdays to start with Monday
  const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  // Create a table element to display the calendar data
  const table = document.createElement('table');
  table.className = 'table table-bordered';

  // Create a table header element to display the day names
  const thead = document.createElement('thead');
  const row = document.createElement('tr');

  // Create the table header with day names
  for (let i = 0; i < 7; i++) {
    const cell = document.createElement('th');
    cell.textContent = weekdays[i];
    row.appendChild(cell);
  }

  // Append the table header to the table
  thead.appendChild(row);
  table.appendChild(thead);

  // Create the table body element to display the calendar data
  const tbody = document.createElement('tbody');

  // Populate the table body with calendar data
  const numRows = Math.ceil((daysInMonth + firstDayIndex) / 7);
  let day = 1;

  for (let i = 0; i < numRows; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < 7; j++) {
      const cell = document.createElement('td');
      const cellIndex = i * 7 + j;
      const thisDate = new Date(today.getFullYear(), today.getMonth(), day);

      // Highlight weekends: Saturday (j==5) and Sunday (j==6)
      if (j === 5 || j === 6) {
        cell.className = 'text-danger';
        cell.style.fontWeight = 'bold';
      }

      if (cellIndex < firstDayIndex || day > daysInMonth) {
        cell.innerHTML = '&nbsp;';
      } else {
        if (day === today.getDate()) {
          const div = document.createElement('div');
          div.className = 'today';
          div.textContent = day;
          cell.appendChild(div);
        } else if (isEventDay(thisDate, events)) {
          const div = document.createElement('div');
          div.className = 'event';
          div.textContent = day;
          cell.appendChild(div);
        } else {
          cell.textContent = day;
        }
        day++;
      }
      row.appendChild(cell);
    }
    tbody.appendChild(row);
  }

  table.appendChild(tbody);

  // Append the table to the container
  container.appendChild(table);
}

function isEventDay(thisDate, events) {
  return events.find(event => {
    const eventDate = (event.start.hasOwnProperty('dateTime')) ? new Date(event.start.dateTime) : new Date(event.start.date);
    if (thisDate.toISOString().split('T')[0] === eventDate.toISOString().split('T')[0])
      return true;
  });
}

function createEvents(container, events) {
  const eventList = document.createElement('div');
  eventList.className = 'list-group';

  events.forEach(event => {
    const eventItem = document.createElement('a');
    eventItem.className = 'list-group-item';
    eventItem.href = event.htmlLink;
    eventItem.target = 'blank';
    let eventDate;
    let eventStart = document.createElement('span');
    eventStart.className = 'badge';

    if (event.start.hasOwnProperty('dateTime')) {
      eventDate = new Date(event.start.dateTime);
      eventStart.textContent = eventDate.toLocaleString('ru-Ru', { day: '2-digit', month: 'long', hour12: true, hour: '2-digit', minute: '2-digit' });
    } else {
      eventDate = new Date(event.start.date);
      eventStart.textContent = eventDate.toLocaleString('ru-Ru', { timeZone: 'UTC', day: '2-digit', month: 'long' });
    }

    eventItem.appendChild(eventStart);
    eventSummary = event.summary;
    eventItem.appendChild(document.createTextNode(eventSummary));

    eventList.appendChild(eventItem);

  });

  container.appendChild(eventList);
}

// Helper function to compare dates in ascending order
function compareDates(a, b) {
  let date1 = (a.start.hasOwnProperty('dateTime')) ? new Date(a.start.dateTime) : new Date(a.start.date);
  let date2 = (b.start.hasOwnProperty('dateTime')) ? new Date(b.start.dateTime) : new Date(b.start.date);
  return date1 - date2;
}

