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

function getSuggestions(container, field) {
  // Fetch the JSON data
  const url = 'https://corsproxy.io/?https://suggestqueries.google.com/complete/search?client=firefox&q=' + field.value;
  fetch(url)
    .then(response => response.json())
    .then(data => createSuggestions(container, field, data[1]))
    .catch(error => console.error(error));
}

function createSuggestions(container, field, items) {
  document.body.onclick = function () {
    container.innerHTML = '';
    container.style.display = 'none';
  }
  
  container.innerHTML = '';
  container.style.display = 'none';
  if (items.length === 0) return;
  
  // Create a list of suggestions
  const listGroup = document.createElement('div');
  listGroup.className = 'list-group';
  for (let i = 0; i < items.length; i++) {
    const listItem = document.createElement('a');
    listItem.className = 'list-group-item';
    listItem.textContent = items[i];
    listItem.onclick = function (event) {
      container.innerHTML = '';
      container.style.display = 'none';
      field.value = event.target.text; 
      searchGoogle(field.value);
    };

    listGroup.appendChild(listItem);
  }

  container.appendChild(listGroup);
  container.style.display = 'block';
}

function searchGoogle(text) {
  window.open('https://www.google.com/search?q=' + text);
  return false;
}