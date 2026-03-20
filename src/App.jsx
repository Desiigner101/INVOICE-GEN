import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Toaster} from 'react-hot-toast';
import Menubar from './components/Menubar';
import LandingPage from './pages/LandingPage/LandingPage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import MainPage from './pages/MainPage.jsx';
import PreviewPage from './pages/PreviewPage';
import SubscriptionPage from './pages/SubscriptionPage.jsx'; 
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import UserSyncHandler from './components/UserSyncHandler.jsx';


function App() {
  return (
    <Router>
      <UserSyncHandler />
      <Menubar />
      <Toaster />

      <Routes>
        {/* Public Route */}
        <Route path="/" element={<LandingPage />} />

        {/* Protected Routes - only show if signed in */}
        <Route
          path="/dashboard"
          element={
            <>
              <SignedIn>
                <Dashboard />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/generate"
          element={
            <>
              <SignedIn>
                <MainPage />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/preview"
          element={
            <>
              <SignedIn>
                <PreviewPage />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        {/* ADD THIS NEW ROUTE */}
        <Route
          path="/subscription"
          element={
            <>
              <SignedIn>
                <SubscriptionPage />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;