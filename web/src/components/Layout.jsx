import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Layout = () => {
  return (
    <div className="min-h-screen bg-background font-sans antialiased flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-primary shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            {/* Simple logo icon or just text */}
            <h1 className="text-xl font-bold text-primary-foreground tracking-tight">
              Cup of Sugar
            </h1>
          </Link>
          
          <nav className="flex items-center gap-4">
            <Link to="/">
                <Button variant="ghost" className="text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground">
                    Home
                </Button>
            </Link>
             <Link to="/donate">
                <Button variant="ghost" className="text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground">
                    Donate
                </Button>
            </Link>
             <Link to="/foodbanks">
                <Button variant="ghost" className="text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground">
                    Food Banks
                </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t py-6 md:py-8 bg-card">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Cup of Sugar. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
