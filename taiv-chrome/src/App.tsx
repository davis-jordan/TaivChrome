import React, {useEffect, useState} from 'react';
import NavigationButton from './components/NavigationButton';
import BoxMetrics from './components/BoxMetrics';
import CalendarEvents from './components/CalendarEvents';
import Header from './components/Header';
import KPIS from './components/KPIS';
// import GoogleLogin from 'react-google-login';

const responseGoogle = (response: any) => {
  console.log(response);
}

declare const gapi: any;

const App = () => {
  const gapi = window.gapi;
  const CLIENT_ID = '895891063093-rlvraascsqoc673lp82q463a3s8ig5m6.apps.googleusercontent.com';
  const API_KEY = 'AIzaSyCF27ENe30mQhOkK0fe-Faylh9Lls6WY3w';
  const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
  const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

  const [googleInitialized, setGoogleInitialized] = useState(false);

  const initGoogle = () => {
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

  useEffect(() => {
    initGoogle()
      .then(() => {
        setGoogleInitialized(true);
      });
  }, []); // eslint-disable-line

  const isSignedIn = () => gapi.auth2.getAuthInstance().isSignedIn.get();

  const login = () => gapi.auth2.getAuthInstance().signIn();

  const logout = () => gapi.auth2.getAuthInstance().signOut();

  const fetchCalendarEvents = () => {
    if (isSignedIn()) {
      return gapi.client.calendar.events.list({
        calendarId: 'primary',
        timeMin: (new Date()).toISOString(),
        showDeleted: false,
        maxResults: 20,
      })
      .then((response: any) => {
        const events = response.result.items;
        console.log('events: ', events);
      })
    }
    else {
      console.warn('User is not signed in');
    }
  }

  return (
    <div className="App" style={styles.appContainer}>
      <div style={styles.container}>
        <div style={styles.headerStyle}>
          <img src='logo.png' alt='Taiv Logo' style={{ height: 100 }}/>
        </div>

        <div style={styles.columnContainer}>

          <div style={styles.columnStyle}>
            <div>
              <Header label='KPIS'/>
              <KPIS />
            </div>

            <div>
              <Header label='Device Metrics'/>
              <BoxMetrics />
            </div>
          </div>

          <div style={styles.columnStyle}>
            <div>
              <div style={styles.buttonRowContainer}>
                <NavigationButton 
                  label='Wiki'
                  href='http://wiki.taiv.tv/index.php/Main_Page'
                  icon='./logo.png'
                  alt='alt'
                />
                <NavigationButton 
                  label={'Dashboard'}
                  href={'http://dashboard.taiv.tv'}
                  icon='./logo.png'
                  alt='alt'
                />
              </div>
              <div style={styles.buttonRowContainer}>
                <NavigationButton 
                  label={'Web App'}
                  href={'http://app.taiv.tv'}
                  icon='./logo.png'
                  alt='alt'
                />
                <NavigationButton 
                  label={'Ad Manager'}
                  href={'http://ads.taiv.tv'}
                  icon='./logo.png'
                  alt='alt'
                />
              </div>
            </div>
            <div>
              <CalendarEvents />
              <button style={{ width: 100, height: 40 }}onClick={login}>Login</button>
              <button style={{ width: 100, height: 40 }}onClick={fetchCalendarEvents}>Fetch Events</button>
              <button style={{ width: 100, height: 40 }}onClick={logout}>Logout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {  
  appContainer: {
    backgroundColor: '#1D2330', 
    width: '100%', 
    height: '100%',
    color: 'white',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },
  headerStyle: {
    display: 'flex',
    width: '100%',
    height: 100,
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  columnContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  columnStyle: {
    height: '100%',
    width: '100%',
  },
  buttonRowContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  }
}

export default App;
