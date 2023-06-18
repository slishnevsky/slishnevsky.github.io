function getCalendar(container) {
  // Create a new date object for the specified month and year
  const today = new Date();
  const date = new Date(today.getFullYear(), today.getMonth(), 1);

  // Get the number of days in the specified month
  const daysInMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();

  // Get the index of the first day of the month (0 - Sunday, 1 - Monday, etc.)
  const firstDayIndex = date.getDay();

  // Create an array of weekday names
  // const weekdays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
  const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  // Create a table
  const table = document.createElement('table');
  table.className = 'table table-bordered';

  // Create a table header
  const thead = document.createElement('thead');
  const row = document.createElement('tr');

  // Create the weekday name cells
  for (let i = 0; i < 7; i++) {
    const cell = document.createElement('th');
    cell.textContent = weekdays[i];
    row.appendChild(cell);
  }

  // Append the table header to the table
  thead.appendChild(row);
  table.appendChild(thead);

  // Create the table body
  const tbody = document.createElement('tbody');

  // Create the calendar rows
  const numRows = Math.ceil((daysInMonth + firstDayIndex) / 7); // Calculate the number of rows needed
  let day = 1; // Initialize the day counter

  for (let i = 0; i < numRows; i++) {
    // Create table row
    const row = document.createElement('tr');

    // Create the cells for each row
    for (let j = 1; j <= 7; j++) {
      const cell = document.createElement('td');
      if (j == 6 || j == 7) cell.className = 'text-danger';

      // Add the day number to the cell if it falls within the current month
      if ((i === 0 && j < firstDayIndex) || day > daysInMonth) {
        cell.innerHTML = '&nbsp;'; // Add a non-breaking space if the cell is empty
      } else {
        if (day === today.getDate()) {
          const span = document.createElement('span');
          span.className = 'today';
          span.textContent = day;
          cell.appendChild(span);
        } else {
          cell.textContent = day;
        }
        day++;
      }
      // Append the cell to table row
      row.appendChild(cell);
    }
    // Append the row to table body
    tbody.appendChild(row);
  }

  table.appendChild(tbody);

  // Append the table to the container
  container.appendChild(table);
}

// Retrieve and display the upcoming calendar events

function createEventList(container, events) {
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

function compareDates(a, b) {
  let date1 = (a.start.hasOwnProperty('dateTime')) ? new Date(a.start.dateTime) : new Date(a.start.date);
  let date2 = (b.start.hasOwnProperty('dateTime')) ? new Date(b.start.dateTime) : new Date(b.start.date);
  return date1 - date2;
}

function getEvents(container) {
  gapi.client.calendar.calendarList.list()
    .then(response => {
      const calendars = response.result.items;
      const requests = [];
      calendars.forEach(calendar => {
        requests.push(
          gapi.client.calendar.events.list({
            'calendarId': calendar.id, // 'primary' for only my personal calendar
            'timeMin': (new Date()).toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 10,
            'orderBy': 'startTime'
          }));
      });

      Promise.all(requests)
        .then(calendars => {
          let events = [];
          calendars.forEach(calendar => {
            events = events.concat(calendar.result.items);
          });

          // Sorting events by date and taking first (most recent) 10 events
          events = events.sort(compareDates).slice(0, 10);

          createEventList(container, events);
        })
    });
};