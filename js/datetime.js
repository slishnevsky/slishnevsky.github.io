String.prototype.toTitleCase = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

function getDateTime(container) {
  const date = new Date();
  const day = date.toLocaleString('ru-RU', { weekday: 'long', day: '2-digit', month: 'long' });
  const time = date.toLocaleString('en-En', { hour12: true, hour: '2-digit', minute:'2-digit' });

  container.textContent = day.toTitleCase() + ' ' + time;

  setInterval(() => { getDateTime(container); }, 60000); // refresh time every minute
}

