import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Edit, Phone, Mail, MapPin, Loader2 } from 'lucide-react';
import { getFoodBank } from '../utils/api';

const FoodBankDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [bank, setBank] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBank = async () => {
            try {
                const response = await getFoodBank(id);
                setBank(response.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchBank();
    }, [id]);

    if (loading) return <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--spacing-xl)' }}><Loader2 className="animate-spin" size={48} /></div>;
    if (!bank) return <div style={{ textAlign: 'center', marginTop: 'var(--spacing-xl)' }}>Food bank not found.</div>;

    return (
        <div className="container" style={{ minHeight: '100vh', padding: 'var(--spacing-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-lg)' }}>
                <button
                    onClick={() => navigate(-1)}
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
                <Link to={`/foodbanks/${id}/update`} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)', textDecoration: 'none' }}>
                    <Edit size={20} /> Update Needs
                </Link>
            </div>

            <div className="glass-panel" style={{ padding: 'var(--spacing-lg)' }}>
                <h1 className="text-gradient" style={{ marginBottom: 'var(--spacing-sm)' }}>{bank.name}</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: 'var(--spacing-lg)' }}>{bank.description}</p>

                <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', color: 'var(--text-primary)' }}>
                        <Phone size={20} color="#ef4444" />
                        <span>{bank.phone_number || 'No phone provided'}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', color: 'var(--text-primary)' }}>
                        <Mail size={20} color="#ef4444" />
                        <span>{bank.email || 'No email provided'}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', color: 'var(--text-primary)' }}>
                        <MapPin size={20} color="#ef4444" />
                        <span>{bank.address || 'No address provided'}</span>
                    </div>
                </div>

                {bank.uploaded_data && (
                    <div style={{ marginTop: 'var(--spacing-xl)', padding: 'var(--spacing-md)', background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-sm)' }}>
                        <h4 style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-xs)' }}>Latest Update Raw Text:</h4>
                        <pre style={{ whiteSpace: 'pre-wrap', color: 'var(--text-primary)', fontSize: '0.9rem' }}>{bank.uploaded_data.raw_text}</pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FoodBankDetail;
