import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, MapPin, Building2, Calendar, Heart } from 'lucide-react';
import { foodBanks } from '../utils/data';
import '../App.css';

const FoodBankProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const bank = foodBanks.find(b => b.id === parseInt(id));

    if (!bank) {
        return (
            <div className="container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', padding: 'var(--spacing-md)' }}>
                <h2 style={{ color: 'var(--text-primary)' }}>Food Bank not found</h2>
                <button onClick={() => navigate('/')} className="button primary-button" style={{ marginTop: '1rem' }}>Return Home</button>
            </div>
        );
    }

    return (
        <div className="container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', padding: 'var(--spacing-md)' }}>
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
                    alignSelf: 'flex-start',
                    marginBottom: 'var(--spacing-md)',
                    fontSize: '1rem',
                    padding: 'var(--spacing-xs)'
                }}
                className="hover-bright"
            >
                <ArrowLeft size={20} /> Back
            </button>

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
                            {bank.type}
                        </span>
                    </div>
                </div>

                <div style={{ display: 'grid', gap: 'var(--spacing-lg)', marginBottom: 'var(--spacing-lg)' }}>
                    <div>
                        <h3 style={{ color: 'var(--text-primary)', marginBottom: 'var(--spacing-sm)' }}>About Us</h3>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{bank.description}</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--spacing-md)' }}>
                        <div className="glass-panel" style={{ padding: 'var(--spacing-md)', background: 'rgba(255,255,255,0.03)' }}>
                            <h3 style={{ color: 'var(--text-primary)', marginBottom: 'var(--spacing-md)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Building2 size={20} color="#f87171" /> Contact Info
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ display: 'flex', gap: '0.75rem', color: 'var(--text-secondary)' }}>
                                    <MapPin size={18} style={{ flexShrink: 0 }} />
                                    <span>{bank.address}</span>
                                </div>
                                <a href={`tel:${bank.phone}`} className="hover-bright" style={{ display: 'flex', gap: '0.75rem', color: 'var(--text-primary)', textDecoration: 'none' }}>
                                    <Phone size={18} color="#ef4444" />
                                    {bank.phone}
                                </a>
                                <a href={`mailto:${bank.email}`} className="hover-bright" style={{ display: 'flex', gap: '0.75rem', color: 'var(--text-primary)', textDecoration: 'none' }}>
                                    <Mail size={18} color="#ef4444" />
                                    {bank.email}
                                </a>
                            </div>
                        </div>

                        <div className="glass-panel" style={{ padding: 'var(--spacing-md)', background: 'rgba(255,255,255,0.03)' }}>
                            <h3 style={{ color: 'var(--text-primary)', marginBottom: 'var(--spacing-md)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Heart size={20} color="#f87171" /> Current Needs
                            </h3>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                {bank.needs.map((item, index) => (
                                    <li key={index} style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ef4444' }} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 'var(--spacing-md)', textAlign: 'center' }}>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>Want to help {bank.name}?</p>
                    <button className="button primary-button" onClick={() => window.location.href = `mailto:${bank.email}?subject=Donation Inquiry`}>
                        Contact to Donate
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FoodBankProfile;
