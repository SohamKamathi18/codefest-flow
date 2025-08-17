import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Code, 
  Github, 
  Twitter, 
  Mail, 
  Heart,
  ArrowRight,
  Users,
  Trophy,
  Calendar,
  FileText
} from "lucide-react";

const Footer = () => {
  const links = {
    Product: [
      { name: "Features", href: "#features" },
      { name: "Pricing", href: "#pricing" },
      { name: "Demo", href: "#demo" },
      { name: "API", href: "#api" }
    ],
    Resources: [
      { name: "Documentation", href: "#docs" },
      { name: "Blog", href: "#blog" },
      { name: "Help Center", href: "#help" },
      { name: "Community", href: "#community" }
    ],
    Company: [
      { name: "About", href: "#about" },
      { name: "Careers", href: "#careers" },
      { name: "Press", href: "#press" },
      { name: "Contact", href: "#contact" }
    ]
  };

  const stats = [
    { label: "Events Hosted", value: "500+", icon: Calendar },
    { label: "Active Users", value: "10K+", icon: Users },
    { label: "Projects Submitted", value: "5K+", icon: FileText },
    { label: "Awards Given", value: "1.2K+", icon: Trophy }
  ];

  return (
    <footer className="bg-background border-t border-border/50">
      {/* CTA Section */}
      <div className="py-16 px-6 bg-gradient-subtle">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
            🚀 Ready to Launch?
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start Your Next Hackathon Today
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of organizers who trust HackFlow to power their events. 
            Create your first hackathon in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" className="group">
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg">
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-12 px-6 border-b border-border/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex p-3 bg-gradient-primary rounded-lg mb-3">
                  <stat.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-primary rounded-lg">
                  <Code className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  HackFlow
                </h3>
              </div>
              <p className="text-muted-foreground mb-6 max-w-md">
                The modern platform for hosting hackathons, managing teams, and judging projects. 
                Built for student innovation and academic excellence.
              </p>
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon">
                  <Github className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Twitter className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Mail className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Links Columns */}
            {Object.entries(links).map(([category, categoryLinks]) => (
              <div key={category}>
                <h4 className="font-semibold mb-4">{category}</h4>
                <ul className="space-y-3">
                  {categoryLinks.map((link) => (
                    <li key={link.name}>
                      <a 
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-muted-foreground text-sm">
              © 2024 HackFlow. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#terms" className="hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#cookies" className="hover:text-primary transition-colors">
                Cookie Policy
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              Made with <Heart className="w-4 h-4 text-red-500" /> for hackers
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;