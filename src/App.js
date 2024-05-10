import React from 'react';
import Header from './components/Header';
import DeviceList from './components/DeviceList';
import GeneralInfo from './components/GeneralInfo';

function App() {
  return (
    <div className="App">
      <Header /> {/* Render the Header component */}
      <main>
        <GeneralInfo /> {/* Render the GeneralInfo component */}
        <DeviceList /> {/* Render the DeviceList component */}
      </main>
    </div>
  );
}

export default App;