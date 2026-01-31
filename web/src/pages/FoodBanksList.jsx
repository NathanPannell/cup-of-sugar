import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, ArrowLeft, Loader2, Search } from 'lucide-react';
import { getFoodBanks } from '../utils/api';

const FoodBanksList = () => {
    const navigate = useNavigate();
    const [foodbanks, setFoodbanks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFoodBanks = async () => {
            try {
                const response = await getFoodBanks();
                setFoodbanks(response.data);
            } catch (err) {
                setError('Failed to fetch food banks');
            } finally {
                setLoading(false);
            }
        };
        fetchFoodBanks();
    }, []);

    return (
        <div className="container" style={{ minHeight: '100vh', padding: 'var(--spacing-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-lg)' }}>
                <button
                    onClick={() => navigate('/')}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-secondary)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-xs)',
                        cursor: 'pointer'
                    }}
                    className="hover-bright"
                >
                    <ArrowLeft size={20} /> Back
                </button>
                <Link to="/foodbanks/new" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)', textDecoration: 'none' }}>
                    <Plus size={20} /> New Food Bank
                </Link>
            </div>

            <h1 className="text-gradient" style={{ textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>Food Banks</h1>

            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--spacing-xl)' }}>
                    <Loader2 className="animate-spin" size={48} />
                </div>
            ) : error ? (
                <p style={{ color: 'var(--error)', textAlign: 'center' }}>{error}</p>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--spacing-md)' }}>
                    {foodbanks.map((bank) => (
                        <Link to={`/foodbanks/${bank.id}`} key={bank.id} style={{ textDecoration: 'none' }}>
                            <div className="glass-panel hover-bright" style={{ padding: 'var(--spacing-md)', height: '100%' }}>
                                <h3 style={{ color: 'var(--text-primary)', marginBottom: 'var(--spacing-xs)' }}>{bank.name}</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                                    {bank.description || 'No description provided.'}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FoodBanksList;
