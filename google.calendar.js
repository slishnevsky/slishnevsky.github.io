// Load the Google Calendar API asynchronously
function loadCalendarAPI(callback) {
  var script = document.createElement('script');
  script.src = 'https://apis.google.com/js/api.js';

  script.onload = function () {
    gapi.load('client:auth2', function () {
      gapi.client.init({
        apiKey: 'AIzaSyBCIyH5szmkAwnMtNqGsjdruUvmnCEdSH8',
        clientId: '84522859201-slrv8op1uu6h1v48kl9emla38ft78ois.apps.googleusercontent.com',
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
        scope: 'https://www.googleapis.com/auth/calendar.events',
      }).then(function () {
        callback();
      });
    });
  };

  document.body.appendChild(script);
}

// Generate HTML calendar and fetch Google Calendar events
function generateCalendarWithEvents(month, year) {
  // Create a new date object for the specified month and year
  var date = new Date(year, month - 1, 1);

  // Get the number of days in the specified month
  var daysInMonth = new Date(year, month, 0).getDate();

  // Get the index of the first day of the month (0 - Sunday, 1 - Monday, etc.)
  var firstDayIndex = date.getDay();

  // Create an array of weekday names
  var weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Create a table element and set its attributes
  var table = document.createElement('table');
  table.setAttribute('border', '1');
  table.setAttribute('cellspacing', '0');

  // Create the table header row
  var thead = document.createElement('thead');
  var headerRow = document.createElement('tr');

  // Create the weekday name cells
  for (var i = 0; i < 7; i++) {
    var th = document.createElement('th');
    th.textContent = weekdays[i];
    headerRow.appendChild(th);
  }

  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create the table body
  var tbody = document.createElement('tbody');

  // Create the calendar rows
  var numRows = Math.ceil((daysInMonth + firstDayIndex) / 7); // Calculate the number of rows needed
  var day = 1; // Initialize the day counter

  for (var i = 0; i < numRows; i++) {
    var row = document.createElement('tr');

    // Create the cells for each row
    for (var j = 0; j < 7; j++) {
      var cell = document.createElement('td');

      // Add the day number to the cell if it falls within the current month
      if ((i === 0 && j < firstDayIndex) || day > daysInMonth) {
        cell.innerHTML = '&nbsp;'; // Add a non-breaking space if the cell is empty
      } else {
        cell.textContent = day;
        day++;
      }

      row.appendChild(cell);
    }

    tbody.appendChild(row);
  }

  table.appendChild(tbody);

  // Append the table to the document body or any other desired element
  document.body.appendChild(table);

  // Fetch events from Google Calendar
  var startOfMonth = new Date(year, month - 1, 1).toISOString();
  var endOfMonth = new Date(year, month, 0).toISOString();

  gapi.client.calendar.events
    .list({
      calendarId: 'primary',
      timeMin: startOfMonth,
      timeMax: endOfMonth,
      showDeleted: false,
      singleEvents: true,
      orderBy: 'startTime',
    })
    .then(function (response) {
      var events = response.result.items;

      // Display the events in the calendar
      events.forEach(function (event) {
        var eventDate = new Date(event.start.dateTime || event.start.date);
        var eventDay = eventDate.getDate();
        var eventCell = table.querySelector('td:nth-child(' + (eventDay + firstDayIndex) + ')');

        if (eventCell) {
          var eventText = document.createElement('p');
          eventText.textContent = event.summary;
          eventCell.appendChild(eventText);
        }
      });
    });
}

// Load the Google Calendar API and generate calendar with events
loadCalendarAPI(function () {
  // Example usage: generate a calendar with events for May 2023
  generateCalendarWithEvents(5, 2023);
});
