import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Edit, Phone, Mail, MapPin, Sparkles, Building2, Heart, Loader2 } from 'lucide-react';
import { getFoodBank, getFoodBankSummary } from '../utils/api';
import '../App.css';

const FoodBankDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [bank, setBank] = useState(null);
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingSummary, setLoadingSummary] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getFoodBank(id);
                setBank(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch foodbank:", err);
                setError("Food Bank not found");
                setLoading(false);
            }
        };

        const fetchSummary = async () => {
            try {
                const response = await getFoodBankSummary(id);
                setSummary(response.data);
            } catch (err) {
                console.error("Failed to fetch summary:", err);
            } finally {
                setLoadingSummary(false);
            }
        };

        fetchData();
        fetchSummary();
    }, [id]);

    if (loading) {
        return (
            <div className="container" style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Loader2 className="spin" size={48} color="var(--primary-color)" />
            </div>
        );
    }

    if (error || !bank) {
        return (
            <div className="container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', padding: 'var(--spacing-md)' }}>
                <h2 style={{ color: 'var(--text-primary)' }}>{error || "Food Bank not found"}</h2>
                <button onClick={() => navigate('/')} className="button primary-button" style={{ marginTop: '1rem' }}>Return Home</button>
            </div>
        );
    }

    return (
        <div className="container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', padding: 'var(--spacing-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
                <button
                    onClick={() => navigate(-1)}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-secondary)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-xs)',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        padding: 'var(--spacing-xs)'
                    }}
                    className="hover-bright"
                >
                    <ArrowLeft size={20} /> Back
                </button>
                
                <Link to={`/foodbanks/${id}/update`} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)', textDecoration: 'none' }}>
                    <Edit size={20} /> Update Needs
                </Link>
            </div>

            <div className="card" style={{ maxWidth: '800px', width: '100%', margin: '0 auto', textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--spacing-md)' }}>
                    <div>
                        <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{bank.name}</h1>
                        <span style={{
                            background: 'rgba(239, 68, 68, 0.2)',
                            color: '#f87171',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '999px',
                            fontSize: '0.875rem'
                        }}>
                             Food Bank
                        </span>
                    </div>
                </div>

                <div style={{ display: 'grid', gap: 'var(--spacing-lg)', marginBottom: 'var(--spacing-lg)' }}>
                    <div>
                        <h3 style={{ color: 'var(--text-primary)', marginBottom: 'var(--spacing-sm)' }}>About Us</h3>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{bank.description || "No description provided."}</p>
                    </div>

                    {/* AI Smart Summary Section */}
                    <div className="glass-panel" style={{ padding: 'var(--spacing-md)', background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(0,0,0,0))', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                        <h3 style={{ color: 'var(--text-primary)', marginBottom: 'var(--spacing-md)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Sparkles size={20} color="#fbbf24" /> AI Insight
                        </h3>
                        {loadingSummary ? (
                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: 'var(--text-secondary)' }}>
                                <Loader2 className="spin" size={16} /> Analyzing latest updates...
                            </div>
                        ) : summary ? (
                            <div style={{ display: 'grid', gap: '1rem' }}>
                                <div>
                                    <strong style={{ color: '#f87171', display: 'block', marginBottom: '0.25rem' }}>What We Have:</strong>
                                    <p style={{ color: 'var(--text-secondary)', margin: 0 }}>{summary.inventory_summary}</p>
                                </div>
                                <div>
                                    <strong style={{ color: '#f87171', display: 'block', marginBottom: '0.25rem' }}>What We Need:</strong>
                                    <p style={{ color: 'var(--text-secondary)', margin: 0 }}>{summary.needs_summary}</p>
                                </div>
                            </div>
                        ) : (
                            <p style={{ color: 'var(--text-secondary)' }}>Unable to load AI application insights.</p>
                        )}
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '1rem', fontStyle: 'italic', opacity: 0.7 }}>
                            * Generated by AI based on recent updates from the food bank.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--spacing-md)' }}>
                        <div className="glass-panel" style={{ padding: 'var(--spacing-md)', background: 'rgba(255,255,255,0.03)' }}>
                            <h3 style={{ color: 'var(--text-primary)', marginBottom: 'var(--spacing-md)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Building2 size={20} color="#f87171" /> Contact Info
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {bank.address && (
                                    <div style={{ display: 'flex', gap: '0.75rem', color: 'var(--text-secondary)' }}>
                                        <MapPin size={18} style={{ flexShrink: 0 }} />
                                        <span>{bank.address}</span>
                                    </div>
                                )}
                                {bank.phone_number && (
                                    <a href={`tel:${bank.phone_number}`} className="hover-bright" style={{ display: 'flex', gap: '0.75rem', color: 'var(--text-primary)', textDecoration: 'none' }}>
                                        <Phone size={18} color="#ef4444" />
                                        {bank.phone_number}
                                    </a>
                                )}
                                {bank.email && (
                                    <a href={`mailto:${bank.email}`} className="hover-bright" style={{ display: 'flex', gap: '0.75rem', color: 'var(--text-primary)', textDecoration: 'none' }}>
                                        <Mail size={18} color="#ef4444" />
                                        {bank.email}
                                    </a>
                                )}
                            </div>
                        </div>

                        <div className="glass-panel" style={{ padding: 'var(--spacing-md)', background: 'rgba(255,255,255,0.03)' }}>
                            <h3 style={{ color: 'var(--text-primary)', marginBottom: 'var(--spacing-md)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Heart size={20} color="#f87171" /> Traditional List
                            </h3>
                             <p style={{ color: 'var(--text-secondary)' }}>
                                Check the AI Insight above for the most up-to-date informal needs, or contact us directly.
                             </p>
                        </div>
                    </div>
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 'var(--spacing-md)', textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>Want to help {bank.name}?</p>
                    <button className="button primary-button" onClick={() => window.location.href = `mailto:${bank.email}?subject=Donation Inquiry`}>
                        Contact to Donate
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FoodBankDetail;
