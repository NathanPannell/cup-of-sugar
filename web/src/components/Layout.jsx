import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background font-sans antialiased flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-primary shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
            {/* Simple logo icon or just text */}
            <h1 className="text-xl font-bold text-primary-foreground tracking-tight">
              Cup of Sugar
            </h1>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4">
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

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-primary-foreground p-2"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-primary border-t border-primary-foreground/10 absolute w-full left-0 shadow-lg animate-in slide-in-from-top-5 duration-200">
             <nav className="flex flex-col p-4 space-y-2">
                <Link to="/" onClick={closeMenu}>
                    <Button variant="ghost" className="w-full justify-start text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground">
                        Home
                    </Button>
                </Link>
                 <Link to="/donate" onClick={closeMenu}>
                    <Button variant="ghost" className="w-full justify-start text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground">
                        Donate
                    </Button>
                </Link>
                 <Link to="/foodbanks" onClick={closeMenu}>
                    <Button variant="ghost" className="w-full justify-start text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground">
                        Food Banks
                    </Button>
                </Link>
             </nav>
          </div>
        )}
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
