import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Loader2, MapPin } from 'lucide-react';
import { getFoodBanks } from '../utils/api';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";

const FoodBanksList = () => {
    const [foodbanks, setFoodbanks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFoodBanks = async () => {
            try {
                const response = await getFoodBanks();
                setFoodbanks(response.data);
            } catch (err) {
                setError('Failed to fetch food banks');
            } finally {
                setLoading(false);
            }
        };
        fetchFoodBanks();
    }, []);

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground">Food Banks</h2>
                    <p className="text-muted-foreground">Manage and view registered food banks.</p>
                </div>
                <Link to="/foodbanks/new">
                     <Button className="shadow-sm">
                        <Plus className="mr-2 h-4 w-4" /> Add New
                    </Button>
                </Link>
            </div>

            {/* List */}
             {loading ? (
                <div className="flex justify-center items-center py-20">
                    <Loader2 className="animate-spin text-primary" size={48} />
                </div>
            ) : error ? (
                <div className="p-8 text-center bg-destructive/10 rounded-lg border border-destructive/20">
                     <p className="text-destructive font-medium">{error}</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {foodbanks.map((bank) => (
                        <Link to={`/foodbanks/${bank.id}`} key={bank.id} className="block no-underline group h-full">
                            <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/50 group-hover:bg-accent/5">
                                <CardHeader>
                                    <CardTitle className="text-xl text-primary group-hover:text-primary/80 transition-colors">
                                        {bank.name}
                                    </CardTitle>
                                    {bank.address && (
                                         <CardDescription className="flex items-start gap-1 mt-1">
                                            <MapPin className="w-3 h-3 mt-1 shrink-0" /> 
                                            <span className="line-clamp-1">{bank.address}</span>
                                        </CardDescription>
                                    )}
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
                                        {bank.description || 'No description provided.'}
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                    {foodbanks.length === 0 && (
                        <div className="col-span-full text-center py-12 text-muted-foreground bg-muted/10 rounded-lg border border-dashed">
                            No food banks found. Create one to get started.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default FoodBanksList;
