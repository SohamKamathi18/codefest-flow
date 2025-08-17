import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Trophy, 
  Calendar, 
  FileText, 
  BarChart3, 
  MessageSquare, 
  Shield, 
  Zap,
  Target,
  Clock,
  Star,
  Award
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Calendar,
      title: "Event Management",
      description: "Create and manage hackathons with themes, tracks, timelines, and prizes. Support for both online and offline events.",
      badge: "Organizers"
    },
    {
      icon: Users,
      title: "Team Formation",
      description: "Seamless team registration and formation with invite systems. Individual and team participation options.",
      badge: "Participants"
    },
    {
      icon: FileText,
      title: "Project Submission",
      description: "Easy upload of presentations, demos, and GitHub links. Multi-round evaluation support.",
      badge: "All Users"
    },
    {
      icon: Trophy,
      title: "Smart Judging",
      description: "Rubric-based scoring system with feedback collection. Transparent evaluation process.",
      badge: "Judges"
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Comprehensive insights on registrations, submissions, and engagement metrics.",
      badge: "Organizers"
    },
    {
      icon: Shield,
      title: "Role-Based Access",
      description: "Secure authentication with Google OAuth. Different dashboards for participants, organizers, and judges.",
      badge: "Security"
    }
  ];

  const benefits = [
    {
      icon: Zap,
      title: "Lightning Fast Setup",
      description: "Get your hackathon running in minutes, not hours"
    },
    {
      icon: Target,
      title: "Student-Focused",
      description: "Built specifically for student clubs and academic events"
    },
    {
      icon: Clock,
      title: "Real-Time Updates",
      description: "Keep participants informed with live announcements"
    },
    {
      icon: Star,
      title: "Transparent Judging",
      description: "Fair evaluation with detailed feedback systems"
    }
  ];

  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            🔥 Core Features
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Everything You Need
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From event creation to project evaluation, we've got every aspect of hackathon management covered.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-card transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gradient-primary rounded-lg group-hover:shadow-glow transition-all duration-300">
                    <feature.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-6">Why Choose HackFlow?</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="text-center p-6 rounded-lg border border-border/50 bg-card/30 backdrop-blur-sm hover:bg-card/50 transition-all duration-300 group"
            >
              <div className="inline-flex p-4 bg-gradient-tech rounded-full mb-4 group-hover:shadow-elegant transition-all duration-300">
                <benefit.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <h4 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                {benefit.title}
              </h4>
              <p className="text-muted-foreground text-sm">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;