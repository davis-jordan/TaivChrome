import React from 'react';
import NavigationButton from './components/NavigationButton';

function App() {
  return (
    <div className="App">
      <div style={styles.container}>
        <div style={styles.headerStyle}>
          <img src='logo.png' alt='Taiv Logo' style={{ height: 100 }}/>
        </div>

        <div style={styles.columnContainer}>

          <div style={styles.columnStyle}>
            <div>
              kpis
            </div>
            <div>
              boxes
            </div>
          </div>

          <div style={styles.columnStyle}>
            <div>
              <NavigationButton />
              <NavigationButton />
              <NavigationButton />
              <NavigationButton />
            </div>
            <div>
              calendar
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {  
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
    backgroundColor: 'red',
    justifyContent: 'center',
  },
  columnContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  columnStyle: {
    height: '100%',
    width: '100%',
    backgroundColor: 'blue'

  },
}

export default App;
