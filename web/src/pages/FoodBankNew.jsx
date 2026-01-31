import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Save, Loader2, ArrowLeft } from 'lucide-react';
import { createFoodBank } from '../utils/api';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const FoodBankNew = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        phone_number: '',
        email: '',
        address: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createFoodBank(formData);
            navigate('/foodbanks');
        } catch (err) {
            alert('Failed to create food bank');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-8 animate-in fade-in duration-500">
            <Link to="/foodbanks" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors">
                <ArrowLeft size={16} className="mr-2" /> Back to List
            </Link>

            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Register New Food Bank</CardTitle>
                    <CardDescription>Enter the details for the new food bank.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="e.g. Downtown Food Pantry" />
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" name="description" value={formData.description} onChange={handleChange} placeholder="Tell us about your mission..." className="min-h-[100px]" />
                        </div>

                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="phone_number">Phone Number</Label>
                                <Input id="phone_number" name="phone_number" value={formData.phone_number} onChange={handleChange} placeholder="(555) 123-4567" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="contact@example.com" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <Input id="address" name="address" value={formData.address} onChange={handleChange} placeholder="123 Main St, City, ST" />
                        </div>

                        <Button type="submit" disabled={loading} className="w-full mt-6">
                            {loading ? <Loader2 className="animate-spin mr-2" size={20} /> : <Save className="mr-2" size={20} />}
                            {loading ? 'Registering...' : 'Register Food Bank'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default FoodBankNew;
