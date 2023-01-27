
import { Route, Routes } from 'react-router-dom';
import AppHeader from './components/appHeader/AppHeader';
import Home from './components/homePage/Home';
import Page404 from './components/notFound/Page404';
import Welcome from './components/welcomePage/Welcome'
import Storage from './components/storage/Storage'

function App() {
  return (
    <div className="App">
      <AppHeader />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="home" element={<Home />} />
        <Route path="storage/*" element={<Storage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>

    </div>
  );
}

export default App;
