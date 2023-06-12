// Client ID and API key from the Google API Console
const CLIENT_ID = '84522859201-slrv8op1uu6h1v48kl9emla38ft78ois.apps.googleusercontent.com';
const API_KEY = 'AIzaSyBCIyH5szmkAwnMtNqGsjdruUvmnCEdSH8';

// Array of API discovery doc URLs for APIs used
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];

// Authorization scopes required by the API
const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

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
    const events = response.result.items;
    const eventList = document.createElement('ul');
    eventList.className = 'list-group';

    if (events.length > 0) {
      for (let i = 0; i < events.length; i++) {
        const eventItem = document.createElement('li');
        eventItem.className = 'list-group-item';
        eventItem.appendChild(document.createTextNode(events[i].summary));
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
  const isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
  if (!isSignedIn) {
    handleSigninClick();
  }

}