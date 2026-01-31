import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, Loader2, Star, ArrowRight } from 'lucide-react';
import { findRecommendations } from '../utils/api';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const Donate = () => {
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
        <div className="flex flex-col items-center gap-8 py-8 animate-in fade-in zoom-in duration-500">
             <Card className="w-full max-w-2xl shadow-lg border-muted/40">
                <CardHeader className="text-center pb-2">
                    <CardTitle className="text-2xl md:text-3xl text-primary font-bold">What would you like to donate?</CardTitle>
                    <CardDescription>
                         Describe your donation and we'll match you with the best food banks.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 p-6 md:p-8">
                    {!recommendations ? (
                        <>
                            <div className="space-y-4">
                                <Textarea
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    placeholder="Example: I have 20 loaves of bread and 10 gallons of milk that expire in 3 days."
                                    disabled={submitting}
                                    className="min-h-[150px] text-base resize-none bg-muted/20"
                                />
                                <Button 
                                    onClick={handleSubmit} 
                                    disabled={submitting || !prompt.trim()}
                                    className="w-full text-base py-6 font-semibold shadow-md"
                                >
                                    {submitting ? (
                                        <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Matching...</>
                                    ) : (
                                        <><Send className="mr-2 h-5 w-5" /> Find Recommendations</>
                                    )}
                                </Button>
                            </div>
                            {error && <p className="text-destructive text-sm text-center font-medium bg-destructive/10 p-3 rounded-md">{error}</p>}
                        </>
                    ) : (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-semibold">Top Recommendations</h3>
                                <Button variant="outline" size="sm" onClick={() => setRecommendations(null)}>
                                    Start Over
                                </Button>
                            </div>
                            
                            <div className="grid gap-4">
                                {recommendations.sort((a, b) => b.match_score - a.match_score).map((bank) => (
                                    <Link to={`/foodbanks/${bank.id}`} key={bank.id} className="block no-underline group">
                                        <div className="rounded-lg border bg-card p-4 transition-all hover:bg-accent/50 hover:shadow-md hover:border-primary/50 group-hover:scale-[1.01]">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-semibold text-lg group-hover:text-primary transition-colors">{bank.name}</h4>
                                                <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-2 py-1 rounded-full text-xs font-medium">
                                                    <Star size={14} fill="currentColor" />
                                                    <span>{bank.match_score}% Match</span>
                                                </div>
                                            </div>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                {bank.match_reason}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default Donate;
