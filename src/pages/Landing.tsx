import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Upload, Shield, MessageCircle, FileText, Star, CheckCircle, Users, Clock, Brain } from "lucide-react";
import { Link } from "react-router-dom";
import workflowImage from "@/assets/workflow-hero.jpg";

const Landing = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center hero-gradient">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium">
              <Brain className="w-4 h-4 mr-2" />
              AI-Powered Document Analysis
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              Tell Me <span className="bg-gradient-to-r from-primary to-secondary-brand bg-clip-text text-transparent">Everything</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Instantly summarize your chats and documents. Save time, stay informed, and never miss important details again.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                variant="hero" 
                size="lg" 
                onClick={() => scrollToSection('features')}
                className="text-lg px-8 py-4 h-auto"
              >
                Explore Features
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button 
                variant="hero-outline" 
                size="lg" 
                asChild
                className="text-lg px-8 py-4 h-auto"
              >
                <Link to="/chat">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Start Analyzing
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-10 w-20 h-20 primary-gradient rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-10 w-16 h-16 bg-secondary-brand rounded-full opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-1/4 w-12 h-12 primary-gradient rounded-full opacity-10 animate-pulse delay-500"></div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-surface-elevated">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Stop drowning in <span className="text-primary">information overload</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
              Group chats move fast. Important documents pile up. Critical information gets buried in endless conversations. 
              Tell Me Everything cuts through the noise, giving you instant insights and summaries so you can focus on what matters most.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 primary-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Group Chat Chaos</h3>
                <p className="text-muted-foreground">Hundreds of messages, mixed conversations, important updates lost in the stream</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 primary-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Time Wasted</h3>
                <p className="text-muted-foreground">Hours spent scrolling through conversations to find key information</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 primary-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI Solution</h3>
                <p className="text-muted-foreground">Intelligent analysis that extracts and summarizes what you need to know</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Powerful AI Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Transform your documents and conversations into actionable insights with cutting-edge AI technology
            </p>
          </div>

          {/* Workflow Visual */}
          <div className="mb-16">
            <Card className="overflow-hidden shadow-xl border-0">
              <CardContent className="p-0">
                <img 
                  src={workflowImage} 
                  alt="AI workflow showing WhatsApp chat analysis process" 
                  className="w-full h-auto object-cover"
                />
              </CardContent>
            </Card>
          </div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center p-6 hover:shadow-lg transition-smooth border border-border">
              <CardContent className="p-0">
                <div className="w-12 h-12 primary-gradient rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">WhatsApp Chat Summarization</h3>
                <p className="text-muted-foreground">Export your WhatsApp conversations and get instant, intelligent summaries of key discussions and decisions.</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-smooth border border-border">
              <CardContent className="p-0">
                <div className="w-12 h-12 primary-gradient rounded-lg flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Document Analysis</h3>
                <p className="text-muted-foreground">Upload PDFs and text files to get comprehensive summaries and extract key information instantly.</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-smooth border border-border">
              <CardContent className="p-0">
                <div className="w-12 h-12 primary-gradient rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">AI Safety Checks</h3>
                <p className="text-muted-foreground">Scan your files for potential security risks and malicious content before opening or sharing.</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-smooth border border-border">
              <CardContent className="p-0">
                <div className="w-12 h-12 primary-gradient rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Time Efficiency</h3>
                <p className="text-muted-foreground">Save hours of manual reading and reviewing. Get insights in seconds, not hours.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-surface-elevated">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What Our Users Say
            </h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of users who've transformed how they handle information
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="p-6 border border-border hover:shadow-lg transition-smooth">
              <CardContent className="p-0">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "Tell Me Everything saved me hours every week. No more scrolling through endless WhatsApp groups to find important updates!"
                </p>
                <div className="font-semibold">Sarah Johnson</div>
                <div className="text-sm text-muted-foreground">Project Manager</div>
              </CardContent>
            </Card>

            <Card className="p-6 border border-border hover:shadow-lg transition-smooth">
              <CardContent className="p-0">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "The AI safety checks give me peace of mind when dealing with client documents. Incredibly useful feature."
                </p>
                <div className="font-semibold">Michael Chen</div>
                <div className="text-sm text-muted-foreground">Legal Consultant</div>
              </CardContent>
            </Card>

            <Card className="p-6 border border-border hover:shadow-lg transition-smooth">
              <CardContent className="p-0">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "Game-changer for our team communications. We can finally keep track of what's happening without information overload."
                </p>
                <div className="font-semibold">Emily Rodriguez</div>
                <div className="text-sm text-muted-foreground">Team Lead</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-2xl font-bold primary-gradient bg-clip-text text-transparent">Tell Me Everything</h3>
              <p className="text-muted-foreground">© 2025 Tell Me Everything. All rights reserved.</p>
            </div>
            
            <div className="flex gap-6">
              <button 
                onClick={() => scrollToSection('about')} 
                className="text-muted-foreground hover:text-primary transition-smooth"
              >
                About Us
              </button>
              <Link to="/chat" className="text-muted-foreground hover:text-primary transition-smooth">
                Try AI Chat
              </Link>
              <a href="mailto:contact@tellmeeverything.ai" className="text-muted-foreground hover:text-primary transition-smooth">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;