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
import Support from './pages/Support';
import Login from './pages/Login';
import Register from './pages/Register';
import './styles/App.css';
import './styles/pages.css';

function App() {
  return (
    <Router basename="/portal">
      <ScrollToTop />
      <div className="App">
        <Routes>
          {/* Auth pages without header/footer */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Main pages with header/footer */}
          <Route path="/models" element={
            <>
              <Header />
              <main><Models /></main>
              <Footer />
            </>
          } />
          <Route path="/model/:id" element={
            <>
              <Header />
              <main><ModelProfile /></main>
              <Footer />
            </>
          } />
          <Route path="/dashboard" element={
            <>
              <Header />
              <main><Dashboard /></main>
              <Footer />
            </>
          } />
          <Route path="/premium" element={
            <>
              <Header />
              <main><PremiumSubscription /></main>
              <Footer />
            </>
          } />
          <Route path="/become-creator" element={
            <>
              <Header />
              <main><BecomeCreator /></main>
              <Footer />
            </>
          } />
          <Route path="/support" element={
            <>
              <Header />
              <main><Support /></main>
              <Footer />
            </>
          } />
          
          {/* Default route - Home page */}
          <Route path="*" element={
            <>
              <Header />
              <main><Home /></main>
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;