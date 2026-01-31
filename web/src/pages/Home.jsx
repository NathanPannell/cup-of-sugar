import React from 'react';
import { Link } from 'react-router-dom';
import { FileSpreadsheet, Terminal, Store } from 'lucide-react';

const Home = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            gap: 'var(--spacing-lg)',
            padding: 'var(--spacing-md)'
        }}>
            <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-md)' }}>
                <h1 className="text-gradient" style={{ fontSize: '4rem', marginBottom: 'var(--spacing-xs)', lineHeight: 1.1 }}>
                    Cuppa Sugar
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem' }}>
                    Choose your ingredient to get started
                </p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: 'var(--spacing-md)',
                width: '100%',
                maxWidth: '900px'
            }}>
                <Link to="/prompt-upload" style={{ textDecoration: 'none' }}>
                    <div className="glass-panel" style={{
                        padding: 'var(--spacing-lg)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 'var(--spacing-md)',
                        transition: 'var(--transition-normal)',
                        cursor: 'pointer',
                        height: '100%'
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.boxShadow = '0 0 20px rgba(239, 68, 68, 0.4)';
                            e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.5)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                        }}
                    >
                        <div style={{
                            background: 'rgba(239, 68, 68, 0.1)',
                            padding: '1.5rem',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Terminal size={48} color="#ef4444" />
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <h2 style={{ color: 'var(--text-primary)', marginBottom: 'var(--spacing-xs)' }}>Food Donate Prompt</h2>
                            <p style={{ color: 'var(--text-secondary)' }}>Enter a text prompt to donate food.</p>
                        </div>
                    </div>
                </Link>

                <Link to="/food-bank/setup" style={{ textDecoration: 'none' }}>
                    <div className="glass-panel" style={{
                        padding: 'var(--spacing-lg)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 'var(--spacing-md)',
                        transition: 'var(--transition-normal)',
                        cursor: 'pointer',
                        height: '100%'
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.boxShadow = 'var(--brand-glow)';
                            e.currentTarget.style.borderColor = 'rgba(74, 222, 128, 0.5)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                        }}
                    >
                        <div style={{
                            background: 'rgba(74, 222, 128, 0.1)',
                            padding: '1.5rem',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Store size={48} color="#4ade80" />
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <h2 style={{ color: 'var(--text-primary)', marginBottom: 'var(--spacing-xs)' }}>Food Bank</h2>
                            <p style={{ color: 'var(--text-secondary)' }}>Register or update inventory for food banks.</p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Home;
