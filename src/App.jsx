import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Models from './pages/Models';
import ModelProfile from './pages/ModelProfile';
import Dashboard from './pages/Dashboard';
import PremiumSubscription from './pages/PremiumSubscription';
import BecomeCreator from './pages/BecomeCreator';
import Login from './pages/Login';
import Register from './pages/Register';
import './styles/App.css';
import './styles/pages.css';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Routes>
          {/* Auth pages without header/footer */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Main pages with header/footer */}
          <Route path="/*" element={
            <>
              <Header />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/models" element={<Models />} />
                  <Route path="/model/:id" element={<ModelProfile />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/premium" element={<PremiumSubscription />} />
                  <Route path="/become-creator" element={<BecomeCreator />} />
                </Routes>
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;