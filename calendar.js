function createCalendar(container, month, year) {
  // Create a new date object for the specified month and year
  var date = new Date(year, month - 1, 1);

  var today = new Date();

  // Get the number of days in the specified month
  var daysInMonth = new Date(year, month, 0).getDate();

  // Get the index of the first day of the month (0 - Sunday, 1 - Monday, etc.)
  var firstDayIndex = date.getDay();

  // Create an array of weekday names
  // var weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  var weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Create a table element and set its attributes
  var table = document.createElement('table');
  table.className = 'table table-bordered';

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
        cell.textContent = '&nbsp;'; // Add a non-breaking space if the cell is empty
      } else {
        if (day === today.getDate()) cell.className = 'danger';
        cell.textContent = day;
        day++;
      }

      row.appendChild(cell);
    }

    tbody.appendChild(row);
  }

  table.appendChild(tbody);

  // Append the table to the document body or any other desired element
  // document.body.appendChild(table);
  container.appendChild(table);
}

// Example usage: generate a calendar for May 2023
// createCalendar(5, 2023);