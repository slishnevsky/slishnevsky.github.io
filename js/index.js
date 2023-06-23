String.prototype.toTitleCase = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

function getDateTime(container) {
  const date = new Date();
  const day = date.toLocaleString('ru-RU', { weekday: 'long', day: '2-digit', month: 'long' });
  const time = date.toLocaleString('en-En', { hour12: true, hour: '2-digit', minute: '2-digit' });

  container.textContent = day.toTitleCase() + ' ' + time;

  setInterval(() => { getDateTime(container); }, 60000); // refresh time every minute
}

function getSuggestions(container, text) {
  // Fetch the JSON data
  const url = 'https://corsproxy.io/?https://suggestqueries.google.com/complete/search?client=firefox&q=' + text;
  fetch(url)
    .then(response => response.json())
    .then(data => createSuggestions(container, data[1]))
    .catch(error => console.error(error));
}

function createSuggestions(container, items) {
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
    listItem.onclick = function (event) { searchGoogle(event.target.text); };
    listGroup.appendChild(listItem);
  }

  container.appendChild(listGroup);
  container.style.display = 'block';
}

function getTranslation(container, text) {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&q=${encodeURIComponent(text)}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const sl = data[2]; // Detected sorce text language
      const tl = (sl === 'ru') ? 'en' : 'ru';
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&dt=t&dt=t&tl=${tl}&q=${encodeURIComponent(text)}`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          const translation = data[0][0][0]; // Get the translation
          console.log(translation);
          const listItem = document.createElement('a');
          listItem.className = 'list-group-item translation';
          listItem.textContent = translation;
          listItem.onclick = function (event) { searchGoogle(event.target.text); };
          if (container.firstChild === null) {
            const listGroup = document.createElement('div');
            listGroup.className = 'list-group';
            listGroup.appendChild(listItem);
            container.appendChild(listGroup);
            container.style.display = 'block';
          } else {
            const firstItem = container.firstChild.firstChild;
            // Insert translation item as a first element of suggestions
            container.firstChild.insertBefore(listItem, firstItem); // container.firstChild is a listGroup element
          }
        })
        .catch(error => console.error(error));
    })
    .catch(error => console.error(error));
}

function searchGoogle(text) {
  window.open('https://www.google.com/search?q=' + text);
}

