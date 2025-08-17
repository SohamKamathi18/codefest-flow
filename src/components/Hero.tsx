import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Trophy, Code, Rocket } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-subtle">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Hackathon platform hero background"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-80" />
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float">
        <div className="p-4 bg-card/20 backdrop-blur-sm rounded-lg border border-border/50">
          <Code className="w-8 h-8 text-tech-blue" />
        </div>
      </div>
      <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: "2s" }}>
        <div className="p-4 bg-card/20 backdrop-blur-sm rounded-lg border border-border/50">
          <Users className="w-8 h-8 text-tech-cyan" />
        </div>
      </div>
      <div className="absolute bottom-40 left-20 animate-float" style={{ animationDelay: "4s" }}>
        <div className="p-4 bg-card/20 backdrop-blur-sm rounded-lg border border-border/50">
          <Trophy className="w-8 h-8 text-primary-glow" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 animate-slide-up">
        <Badge className="mb-6 bg-background/20 backdrop-blur-sm border border-border/50 text-foreground">
          🚀 Platform for Student Innovation
        </Badge>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary-foreground via-tech-blue to-tech-cyan bg-clip-text text-transparent">
          HackFlow
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">
          The all-in-one platform for hosting hackathons, managing teams, and judging projects. 
          Empowering student innovation through seamless event organization.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button variant="hero" size="lg" className="group">
            <Rocket className="w-5 h-5 group-hover:animate-bounce" />
            Start Your Hackathon
          </Button>
          <Button variant="glass" size="lg">
            View Demo
          </Button>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-foreground mb-2">500+</div>
            <div className="text-primary-foreground/70">Events Hosted</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-foreground mb-2">10K+</div>
            <div className="text-primary-foreground/70">Participants</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-foreground mb-2">25+</div>
            <div className="text-primary-foreground/70">Universities</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;