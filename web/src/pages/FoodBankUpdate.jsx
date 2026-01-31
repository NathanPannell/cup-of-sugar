import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Upload, Loader2, FileText, Clipboard } from 'lucide-react';
import { updateFoodBankData } from '../utils/api';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

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
        <div className="max-w-3xl mx-auto py-8 animate-in fade-in duration-500">
             <Link to={`/foodbanks/${id}`} className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors">
                <ArrowLeft size={16} className="mr-2" /> Back to Details
            </Link>

            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Update Food Bank Data</CardTitle>
                    <CardDescription>
                         Copy-paste your inventory list or upload a text/csv file. We'll extract your current needs automatically.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button variant="outline" className="relative cursor-pointer h-auto py-4 flex flex-col items-center gap-2 border-dashed border-2 hover:bg-accent/50">
                             <Upload className="h-6 w-6 text-muted-foreground" />
                             <span className="text-sm font-medium">Upload File</span>
                             <span className="text-xs text-muted-foreground">(.txt, .csv)</span>
                             <input type="file" onChange={handleFileUpload} accept=".txt,.csv" className="absolute inset-0 opacity-0 cursor-pointer" />
                        </Button>

                         <div className="flex flex-col items-center justify-center gap-2 py-4 border-2 border-dashed rounded-md bg-muted/10 text-muted-foreground">
                            <Clipboard className="h-6 w-6" />
                            <span className="text-sm font-medium">Paste Text Below</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="update-text" className="sr-only">Update Text</Label>
                        <Textarea 
                            id="update-text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Enter items, quantities, or paste text dump here..."
                            className="min-h-[300px] font-mono text-sm"
                        />
                    </div>

                    <Button 
                        onClick={handleSubmit} 
                        disabled={loading || !text.trim()} 
                        className="w-full"
                    >
                        {loading ? <Loader2 className="animate-spin mr-2" size={20} /> : <FileText className="mr-2" size={20} />}
                        {loading ? 'Updating...' : 'Update Information'}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default FoodBankUpdate;
