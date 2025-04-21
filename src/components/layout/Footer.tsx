
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col md:flex-row md:h-16 items-center justify-between gap-4 md:gap-0">
        <div className="text-center md:text-left">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Smart Traffic Light System. All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Documentation
          </a>
          <Separator orientation="vertical" className="h-4" />
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Support
          </a>
          <Separator orientation="vertical" className="h-4" />
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Privacy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
