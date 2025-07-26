import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import CallHistory from './pages/CallHistory';
import SpamReports from './pages/SpamReports';
import BlockedNumbers from './pages/BlockedNumbers';
import WhitelistedNumbers from './pages/WhitelistedNumbers';
import Settings from './pages/Settings';
import FraudEducation from './pages/FraudEducation';
import LiveAlerts from './pages/LiveAlerts';
import Analytics from './pages/Analytics';

// Context Providers
import { AppProvider } from './context/AppContext';
import { LanguageProvider } from './context/LanguageContext';
import { NotificationProvider } from './context/NotificationContext';

// Styles
import './index.css';

function App() {
  return (
    <LanguageProvider>
      <AppProvider>
        <NotificationProvider>
          <Router>
            <div className="App min-h-screen bg-gray-50">
              <Layout>
                <Routes>
                  {/* Main Dashboard */}
                  <Route path="/" element={<Dashboard />} />
                  
                  {/* Call Management */}
                  <Route path="/call-history" element={<CallHistory />} />
                  <Route path="/spam-reports" element={<SpamReports />} />
                  <Route path="/blocked-numbers" element={<BlockedNumbers />} />
                  <Route path="/whitelisted-numbers" element={<WhitelistedNumbers />} />
                  
                  {/* Analytics & Intelligence */}
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/live-alerts" element={<LiveAlerts />} />
                  
                  {/* Education & Prevention */}
                  <Route path="/fraud-education" element={<FraudEducation />} />
                  
                  {/* Settings */}
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </Layout>
            </div>
          </Router>
        </NotificationProvider>
      </AppProvider>
    </LanguageProvider>
  );
}

export default App;