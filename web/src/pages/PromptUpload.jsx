import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Send, CheckCircle, AlertCircle, ArrowLeft, Loader2, MessageSquare, Phone, Mail, MapPin } from 'lucide-react';
import { submitPrompt } from '../utils/mockApi';
import { foodBanks } from '../utils/data';

const PromptUpload = () => {
    const navigate = useNavigate();
    const [prompt, setPrompt] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [status, setStatus] = useState(null); // 'success', 'error'
    const [message, setMessage] = useState('');

    const contacts = foodBanks;

    const handleSubmit = async () => {
        if (!prompt.trim()) return;
        setSubmitting(true);
        setStatus(null);
        setMessage('');

        try {
            await submitPrompt(prompt);
            setStatus('success');
            setMessage('Based on your donation, here are some organizations that could use your help:');
        } catch (error) {
            setStatus('error');
            setMessage(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleReset = () => {
        setPrompt('');
        setStatus(null);
        setMessage('');
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
                <h1 className="text-gradient" style={{ textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>Food Donation Inquiry</h1>

                <div className="glass-panel" style={{ padding: 'var(--spacing-lg)' }}>

                    {/* Input Area */}
                    {!status && (
                        <>
                            <div style={{ position: 'relative', marginBottom: 'var(--spacing-md)' }}>
                                <textarea
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    placeholder="What food items can you donate today?"
                                    disabled={submitting}
                                    style={{
                                        width: '100%',
                                        minHeight: '200px',
                                        background: 'rgba(15, 23, 42, 0.6)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: 'var(--radius-sm)',
                                        padding: 'var(--spacing-sm)',
                                        color: 'var(--text-primary)',
                                        fontFamily: 'var(--font-sans)',
                                        fontSize: '1rem',
                                        resize: 'vertical',
                                        outline: 'none',
                                        transition: 'var(--transition-fast)'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#ef4444'}
                                    onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                                />
                                <div style={{
                                    position: 'absolute',
                                    bottom: '1rem',
                                    right: '1rem',
                                    color: 'var(--text-secondary)',
                                    fontSize: '0.8rem',
                                    pointerEvents: 'none'
                                }}>
                                    {prompt.length} chars
                                </div>
                            </div>

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
                                    opacity: (submitting || !prompt.trim()) ? 0.7 : 1,
                                    cursor: (submitting || !prompt.trim()) ? 'not-allowed' : 'pointer',
                                    background: '#ef4444' /* Flat Red */
                                }}
                            >
                                {submitting ? (
                                    <>
                                        <Loader2 className="animate-spin" size={20} style={{ animation: 'spin 1s linear infinite' }} />
                                        <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <Send size={20} /> Submit Inquiry
                                    </>
                                )}
                            </button>
                        </>
                    )}

                    {/* Success / Error State */}
                    {status && (
                        <div style={{ textAlign: 'center', padding: 'var(--spacing-sm)' }}>
                            {status === 'success' ? (
                                <CheckCircle size={64} color="var(--success)" style={{ marginBottom: 'var(--spacing-sm)' }} />
                            ) : (
                                <AlertCircle size={64} color="var(--error)" style={{ marginBottom: 'var(--spacing-sm)' }} />
                            )}
                            <h3 style={{ marginBottom: 'var(--spacing-sm)' }}>
                                {status === 'success' ? 'Prompt Submitted' : 'Submission Failed'}
                            </h3>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-md)' }}>
                                {message}
                            </p>
                            {status === 'success' && (
                                <div style={{ display: 'grid', gap: 'var(--spacing-md)', marginTop: 'var(--spacing-md)', width: '100%' }}>
                                    {contacts.map((contact) => (
                                        <Link to={`/food-bank/${contact.id}`} key={contact.id} style={{ textDecoration: 'none' }}>
                                            <div className="glass-panel hover-bright" style={{
                                                padding: 'var(--spacing-md)',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: 'var(--spacing-sm)',
                                                alignItems: 'flex-start',
                                                background: 'rgba(255, 255, 255, 0.03)',
                                                cursor: 'pointer',
                                                transition: 'var(--transition-fast)'
                                            }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                                                    <h4 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', margin: 0 }}>{contact.name}</h4>
                                                    <span style={{
                                                        background: 'rgba(239, 68, 68, 0.2)',
                                                        color: '#f87171',
                                                        padding: '0.2rem 0.6rem',
                                                        borderRadius: '999px',
                                                        fontSize: '0.75rem'
                                                    }}>
                                                        {contact.type}
                                                    </span>
                                                </div>

                                                <div style={{ display: 'flex', gap: 'var(--spacing-sm)', color: 'var(--text-secondary)', alignItems: 'center', fontSize: '0.9rem' }}>
                                                    <MapPin size={16} />
                                                    <span>{contact.address}</span>
                                                </div>

                                                <div style={{ display: 'flex', flexDirection: 'row', gap: 'var(--spacing-lg)', marginTop: 'var(--spacing-xs)' }}>
                                                    <div style={{ display: 'flex', gap: 'var(--spacing-xs)', alignItems: 'center', color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                                                        <Phone size={16} color="#ef4444" />
                                                        {contact.phone}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                            <button
                                className="btn-primary"
                                onClick={handleReset}
                                style={{ background: status === 'error' ? 'var(--error)' : 'linear-gradient(135deg, #ec4899 0%, #a855f7 100%)' }}
                            >
                                {status === 'success' ? 'Submit Another' : 'Try Again'}
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default PromptUpload;
