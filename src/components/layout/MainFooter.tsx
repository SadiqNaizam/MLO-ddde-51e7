import React from 'react';
import { Link } from 'react-router-dom';
import { Shirt } from 'lucide-react'; // Using Shirt as a placeholder logo icon

const footerLinks = [
  { href: '/about-us', label: 'About Us' },
  { href: '/sizing-guide', label: 'Sizing Guide' },
  { href: '/terms-conditions', label: 'Terms & Conditions' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/contact-us', label: 'Contact' },
];

const MainFooter: React.FC = () => {
  console.log('MainFooter loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/40 border-t text-muted-foreground">
      <div className="container py-12 px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-3 items-start">
          <div className="flex flex-col items-center md:items-start">
            <Link to="/" className="flex items-center gap-2 mb-3">
              <Shirt className="h-6 w-6 text-primary" />
              <span className="font-semibold text-lg text-foreground">Luxe Atelier</span>
            </Link>
            <p className="text-sm text-center md:text-left max-w-xs">
              Crafting exquisite, custom-made clothing for the discerning individual.
            </p>
          </div>

          <div className="md:col-span-1 md:justify-self-center">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4 text-center md:text-left">Information</h3>
            <nav className="flex flex-col gap-2 items-center md:items-start">
              {footerLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-sm hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="md:col-span-1 md:justify-self-end text-center md:text-right">
             <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Connect</h3>
             {/* Placeholder for social media icons or newsletter */}
             <p className="text-sm">
                Stay updated with our latest collections and exclusive offers.
             </p>
             {/* Example: Newsletter signup (visual placeholder) */}
             <div className="mt-4 flex justify-center md:justify-end">
                <input type="email" placeholder="Enter your email" className="p-2 border rounded-l-md text-sm bg-background focus:ring-primary focus:border-primary w-40" />
                <button className="bg-primary text-primary-foreground p-2 rounded-r-md text-sm hover:bg-primary/90">Subscribe</button>
             </div>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-muted text-center">
          <p className="text-xs">
            &copy; {currentYear} Luxe Atelier. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;