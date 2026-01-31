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
        <div className="container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', padding: 'var(--spacing-md)' }}>
            <button
                onClick={() => navigate('/')}
                style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-xs)',
                    cursor: 'pointer',
                    alignSelf: 'flex-start',
                    marginBottom: 'var(--spacing-md)',
                    fontSize: '1rem',
                    padding: 'var(--spacing-xs)'
                }}
                className="hover-bright"
            >
                <ArrowLeft size={20} /> Back to Home
            </button>

            <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
                <h1 className="text-gradient" style={{ textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>What would you like to donate?</h1>

                <div className="glass-panel" style={{ padding: 'var(--spacing-lg)' }}>
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
                                    background: 'rgba(15, 23, 42, 0.6)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: 'var(--radius-sm)',
                                    padding: 'var(--spacing-sm)',
                                    color: 'var(--text-primary)',
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
                                    background: '#ef4444'
                                }}
                            >
                                {submitting ? <Loader2 className="animate-spin" size={20} /> : <><Send size={20} /> Find Recommendations</>}
                            </button>
                            {error && <p style={{ color: 'var(--error)', marginTop: 'var(--spacing-sm)', textAlign: 'center' }}>{error}</p>}
                        </>
                    ) : (
                        <div>
                            <h3 style={{ marginBottom: 'var(--spacing-md)', textAlign: 'center' }}>Top Recommended Food Banks</h3>
                            <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
                                {recommendations.sort((a, b) => b.match_score - a.match_score).map((bank) => (
                                    <Link to={`/foodbanks/${bank.id}`} key={bank.id} style={{ textDecoration: 'none' }}>
                                        <div className="glass-panel hover-bright" style={{
                                            padding: 'var(--spacing-md)',
                                            background: 'rgba(255, 255, 255, 0.03)',
                                            cursor: 'pointer'
                                        }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <h4 style={{ color: 'var(--text-primary)', margin: 0 }}>{bank.name}</h4>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#fbbf24' }}>
                                                    <Star size={16} fill="#fbbf24" />
                                                    <span>{bank.match_score}% Match</span>
                                                </div>
                                            </div>
                                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: 'var(--spacing-xs)' }}>
                                                {bank.match_reason}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            <button
                                className="btn-secondary"
                                onClick={() => setRecommendations(null)}
                                style={{ width: '100%', marginTop: 'var(--spacing-md)' }}
                            >
                                Start Over
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Donate;
