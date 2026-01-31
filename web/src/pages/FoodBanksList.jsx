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
        <div style={{ backgroundColor: 'var(--bg-dark)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Header (30% Accent) */}
            <header style={{
                backgroundColor: 'var(--brand-primary)',
                padding: '1rem var(--spacing-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button
                        onClick={() => navigate('/')}
                        style={{
                            background: 'white',
                            border: 'none',
                            color: 'black',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            cursor: 'pointer',
                            fontWeight: 600,
                            padding: '0.5rem 1rem',
                            borderRadius: '4px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}
                        className="hover-bright"
                    >
                        <ArrowLeft size={18} /> Back
                    </button>
                    <span style={{ color: 'white', fontWeight: 900, fontSize: '1.2rem', fontFamily: 'var(--font-sans)' }}>Food Banks</span>
                </div>
                <Link to="/foodbanks/new" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)', textDecoration: 'none', background: 'black', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px' }}>
                    <Plus size={18} /> New
                </Link>
            </header>

            <main style={{ padding: 'var(--spacing-md)', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    padding: 'var(--spacing-lg)',
                    maxWidth: '1200px',
                    width: '100%',
                    marginTop: '1rem'
                }}>
                    {loading ? (
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--spacing-xl)' }}>
                            <Loader2 className="animate-spin" size={48} color="black" />
                        </div>
                    ) : error ? (
                        <p style={{ color: 'var(--error)', textAlign: 'center' }}>{error}</p>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--spacing-md)' }}>
                            {foodbanks.map((bank) => (
                                <Link to={`/foodbanks/${bank.id}`} key={bank.id} style={{ textDecoration: 'none' }}>
                                    <div className="glass-panel hover-bright" style={{
                                        padding: 'var(--spacing-md)',
                                        height: '100%',
                                        background: 'white',
                                        border: '1px solid #e5e7eb',
                                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                                    }}>
                                        <h3 style={{ color: '#d97706', marginBottom: 'var(--spacing-xs)' }}>{bank.name}</h3>
                                        <p style={{ color: '#4b5563', fontSize: '0.9rem', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                                            {bank.description || 'No description provided.'}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default FoodBanksList;
