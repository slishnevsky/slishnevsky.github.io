String.prototype.toTitleCase = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

function getDateTime(container) {
  const date = new Date();
  const day = date.toLocaleString('ru-RU', { weekday: 'long', day: '2-digit', month: 'long' });
  const time = date.toLocaleString('en-En', { hour12: true, hour: '2-digit', minute: '2-digit' });

  container.innerHTML = day.toTitleCase() + ' <a class="btn btn-xs btn-primary" href="https://www.youtube.com/@euronewsru/videos" target="_blank">последние новости</a>';

  // setInterval(() => { getDateTime(container); }, 60000); // refresh time every minute
}

async function getTranslation(container, text) {
  const response1 = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&q=${encodeURIComponent(text)}`);
  const data1 = await response1.json();
  const sl = data1[2]; // Detected sorce text language
  const tl = (sl === 'en') ? 'ru' : 'en';
  const response2 = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&dt=t&dt=t&tl=${tl}&q=${encodeURIComponent(text)}`);
  const data2 = await response2.json();
  createTranslation(container, data2[0][0][0]);
}

function createTranslation(container, translation) {
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
}

async function getSuggestions(container, text) {
  // Fetch the JSON data
  const response = await fetch('https://api.codetabs.com/v1/proxy/?quest=https://suggestqueries.google.com/complete/search?client=firefox&q=' + text);
  const data = await response.json();
  createSuggestions(container, data[1])
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

function searchGoogle(text) {
  window.open('https://www.google.com/search?q=' + text);
}

function getUserProfile(container) {
  const auth2 = gapi.auth2.getAuthInstance();
  const profile = auth2.currentUser.get().getBasicProfile();
  while (container.hasChildNodes()) {
    container.removeChild(container.lastChild);
  }

  const listGroup = document.createElement('div');
  listGroup.className = 'list-group';

  const listItem = document.createElement('div');
  listItem.className = 'list-group-item clearfix';

  const image = document.createElement('img');
  image.className = 'img-rounded pull-right ';
  image.style.width = '74px';
  image.src = profile.getImageUrl();

  const name = document.createElement('h4');
  name.textContent = profile.getName();

  const button = document.createElement('button');
  button.className = 'btn btn-primary';
  button.textContent = 'Sign out';
  button.onclick = handleSignout;

  listItem.appendChild(image);
  listItem.appendChild(name);
  listItem.appendChild(button);

  listGroup.appendChild(listItem);
  container.appendChild(listGroup);
}



