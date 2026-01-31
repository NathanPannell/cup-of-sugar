import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Donate from './pages/Donate';
import FoodBanksList from './pages/FoodBanksList';
import FoodBankNew from './pages/FoodBankNew';
import FoodBankDetail from './pages/FoodBankDetail';
import FoodBankUpdate from './pages/FoodBankUpdate';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/foodbanks" element={<FoodBanksList />} />
        <Route path="/foodbanks/new" element={<FoodBankNew />} />
        <Route path="/foodbanks/:id" element={<FoodBankDetail />} />
        <Route path="/foodbanks/:id/update" element={<FoodBankUpdate />} />
      </Routes>
    </Router>
  );
}

export default App;
