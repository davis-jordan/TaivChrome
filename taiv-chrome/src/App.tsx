import React, {useEffect, useState} from 'react';
import NavigationButton from './components/NavigationButton';
import BoxMetrics from './components/BoxMetrics';
import CalendarEvents from './components/CalendarEvents';
import Header from './components/Header';
import KPIS from './components/KPIS';
import AuthService from './AuthService';

const App = () => {
  const [googleInitialized, setGoogleInitialized] = useState(false);
  const authService = new AuthService();

  useEffect(() => {
    authService.initGoogle()
      .then(() => {
        setGoogleInitialized(true);
      });
  }, []); // eslint-disable-line

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
              <button style={{ width: 100, height: 40 }}onClick={authService.login}>Login</button>
              <button style={{ width: 100, height: 40 }}onClick={authService.fetchCalendarEvents}>Fetch Events</button>
              <button style={{ width: 100, height: 40 }}onClick={authService.logout}>Logout</button>
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
