import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Menu, Search, Shirt } from 'lucide-react'; // Using Shirt as a placeholder logo icon

interface NavItem {
  href: string;
  label: string;
  exact?: boolean;
}

const navItems: NavItem[] = [
  { href: '/', label: 'Lookbook', exact: true },
  { href: '/design-detail', label: 'Designs' },
  { href: '/product-customization-studio', label: 'Customize' },
  { href: '/user-account-dashboard', label: 'Account' },
];

const MainHeader: React.FC = () => {
  console.log('MainHeader loaded');

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors hover:text-primary ${
      isActive ? 'text-primary font-semibold' : 'text-muted-foreground hover:text-foreground/80'
    }`;

  const mobileNavLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `block px-3 py-2 rounded-md text-base font-medium ${
      isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
    }`;


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2 group">
          <Shirt className="h-7 w-7 text-primary transition-transform group-hover:rotate-[15deg]" />
          <span className="font-bold text-xl tracking-tight">Luxe Atelier</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.href}
              className={navLinkClasses}
              end={item.exact}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search className="h-5 w-5" />
          </Button>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[320px]">
                <div className="p-6">
                  <Link to="/" className="flex items-center gap-2 mb-6">
                    <Shirt className="h-6 w-6 text-primary" />
                    <span className="font-bold text-lg">Luxe Atelier</span>
                  </Link>
                  <nav className="grid gap-2">
                    {navItems.map((item) => (
                      <SheetClose asChild key={item.label + "-mobile"}>
                        <NavLink
                          to={item.href}
                          className={mobileNavLinkClasses}
                          end={item.exact}
                        >
                          {item.label}
                        </NavLink>
                      </SheetClose>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;