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
        <div className="space-y-8 animate-in fade-in zoom-in duration-500 max-w-5xl mx-auto">
            
            {/* Header Section with Actions */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6">
                <div>
                     <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-primary drop-shadow-sm mb-2">
                        {bank.name}
                    </h1>
                     <div className="flex items-center text-muted-foreground">
                        <MapPin className="mr-1 h-4 w-4" />
                        {bank.address || "No address provided"}
                     </div>
                </div>
                <Link to={`/foodbanks/${id}/update`}>
                    <Button variant="outline" className="gap-2">
                        <Edit size={16} /> Update Needs
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content - Left Column */}
                <div className="lg:col-span-2 space-y-8">
                     
                     <section>
                        <h3 className="text-2xl font-semibold mb-4 text-foreground">About Us</h3>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            {bank.description || "No description provided."}
                        </p>
                     </section>

                    {/* AI Smart Summary Section */}
                    <Card className="border-amber-200 bg-amber-50/50 dark:bg-amber-950/10">
                        <CardHeader className="pb-2">
                             <CardTitle className="text-amber-600 flex items-center gap-2 text-xl">
                                <Sparkles size={20} className="text-amber-500 fill-amber-500" /> AI Insight
                             </CardTitle>
                        </CardHeader>
                        <CardContent>
                             {loadingSummary ? (
                                <div className="flex gap-2 items-center text-muted-foreground py-4">
                                    <Loader2 className="animate-spin" size={16} /> Analyzing latest updates...
                                </div>
                            ) : summary ? (
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-semibold text-amber-700 mb-1">What We Have:</h4>
                                        <p className="text-foreground/80">{summary.inventory_summary}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-amber-700 mb-1">What We Need:</h4>
                                        <p className="text-foreground/80">{summary.needs_summary}</p>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-muted-foreground">Unable to load AI application insights.</p>
                            )}
                            <p className="text-xs text-muted-foreground mt-4 italic">
                                * Generated by AI based on recent updates from the food bank.
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar - Right Column */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                 <Building2 className="text-primary" size={20} /> Contact Info
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             {bank.address && (
                                <div className="flex items-start gap-3 text-muted-foreground">
                                    <MapPin size={18} className="mt-1 shrink-0" />
                                    <span>{bank.address}</span>
                                </div>
                            )}
                            {bank.phone_number && (
                                <a href={`tel:${bank.phone_number}`} className="flex items-center gap-3 text-foreground hover:text-primary transition-colors">
                                    <Phone size={18} className="text-primary" />
                                    {bank.phone_number}
                                </a>
                            )}
                            {bank.email && (
                                <a href={`mailto:${bank.email}`} className="flex items-center gap-3 text-foreground hover:text-primary transition-colors">
                                    <Mail size={18} className="text-primary" />
                                    {bank.email}
                                </a>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                             <CardTitle className="flex items-center gap-2">
                                <Heart className="text-primary" size={20} /> Traditional List
                            </CardTitle>
                        </CardHeader>
                         <CardContent>
                            <p className="text-muted-foreground text-sm">
                                Check the AI Insight above for the most up-to-date informal needs, or contact us directly.
                            </p>
                        </CardContent>
                    </Card>
                    
                    <div className="pt-4 border-t text-center">
                        <p className="text-muted-foreground mb-4 text-sm">Want to help {bank.name}?</p>
                        <Button className="w-full font-bold" onClick={() => window.location.href = `mailto:${bank.email}?subject=Donation Inquiry`}>
                            Contact to Donate
                        </Button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default FoodBankDetail;
