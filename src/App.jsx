//app.jsx
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import LandingPage from './pages/landingPage'
import Login from './pages/login'
import Register from './pages/register'
import Dashboard from './pages/dashboard'
import Username from './pages/username'
import ProtectedRoute from './components/ProtectedRoute'
import Profile from './pages/shareProfile'

import Links from './pages/links';
import Appearance from './pages/appearance';
import Analytics from './pages/analytics';
import Settings from './pages/setting';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/profile/:username" element={<Profile />} />

        <Route path="/tell-us-more" element={<ProtectedRoute><Username /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
          <Route path="links" element={<Links />} />
          <Route path="appearance" element={<Appearance />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
