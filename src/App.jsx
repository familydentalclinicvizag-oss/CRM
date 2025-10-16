import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import PatientDetail from './pages/PatientDetail';
import Appointments from './pages/Appointments';
import Treatments from './pages/Treatments';
import Billing from './pages/Billing';
import Inventory from './pages/Inventory';
import Analytics from './pages/Analytics';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { useAuth } from './context/AuthContext';

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <div className="min-h-screen bg-dental-gray">
        <Toaster position="top-right" />
        
        {user ? (
          <div className="flex">
            <Sidebar />
            <div className="flex-1 flex flex-col">
              <Navbar />
              <main className="flex-1 p-6">
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" />} />
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/patients" element={
                    <ProtectedRoute>
                      <Patients />
                    </ProtectedRoute>
                  } />
                  <Route path="/patients/:id" element={
                    <ProtectedRoute>
                      <PatientDetail />
                    </ProtectedRoute>
                  } />
                  <Route path="/appointments" element={
                    <ProtectedRoute>
                      <Appointments />
                    </ProtectedRoute>
                  } />
                  <Route path="/treatments" element={
                    <ProtectedRoute>
                      <Treatments />
                    </ProtectedRoute>
                  } />
                  <Route path="/billing" element={
                    <ProtectedRoute>
                      <Billing />
                    </ProtectedRoute>
                  } />
                  <Route path="/inventory" element={
                    <ProtectedRoute roles={['admin', 'dentist']}>
                      <Inventory />
                    </ProtectedRoute>
                  } />
                  <Route path="/analytics" element={
                    <ProtectedRoute roles={['admin']}>
                      <Analytics />
                    </ProtectedRoute>
                  } />
                  <Route path="*" element={<Navigate to="/dashboard" />} />
                </Routes>
              </main>
            </div>
          </div>
        ) : (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
