import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PromptUpload from './pages/PromptUpload';
import FoodBankSetup from './pages/FoodBankSetup';
import FoodBankUpload from './pages/FoodBankUpload';
import FoodBankProfile from './pages/FoodBankProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prompt-upload" element={<PromptUpload />} />
        <Route path="/food-bank/setup" element={<FoodBankSetup />} />
        <Route path="/food-bank/upload" element={<FoodBankUpload />} />
        <Route path="/food-bank/:id" element={<FoodBankProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
