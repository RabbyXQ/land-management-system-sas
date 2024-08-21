import React from 'react';
import ColorModeSwitcher from './Components/ColorModeSwitcher';
import LanguageSwitcher from './Components/LanguageSwitcher';
import Land from './Components/Land';
import Map from './Components/Map';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <>
      <ColorModeSwitcher />
        <LanguageSwitcher />
        <Land
          title="landDetails"
          name="name"
          location="location"
          size="size"
          owner="owner"
          land_type="landType"
          market_value="marketValue"
          notes="notes"
        />
        <Map/>
    </>
  );
}

export default App;
