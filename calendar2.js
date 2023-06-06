function generateCalendar() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const monthNames = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ];

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const calendarTable = document.createElement("table");
  calendarTable.setAttribute('class', 'table table-bordered')

  // Create the month name row
  const monthRow = document.createElement("tr");
  const monthCell = document.createElement("th");
  monthCell.setAttribute("colspan", "7");
  monthCell.textContent = monthNames[currentMonth] + " " + currentYear;
  monthRow.appendChild(monthCell);
  calendarTable.appendChild(monthRow);

  // Create the day headers row
  const headersRow = document.createElement("tr");
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  for (let day of daysOfWeek) {
    const headerCell = document.createElement("th");
    headerCell.textContent = day;
    headersRow.appendChild(headerCell);
  }
  calendarTable.appendChild(headersRow);

  // Create the days of the month
  let currentDay = 1;
  for (let i = 0; i < 6; i++) {
    const weekRow = document.createElement("tr");
    for (let j = 0; j < 7; j++) {
      const dayCell = document.createElement("td");
      if (i === 0 && j < new Date(currentYear, currentMonth, 1).getDay()) {
        // Empty cells before the first day of the month
        dayCell.textContent = "";
      } else if (currentDay > daysInMonth) {
        // Empty cells after the last day of the month
        dayCell.textContent = "";
      } else {
        dayCell.textContent = currentDay;
        if (
          currentDay === currentDate.getDate() &&
          currentMonth === currentDate.getMonth() &&
          currentYear === currentDate.getFullYear()
        ) {
          // Highlight the current day
          dayCell.style.backgroundColor = "#cccccc";
        }
        currentDay++;
      }
      weekRow.appendChild(dayCell);
    }
    calendarTable.appendChild(weekRow);
  }

  return calendarTable;
}