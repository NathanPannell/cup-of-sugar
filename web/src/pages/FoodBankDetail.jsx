import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Edit, Phone, Mail, MapPin, Sparkles, Building2, Heart, Loader2 } from 'lucide-react';
import { getFoodBank, getFoodBankSummary } from '../utils/api';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const FoodBankDetail = () => {
    const { id } = useParams();

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
            <div className="flex justify-center items-center min-h-[50vh]">
                <Loader2 className="animate-spin text-primary" size={48} />
            </div>
        );
    }

    if (error || !bank) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
                <h2 className="text-2xl font-bold text-destructive">{error || "Food Bank not found"}</h2>
                <Link to="/">
                    <Button>Return Home</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in zoom-in duration-500 max-w-4xl mx-auto">
            
            {/* Header Section with Actions */}
            <div className="flex flex-col gap-6 border-b pb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                         <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-primary drop-shadow-sm mb-2">
                            {bank.name}
                        </h1>
                         <div className="flex flex-wrap items-center gap-4 text-muted-foreground mt-2">
                            {bank.address && (
                                <div className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4" />
                                    {bank.address}
                                </div>
                            )}
                            {bank.phone_number && (
                                <div className="flex items-center gap-1">
                                    <Phone className="h-4 w-4" />
                                    <a href={`tel:${bank.phone_number}`} className="hover:text-primary transition-colors">{bank.phone_number}</a>
                                </div>
                            )}
                            {bank.email && (
                                <div className="flex items-center gap-1">
                                    <Mail className="h-4 w-4" />
                                    <a href={`mailto:${bank.email}`} className="hover:text-primary transition-colors">{bank.email}</a>
                                </div>
                            )}
                         </div>
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                        <Link to={`/foodbanks/${id}/update`} className="flex-1 md:flex-none">
                            <Button variant="outline" className="gap-2 w-full">
                                <Edit size={16} /> Update Needs
                            </Button>
                        </Link>
                         <Button 
                            className="gap-2 font-bold flex-1 md:flex-none" 
                            onClick={() => window.location.href = `mailto:${bank.email}?subject=Donation Inquiry`}
                        >
                            <Heart size={16} /> Contact to Donate
                        </Button>
                    </div>
                </div>
            </div>

            <div className="space-y-8">
                 {/* AI Smart Summary Section */}
                 <Card className="border-amber-200 bg-amber-50/50 dark:bg-amber-950/10 shadow-md">
                    <CardHeader className="pb-2">
                         <CardTitle className="text-amber-600 flex items-center gap-2 text-2xl">
                            <Sparkles size={24} className="text-amber-500 fill-amber-500" /> AI Insight
                         </CardTitle>
                         <CardDescription>
                            Real-time summary of current inventory and urgent needs.
                         </CardDescription>
                    </CardHeader>
                    <CardContent>
                         {loadingSummary ? (
                            <div className="flex gap-2 items-center text-muted-foreground py-8 justify-center">
                                <Loader2 className="animate-spin" size={24} /> Analyzing latest updates...
                            </div>
                        ) : summary ? (
                            <div className="grid md:grid-cols-2 gap-8 pt-2">
                                <div className="bg-background/50 p-4 rounded-lg border">
                                    <h4 className="font-bold text-amber-700 mb-2 text-lg flex items-center gap-2">
                                        <Building2 size={18} /> What We Have
                                    </h4>
                                    <p className="text-foreground/90 leading-relaxed">{summary.inventory_summary}</p>
                                </div>
                                <div className="bg-background/50 p-4 rounded-lg border">
                                    <h4 className="font-bold text-amber-700 mb-2 text-lg flex items-center gap-2">
                                        <Heart size={18} /> What We Need
                                    </h4>
                                    <p className="text-foreground/90 leading-relaxed">{summary.needs_summary}</p>
                                </div>
                            </div>
                        ) : (
                            <p className="text-muted-foreground text-center py-4">Unable to load AI application insights.</p>
                        )}
                        <p className="text-xs text-muted-foreground mt-6 text-center italic border-t pt-4">
                            * Generated by AI based on recent updates from the food bank.
                        </p>
                    </CardContent>
                </Card>

                 <section>
                    <h3 className="text-2xl font-bold mb-4 text-foreground">About Us</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        {bank.description || "No description provided."}
                    </p>
                 </section>
            </div>
        </div>
    );
};

export default FoodBankDetail;
