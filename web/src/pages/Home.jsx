import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Building2 } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const Home = () => {
    return (
        <div className="flex flex-col items-center gap-8 py-8">
            {/* Content Container */}
            <div className="bg-card rounded-lg shadow-sm border p-8 md:p-12 max-w-3xl w-full flex flex-col items-center text-center">
                <div className="mb-8 max-w-xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Cup of Sugar
                    </h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        We are Team Sugar. This website is about facilitating food distribution to those in need.
                        Connecting food donors with local organizations to reduce waste and fight hunger.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    <Link to="/donate" className="block w-full no-underline group">
                        <Card className="h-full transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg hover:shadow-primary/20 cursor-pointer group-hover:border-primary">
                            <CardContent className="flex flex-col items-center gap-4 p-6">
                                <div className="bg-primary/10 p-4 rounded-full transition-colors group-hover:bg-primary/20">
                                    <Heart className="w-8 h-8 text-primary" />
                                </div>
                                <div className="text-center">
                                    <h2 className="text-xl font-semibold text-foreground mb-2">I am a food donor</h2>
                                    <p className="text-muted-foreground">Donate surplus food.</p>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link to="/foodbanks" className="block w-full no-underline group">
                        <Card className="h-full transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg hover:shadow-primary/20 cursor-pointer group-hover:border-primary">
                            <CardContent className="flex flex-col items-center gap-4 p-6">
                                <div className="bg-primary/10 p-4 rounded-full transition-colors group-hover:bg-primary/20">
                                    <Building2 className="w-8 h-8 text-primary" />
                                </div>
                                <div className="text-center">
                                    <h2 className="text-xl font-semibold text-foreground mb-2">I am a food bank</h2>
                                    <p className="text-muted-foreground">Manage your profile.</p>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
