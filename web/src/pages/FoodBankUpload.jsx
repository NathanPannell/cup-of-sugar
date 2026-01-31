import React, { useState } from 'react';
import { Upload, FileText, CheckCircle } from 'lucide-react';
import '../App.css';

const FoodBankUpload = () => {
    const [file, setFile] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadComplete, setUploadComplete] = useState(false);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (fileData) => {
        if (fileData.type === "text/csv" || fileData.name.endsWith(".csv")) {
            setFile(fileData);
            setUploadComplete(false);
        } else {
            alert("Please upload a valid CSV file.");
        }
    };

    const handleUpload = () => {
        if (!file) return;
        setIsUploading(true);

        // Mock API Upload
        setTimeout(() => {
            setIsUploading(false);
            setUploadComplete(true);
            setFile(null);
        }, 2000);
    };

    return (
        <div className="container">
            <div className="card">
                <h1>Food Bank Inventory Upload</h1>
                <p className="subtitle">Upload your inventory CSV to update availability.</p>

                {!uploadComplete ? (
                    <>
                        <div
                            className={`upload-area ${dragActive ? 'drag-active' : ''}`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                            onClick={() => document.getElementById('file-upload').click()}
                        >
                            <input
                                type="file"
                                id="file-upload"
                                className="file-input"
                                accept=".csv"
                                onChange={handleChange}
                            />

                            {file ? (
                                <div className="file-info">
                                    <FileText className="upload-icon" />
                                    <p>{file.name}</p>
                                    <p className="upload-hint">{(file.size / 1024).toFixed(2)} KB</p>
                                </div>
                            ) : (
                                <div className="upload-text">
                                    <Upload className="upload-icon" />
                                    <p>Drag and drop your CSV file here</p>
                                    <p>or click to browse</p>
                                    <p className="upload-hint">Supported formats: .csv</p>
                                </div>
                            )}
                        </div>

                        {file && (
                            <button
                                className="button primary-button"
                                onClick={handleUpload}
                                disabled={isUploading}
                            >
                                {isUploading ? 'Uploading...' : 'Upload Inventory'}
                            </button>
                        )}
                    </>
                ) : (
                    <div className="success-message">
                        <CheckCircle className="upload-icon" style={{ color: '#4ade80' }} />
                        <h2>Upload Successful!</h2>
                        <p>Your inventory has been updated.</p>
                        <button
                            className="button secondary-button"
                            onClick={() => setUploadComplete(false)}
                        >
                            Upload Another File
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FoodBankUpload;
