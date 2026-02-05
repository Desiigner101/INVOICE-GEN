import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Toaster} from 'react-hot-toast';
import Menubar from './components/Menubar';
import LandingPage from './pages/LandingPage/LandingPage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import MainPage from './pages/MainPage.jsx';
import PreviewPage from './pages/PreviewPage';


const App = () => {
  return (
    <BrowserRouter>
      <Menubar />
      <Toaster />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/generate" element={<MainPage />} />
        <Route path="/preview" element={<PreviewPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;