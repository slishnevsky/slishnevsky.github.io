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

// Example usage: generate a calendar for May 2023
// createCalendar(5, 2023);