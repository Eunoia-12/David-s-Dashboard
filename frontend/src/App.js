import React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import AdminPage from './pages/AdminPage'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import SearchPage from './pages/SearchPage'
import Dashboard from './pages/Dashboard'
import CreateQuote from './pages/CreateQuote'
import UsersQuotes from './pages/UsersQuotes.jsx'
import QuoteChat from './pages/QuoteChat'
import DavidChat from './pages/DavidChat.jsx'

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/dashboard/:id" element={<Dashboard/>} />
          <Route path="/createquote/:id" element={<CreateQuote/>} />
          <Route path="/quotes/:id" element={<UsersQuotes/>} />
          <Route path="/chat/:order_id" element={<QuoteChat/> } />
          <Route path="/davidchat/:order_id" element={<DavidChat/> } />
          <Route path="/search" element={<SearchPage />} />

        </Routes>
    </Router>
  );
}

export default App;