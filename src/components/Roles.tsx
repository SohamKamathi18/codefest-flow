import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  Users, 
  Gavel, 
  Monitor,
  FileText,
  BarChart3,
  MessageSquare,
  Award,
  Shield,
  Clock,
  Target,
  Star,
  Calendar
} from "lucide-react";

const Roles = () => {
  const roles = [
    {
      title: "Organizers",
      subtitle: "Host & Manage Events",
      description: "Perfect for student clubs, teachers, and tech communities",
      icon: Settings,
      gradient: "bg-gradient-primary",
      features: [
        "Create hackathons with custom themes & tracks",
        "Manage registrations and teams",
        "Real-time analytics dashboard",
        "Sponsor showcase integration",
        "Automated certificate generation",
        "Announcement system"
      ],
      cta: "Start Organizing",
      badge: "Most Popular"
    },
    {
      title: "Participants",
      subtitle: "Join & Compete",
      description: "For students ready to showcase their skills",
      icon: Users,
      gradient: "bg-gradient-tech",
      features: [
        "Individual or team registration",
        "Project submission portal",
        "Real-time leaderboard access",
        "Team formation tools",
        "Deadline tracking",
        "Certificate collection"
      ],
      cta: "Join Events",
      badge: "For Students"
    },
    {
      title: "Judges",
      subtitle: "Evaluate & Mentor",
      description: "Industry experts and academic mentors",
      icon: Gavel,
      gradient: "bg-gradient-hero",
      features: [
        "Rubric-based scoring system",
        "Structured feedback collection",
        "Progress tracking dashboard",
        "Multi-round evaluation",
        "Conflict of interest management",
        "Mentor networking"
      ],
      cta: "Become a Judge",
      badge: "Expert Panel"
    }
  ];

  const dashboardPreviews = [
    {
      role: "Organizer Dashboard",
      icon: Monitor,
      stats: [
        { label: "Active Events", value: "12", icon: Calendar },
        { label: "Total Participants", value: "1,247", icon: Users },
        { label: "Submissions", value: "89", icon: FileText },
        { label: "Completion Rate", value: "94%", icon: Target }
      ]
    },
    {
      role: "Participant Dashboard", 
      icon: Target,
      stats: [
        { label: "Events Joined", value: "3", icon: Calendar },
        { label: "Team Members", value: "4", icon: Users },
        { label: "Projects Submitted", value: "2", icon: FileText },
        { label: "Awards Won", value: "1", icon: Award }
      ]
    },
    {
      role: "Judge Dashboard",
      icon: Star,
      stats: [
        { label: "Projects to Review", value: "24", icon: FileText },
        { label: "Completed Reviews", value: "18", icon: Target },
        { label: "Events Judging", value: "2", icon: Calendar },
        { label: "Avg. Score Given", value: "8.4", icon: Star }
      ]
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            👥 Role-Based Platform
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Built for <span className="bg-gradient-primary bg-clip-text text-transparent">Everyone</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tailored experiences for organizers, participants, and judges with dedicated dashboards and tools.
          </p>
        </div>

        {/* Roles Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {roles.map((role, index) => (
            <Card 
              key={index}
              className="relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-elegant transition-all duration-500 group"
            >
              {role.badge && (
                <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                  {role.badge}
                </Badge>
              )}
              
              <CardHeader className="text-center pb-6">
                <div className={`inline-flex p-4 ${role.gradient} rounded-full mb-4 mx-auto group-hover:shadow-glow transition-all duration-300`}>
                  <role.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl mb-2">{role.title}</CardTitle>
                <CardDescription className="text-lg font-medium text-primary mb-2">
                  {role.subtitle}
                </CardDescription>
                <CardDescription className="text-muted-foreground">
                  {role.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {role.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-gradient-primary rounded-full flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button className="w-full mt-6" variant="default">
                  {role.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Dashboard Previews */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-6">Role-Based Dashboards</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Each user type gets a customized dashboard with relevant metrics and tools.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {dashboardPreviews.map((dashboard, index) => (
            <Card 
              key={index}
              className="border-border/50 bg-card/30 backdrop-blur-sm hover:bg-card/50 transition-all duration-300"
            >
              <CardHeader className="text-center">
                <div className="inline-flex p-3 bg-gradient-primary rounded-lg mb-3 mx-auto">
                  <dashboard.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-lg">{dashboard.role}</CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {dashboard.stats.map((stat, statIndex) => (
                    <div key={statIndex} className="text-center p-3 bg-background/50 rounded-lg">
                      <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Roles;