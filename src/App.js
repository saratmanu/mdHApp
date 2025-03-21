import logo from './logo.svg';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthForm from './components/login/Authform';

function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<AuthForm />} />
        </Routes>
    </Router>
);
}

export default App;
