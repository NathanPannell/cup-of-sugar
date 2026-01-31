import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { foodBanks } from '../utils/data';

const FoodBankSetup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    phone: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting Food Bank Registration:', formData);

    // Mock adding to DB
    const newId = foodBanks.length + 1;
    foodBanks.push({
      id: newId,
      ...formData,
      type: 'Food Bank', // Default for now
      needs: ["General Donation"] // Default
    });

    // Mock API call simulation
    setTimeout(() => {
      navigate(`/food-bank/${newId}`); // Redirect to new Profile Page
    }, 1000);
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Food Bank Registration</h1>
        <p className="subtitle">Join our network to help reduce food waste.</p>

        <form onSubmit={handleSubmit} className="setup-form">
          <div className="form-group">
            <label htmlFor="name">Food Bank Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g. Downtown Community Pantry"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Tell us about your mission and who you serve..."
              rows="4"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="(555) 123-4567"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="contact@example.com"
            />
          </div>

          <button type="submit" className="button primary-button">
            Register & Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default FoodBankSetup;
