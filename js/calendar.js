function createCalendar(container) {
  // Create a new date object for the specified month and year
  const today = new Date();
  const date = new Date(today.getFullYear(), today.getMonth(), 1);

  // Get the number of days in the specified month
  const daysInMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();

  // Get the index of the first day of the month (0 - Sunday, 1 - Monday, etc.)
  const firstDayIndex = date.getDay();

  // Create an array of weekday names
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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
    for (let j = 0; j < 7; j++) {
      const cell = document.createElement('td');
      cell.style.textAlign = 'right';

      // Add the day number to the cell if it falls within the current month
      if ((i === 0 && j < firstDayIndex) || day > daysInMonth) {
        cell.innerHTML = '&nbsp;'; // Add a non-breaking space if the cell is empty
      } else {
        if (day === today.getDate()) {
          cell.className = 'danger';
          cell.style.textAlign = 'right';
          cell.style.fontWeight = 'bold';
        }

        cell.textContent = day;
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

function createEventsList(container, response) {
  const events = response.result.items;
  const eventList = document.createElement('div');
  eventList.className = 'list-group';

  if (events.length > 0) {
    for (let i = 0; i < events.length; i++) {
      const eventItem = document.createElement('a');
      eventItem.className = 'list-group-item';
      eventItem.href = events[i].htmlLink;
      eventItem.target = 'blank';
      let eventDate;
      let eventStart = document.createElement('span');
      eventStart.className = 'badge';

      if (events[i].start.dateTime === undefined) {
        eventDate = new Date(events[i].start.date);
        eventStart.textContent = eventDate.toLocaleString('en-En', { timeZone: 'UTC', day: '2-digit', month: 'long' });
      } else {
        eventDate = new Date(events[i].start.dateTime);
        eventStart.textContent = eventDate.toLocaleString('en-En', { timeZone: 'UTC', day: '2-digit', month: 'long', hour12: true, hour: '2-digit', minute: '2-digit' });
      }

      eventItem.appendChild(eventStart);
      eventSummary = events[i].summary;
      eventItem.appendChild(document.createTextNode(eventSummary));

      eventList.appendChild(eventItem);
    }

    container.appendChild(eventList);
  }
}

function getEvents(container) {
  gapi.client.calendar.events.list({
    'calendarId': 'primary',
    'timeMin': (new Date()).toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    'maxResults': 10,
    'orderBy': 'startTime'
  }).then(response => createEventsList(container, response));
}