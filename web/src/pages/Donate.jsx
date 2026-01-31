import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Send, CheckCircle, AlertCircle, ArrowLeft, Loader2, MapPin, Phone, Star } from 'lucide-react';
import { findRecommendations } from '../utils/api';

const Donate = () => {
    const navigate = useNavigate();
    const [prompt, setPrompt] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [recommendations, setRecommendations] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async () => {
        if (!prompt.trim()) return;
        setSubmitting(true);
        setError(null);

        try {
            const response = await findRecommendations(prompt);
            setRecommendations(response.data.recommendations);
        } catch (err) {
            setError(err.message || 'Failed to get recommendations');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div style={{ backgroundColor: 'var(--bg-dark)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Header (30% Accent - Consistent with Home) */}
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
                    <span style={{ color: 'white', fontWeight: 900, fontSize: '1.2rem', fontFamily: 'var(--font-sans)' }}>Cup of Sugar</span>
                </div>
            </header>

            <main style={{ padding: 'var(--spacing-md)', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    padding: 'var(--spacing-lg)',
                    maxWidth: '800px',
                    width: '100%',
                    marginTop: '1rem'
                }}>
                    <h1 style={{ textAlign: 'center', marginBottom: 'var(--spacing-lg)', color: 'black' }}>What would you like to donate?</h1>

                    <div className="glass-panel" style={{ padding: 'var(--spacing-lg)', backgroundColor: 'white', border: '1px solid #e5e7eb' }}>
                        {!recommendations ? (
                            <>
                                <textarea
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    placeholder="Example: I have 20 loaves of bread and 10 gallons of milk that expire in 3 days."
                                    disabled={submitting}
                                    style={{
                                        width: '100%',
                                        minHeight: '150px',
                                        background: '#f9fafb',
                                        border: '1px solid #d1d5db',
                                        borderRadius: 'var(--radius-sm)',
                                        padding: 'var(--spacing-sm)',
                                        color: 'black',
                                        fontSize: '1rem',
                                        resize: 'vertical',
                                        outline: 'none',
                                        marginBottom: 'var(--spacing-md)'
                                    }}
                                />
                                <button
                                    className="btn-primary"
                                    onClick={handleSubmit}
                                    disabled={submitting || !prompt.trim()}
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: 'var(--spacing-xs)',
                                        background: 'var(--brand-primary)',
                                        color: 'black',
                                        fontWeight: 'bold',
                                        border: 'none',
                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                    }}
                                >
                                    {submitting ? <Loader2 className="animate-spin" size={20} /> : <><Send size={20} /> Find Recommendations</>}
                                </button>
                                {error && <p style={{ color: 'var(--error)', marginTop: 'var(--spacing-sm)', textAlign: 'center' }}>{error}</p>}
                            </>
                        ) : (
                            <div>
                                <h3 style={{ marginBottom: 'var(--spacing-md)', textAlign: 'center', color: 'black' }}>Top Recommended Food Banks</h3>
                                <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
                                    {recommendations.sort((a, b) => b.match_score - a.match_score).map((bank) => (
                                        <Link to={`/foodbanks/${bank.id}`} key={bank.id} style={{ textDecoration: 'none' }}>
                                            <div className="glass-panel hover-bright" style={{
                                                padding: 'var(--spacing-md)',
                                                background: 'white',
                                                cursor: 'pointer',
                                                border: '1px solid #e5e7eb',
                                                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                                            }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <h4 style={{ color: 'black', margin: 0, fontSize: '1.1rem' }}>{bank.name}</h4>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#d97706' }}>
                                                        <Star size={16} fill="#d97706" />
                                                        <span>{bank.match_score}% Match</span>
                                                    </div>
                                                </div>
                                                <p style={{ color: '#4b5563', fontSize: '0.9rem', marginTop: 'var(--spacing-xs)' }}>
                                                    {bank.match_reason}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                <button
                                    className="btn-secondary"
                                    onClick={() => setRecommendations(null)}
                                    style={{ width: '100%', marginTop: 'var(--spacing-md)', borderColor: 'black', color: 'black' }}
                                >
                                    Start Over
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Donate;
