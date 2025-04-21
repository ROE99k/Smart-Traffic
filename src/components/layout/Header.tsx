
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/layout/ModeToggle";
import { Separator } from "@/components/ui/separator";
import { Menu, Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function Header() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (showMobileMenu) {
        setShowMobileMenu(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMobileMenu]);
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={(e) => {
                e.stopPropagation();
                setShowMobileMenu(!showMobileMenu);
              }}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
          <Link to="/" className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mr-2 flex items-center justify-center">
              <span className="text-white font-bold">🚦</span>
            </div>
            <span className="font-bold text-xl hidden md:inline-block">Smart Traffic</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
            Dashboard
          </Link>
          <Link to="/junctions" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Junctions
          </Link>
          <Link to="/analytics" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Analytics
          </Link>
          <Link to="/settings" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Settings
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <ModeToggle />
          <Separator orientation="vertical" className="h-6 hidden md:block" />
          <Button variant="outline" size="sm" className="hidden md:flex">
            System Status
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {showMobileMenu && (
        <div className="md:hidden border-t absolute top-16 left-0 w-full bg-background shadow-lg z-50" onClick={(e) => e.stopPropagation()}>
          <div className="container py-4 space-y-2">
            <Link to="/" className="block px-4 py-2 text-sm hover:bg-muted rounded-md">
              Dashboard
            </Link>
            <Link to="/junctions" className="block px-4 py-2 text-sm hover:bg-muted rounded-md">
              Junctions
            </Link>
            <Link to="/analytics" className="block px-4 py-2 text-sm hover:bg-muted rounded-md">
              Analytics
            </Link>
            <Link to="/settings" className="block px-4 py-2 text-sm hover:bg-muted rounded-md">
              Settings
            </Link>
            <Separator className="my-2" />
            <Button variant="outline" className="w-full">
              System Status
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
