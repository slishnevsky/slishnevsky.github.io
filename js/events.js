// Client ID and API key from the Google API Console
var CLIENT_ID = '84522859201-slrv8op1uu6h1v48kl9emla38ft78ois.apps.googleusercontent.com';
var API_KEY = 'AIzaSyBCIyH5szmkAwnMtNqGsjdruUvmnCEdSH8';

// Array of API discovery doc URLs for APIs used
var DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];

// Authorization scopes required by the API
var SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

// Load the API client and authenticate the user
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    // Listen for sign-in state changes
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
  });
}

function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    listUpcomingEvents();
  } else {
    eventContainer.innerHTML = '';
  }
}

function handleSigninClick() {
  gapi.auth2.getAuthInstance().signIn();
}

function handleSignoutClick() {
  gapi.auth2.getAuthInstance().signOut();
}

// Retrieve and display the upcoming calendar events
function listUpcomingEvents() {
  gapi.client.calendar.events.list({
    'calendarId': 'primary',
    'timeMin': (new Date()).toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    'maxResults': 10,
    'orderBy': 'startTime'
  }).then(function (response) {
    var events = response.result.items;
    var eventList = document.createElement('ul');
    eventList.className = 'list-group';

    if (events.length > 0) {
      for (var i = 0; i < events.length; i++) {
        var event = events[i];
        var eventItem = document.createElement('li');
        eventItem.className = 'list-group-item';
        eventItem.appendChild(document.createTextNode(event.summary));
        eventList.appendChild(eventItem);
      }
      eventContainer.appendChild(eventList);
    } else {
      eventList.appendChild(document.createTextNode('No upcoming events found.'));
    }
  });
}

function getEvents(container) {
  eventContainer = container;
  if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
    handleSigninClick();
  }

}