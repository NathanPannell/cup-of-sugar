import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Loader2, FileText, Clipboard } from 'lucide-react';
import { updateFoodBankData } from '../utils/api';

const FoodBankUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!text.trim()) return;
        setLoading(true);
        try {
            await updateFoodBankData(id, text);
            navigate(`/foodbanks/${id}`);
        } catch (err) {
            alert('Failed to update food bank data');
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (event) => {
            setText(event.target.result);
        };
        reader.readAsText(file);
    };

    return (
        <div className="container" style={{ minHeight: '100vh', padding: 'var(--spacing-md)' }}>
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
                    marginBottom: 'var(--spacing-lg)'
                }}
                className="hover-bright"
            >
                <ArrowLeft size={20} /> Back
            </button>

            <div className="glass-panel" style={{ maxWidth: '800px', margin: '0 auto', padding: 'var(--spacing-lg)' }}>
                <h2 style={{ marginBottom: 'var(--spacing-sm)', color: 'var(--text-primary)' }}>Update Food Bank Data</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-lg)' }}>
                    Copy-paste your inventory list or upload a text/csv file. We'll extract your current needs automatically.
                </p>

                <div style={{ display: 'flex', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
                    <label className="btn-secondary" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--spacing-xs)', cursor: 'pointer' }}>
                        <Upload size={20} /> Upload File
                        <input type="file" onChange={handleFileUpload} accept=".txt,.csv" style={{ display: 'none' }} />
                    </label>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--spacing-xs)', color: 'var(--text-secondary)', border: '1px dashed rgba(255,255,255,0.2)', borderRadius: 'var(--radius-sm)' }}>
                        <Clipboard size={20} /> Paste below
                    </div>
                </div>

                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter items, quantities, or paste text dump here..."
                    style={{
                        width: '100%',
                        minHeight: '300px',
                        background: 'rgba(0,0,0,0.2)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 'var(--radius-sm)',
                        padding: 'var(--spacing-sm)',
                        color: 'white',
                        fontSize: '1rem',
                        marginBottom: 'var(--spacing-md)',
                        resize: 'vertical'
                    }}
                />

                <button
                    className="btn-primary"
                    onClick={handleSubmit}
                    disabled={loading || !text.trim()}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--spacing-xs)' }}
                >
                    {loading ? <Loader2 className="animate-spin" size={20} /> : <><FileText size={20} /> Update Information</>}
                </button>
            </div>
        </div>
    );
};

export default FoodBankUpdate;
