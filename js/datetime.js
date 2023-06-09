String.prototype.toTitleCase = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

function getDateTime(container) {
  const date = new Date();
  const day = date.toLocaleString('ru-RU', { dateStyle: 'full' });
  const time = date.toLocaleString('en-En', { timeStyle: 'medium', hour12: true });

  container.textContent = day.toTitleCase() + ' ' + time;

  setInterval(() => { getDateTime(container); }, 1000); // refresh time every minute
}

