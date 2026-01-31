import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Building2 } from 'lucide-react';

const Home = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            backgroundColor: 'var(--bg-dark)' /* Off-White Background */
        }}>
            {/* Header (30% / Accent) */}
            <header style={{
                backgroundColor: 'var(--brand-primary)',
                padding: '1rem var(--spacing-md)',
                display: 'flex',
                alignItems: 'center',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
                <h1 style={{
                    fontSize: '1.5rem',
                    margin: 0,
                    fontWeight: 900,
                    fontFamily: 'var(--font-sans)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    Cup of Sugar
                </h1>
            </header>

            {/* Main Content Area */}
            <main style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 'var(--spacing-md)',
                gap: 'var(--spacing-md)'
            }}>
                {/* Content Container with Shadow */}
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    padding: 'var(--spacing-lg)',
                    maxWidth: '800px',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: '2rem'
                }}>
                    <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-md)', maxWidth: '600px' }}>
                        <div style={{ marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
                                Cup of Sugar
                            </h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.6' }}>
                                We are Team Sugar. This website is about facilitating food distribution to those in need.
                                Connecting food donors with local organizations to reduce waste and fight hunger.
                            </p>
                        </div>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: 'var(--spacing-md)',
                        width: '100%'
                    }}>
                        <Link to="/donate" style={{ textDecoration: 'none' }}>
                            <div className="glass-panel" style={{
                                padding: 'var(--spacing-md)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '1rem',
                                transition: 'var(--transition-normal)',
                                cursor: 'pointer',
                                height: '100%',
                                border: '1px solid #e5e7eb',
                                backgroundColor: 'white'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-3px)';
                                    e.currentTarget.style.borderColor = 'var(--brand-primary)';
                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 215, 0, 0.2)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.borderColor = '#e5e7eb';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                <div style={{
                                    background: 'rgba(255, 215, 0, 0.1)',
                                    padding: '1rem',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Heart size={32} color="var(--brand-primary)" />
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <h2 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', fontSize: '1.25rem' }}>I am a food donor</h2>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Donate surplus food.</p>
                                </div>
                            </div>
                        </Link>

                        <Link to="/foodbanks" style={{ textDecoration: 'none' }}>
                            <div className="glass-panel" style={{
                                padding: 'var(--spacing-md)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '1rem',
                                transition: 'var(--transition-normal)',
                                cursor: 'pointer',
                                height: '100%',
                                border: '1px solid #e5e7eb',
                                backgroundColor: 'white'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-3px)';
                                    e.currentTarget.style.borderColor = 'var(--brand-primary)';
                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 215, 0, 0.2)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.borderColor = '#e5e7eb';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                <div style={{
                                    background: 'rgba(255, 215, 0, 0.1)',
                                    padding: '1rem',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Building2 size={32} color="var(--brand-primary)" />
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <h2 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', fontSize: '1.25rem' }}>I am a food bank</h2>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Manage your profile.</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;
