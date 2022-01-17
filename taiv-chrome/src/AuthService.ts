const gapi = window.gapi;
const CLIENT_ID = '895891063093-rlvraascsqoc673lp82q463a3s8ig5m6.apps.googleusercontent.com';
const API_KEY = 'AIzaSyCF27ENe30mQhOkK0fe-Faylh9Lls6WY3w';
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

export default class AuthService {
  constructor() {
    this.initGoogle();
  }

  initGoogle = () => {
    return new Promise<void>((resolve, reject) => {
      try {
        gapi.load('client:auth2', async () => {
          await gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES,
          });
          gapi.client.load('calendar', 'v3', () => console.log('loaded calendar'))
          resolve();
        });
      }
      catch(e) {
        reject(e);
      }
    });
  }

  // Auth ------------------------------------------------------------------------------

  isSignedIn = () => gapi.auth2.getAuthInstance().isSignedIn.get();

  login = () => gapi.auth2.getAuthInstance().signIn();

  logout = () => gapi.auth2.getAuthInstance().signOut();

  // Calendar ---------------------------------------------------------------------------

  fetchCalendarEvents = () => {
    if (this.isSignedIn()) {
      return gapi.client.calendar.events.list({
        calendarId: 'primary',
        timeMin: (new Date()).toISOString(),
        showDeleted: false,
        maxResults: 20,
      })
      .then((response: any) => {
        const events = response.result.items;
        console.log('events: ', events);
        return events;
      })
    }
    else {
      console.warn('User is not signed in');
    }
  }
}
