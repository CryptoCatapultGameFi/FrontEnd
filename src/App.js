
import { Route, Routes } from 'react-router-dom';
import AppHeader from './components/appHeader/AppHeader';
import Home from './components/homePage/Home';
import Page404 from './components/notFound/Page404';
import Welcome from './components/welcomePage/Welcome'
import Storage from './components/storage/Storage'
import Marketplace from './components/marketplace/marketplace'
import Play from './components/play/Play';
import RandomItem from './components/randomItem/RandomItem'
import AboutUs from './components/aboutUs/AboutUs';
import React, { useState } from 'react';


const WalletContext = React.createContext(); 

function App() {
  const [account, setAccount] = useState(null);
  return (
    <WalletContext.Provider value={{ account, setAccount }}>
    <div className="App">
      <AppHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="storage/*" element={<Storage />} />
        <Route path="marketplace/*" element={<Marketplace />} />
        <Route path="item/*" element={<RandomItem />} />
        <Route path="about/" element={<AboutUs />} />
        <Route path="play/*" element={<Play />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
    </WalletContext.Provider>
  );
}

export { WalletContext };
export default App;
