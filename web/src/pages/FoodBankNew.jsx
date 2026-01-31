import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { createFoodBank } from '../utils/api';

const FoodBankNew = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        phone_number: '',
        email: '',
        address: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createFoodBank(formData);
            navigate('/foodbanks');
        } catch (err) {
            alert('Failed to create food bank');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ minHeight: '100vh', padding: 'var(--spacing-md)' }}>
            <button
                onClick={() => navigate('/foodbanks')}
                style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-xs)',
                    cursor: 'pointer',
                    marginBottom: 'var(--spacing-lg)'
                }}
                className="hover-bright"
            >
                <ArrowLeft size={20} /> Back
            </button>

            <div className="glass-panel" style={{ maxWidth: '600px', margin: '0 auto', padding: 'var(--spacing-lg)' }}>
                <h2 style={{ marginBottom: 'var(--spacing-md)', color: 'var(--text-primary)' }}>Register New Food Bank</h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                    <div>
                        <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: 'var(--spacing-xs)' }}>Name</label>
                        <input name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: 'var(--spacing-sm)', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '4px' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: 'var(--spacing-xs)' }}>Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} style={{ width: '100%', minHeight: '100px', padding: 'var(--spacing-sm)', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '4px' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: 'var(--spacing-xs)' }}>Phone Number</label>
                        <input name="phone_number" value={formData.phone_number} onChange={handleChange} style={{ width: '100%', padding: 'var(--spacing-sm)', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '4px' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: 'var(--spacing-xs)' }}>Email</label>
                        <input name="email" type="email" value={formData.email} onChange={handleChange} style={{ width: '100%', padding: 'var(--spacing-sm)', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '4px' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: 'var(--spacing-xs)' }}>Address</label>
                        <input name="address" value={formData.address} onChange={handleChange} style={{ width: '100%', padding: 'var(--spacing-sm)', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '4px' }} />
                    </div>
                    <button type="submit" disabled={loading} className="btn-primary" style={{ marginTop: 'var(--spacing-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--spacing-xs)' }}>
                        {loading ? <Loader2 className="animate-spin" size={20} /> : <><Save size={20} /> Register</>}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FoodBankNew;
