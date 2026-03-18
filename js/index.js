String.prototype.toTitleCase = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

// Get current date and time in specified language and display it in the specified container
function getDateTime(container) {
  const date = new Date();
  const day = date.toLocaleString('ru-RU', { weekday: 'long', day: '2-digit', month: 'long' });
  const time = date.toLocaleString('en-En', { hour12: true, hour: '2-digit', minute: '2-digit' });
  // container.innerHTML = day.toTitleCase() + ' <a class="btn btn-xs btn-primary" href="https://www.youtube.com/@euronewsru/videos" target="_blank">последние новости</a>';
  // container.textContent = (day + ' ' + time).toTitleCase();
  container.textContent = date.toLocaleString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    .replace(/ г\.?$/i, '')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Get Google translation for the specified text and display it in the specified container
async function getTranslation(container, text) {
  const response1 = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&q=${encodeURIComponent(text)}`);
  const data1 = await response1.json();
  const sl = data1[2]; // Detected source text language
  const tl = (sl === 'en') ? 'ru' : 'en';
  const response2 = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&dt=t&dt=t&tl=${tl}&q=${encodeURIComponent(text)}`);
  const data2 = await response2.json();
  createTranslation(container, data2[0][0][0]);
}

// Create translation element and add it to the specified container
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
    container.firstChild.insertBefore(listItem, firstItem); // container.firstChild is a listGroup element
  }
}

// Get Google search suggestions for the specified text and display them in the specified container
async function getSuggestions(container, text) {
  const response = await fetch('https://api.codetabs.com/v1/proxy/?quest=https://suggestqueries.google.com/complete/search?client=firefox&q=' + text);
  const data = await response.json();
  createSuggestions(container, data[1])
}

// Create suggestion elements and add them to the specified container
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

// Open Google search page with the specified search query
function searchGoogle(text) {
  window.open('https://www.google.com/search?q=' + text);
}

// Get user profile and display it in the specified container
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



