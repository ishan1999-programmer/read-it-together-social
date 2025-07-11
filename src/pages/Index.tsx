
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  BookOpen, 
  Users, 
  Heart, 
  MessageCircle, 
  Search, 
  Bell, 
  Library, 
  Target 
} from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: Target,
      title: "Track Your Reading Journey",
      description: "Organize books into Want to Read, Currently Reading, and Read lists to keep track of your literary adventures."
    },
    {
      icon: Users,
      title: "Connect with Fellow Readers",
      description: "Follow other book lovers and discover what they're reading, creating a vibrant reading community."
    },
    {
      icon: MessageCircle,
      title: "Share Your Thoughts",
      description: "Post reviews, thoughts, and recommendations to spark meaningful conversations about books."
    },
    {
      icon: Heart,
      title: "Engage with Content",
      description: "Like and comment on posts from your reading community to show appreciation and share insights."
    },
    {
      icon: Search,
      title: "Discover New Books",
      description: "Explore new genres, authors, and hidden gems recommended by your reading network."
    },
    {
      icon: Bell,
      title: "Stay Connected",
      description: "Get notified when friends like your posts, comment on your reviews, or send follow requests."
    },
    {
      icon: Library,
      title: "Build Your Virtual Bookshelf",
      description: "Create a personalized digital library that showcases your reading history and future goals."
    },
    {
      icon: BookOpen,
      title: "Reading Progress",
      description: "Track your reading progress with page counters and maintain your daily reading streaks."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-background border-b border-border px-4 lg:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="font-bold text-xl text-primary">BookShare</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button asChild variant="ghost">
              <Link to="/login">Log In</Link>
            </Button>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 lg:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Your Reading Journey
            <span className="text-primary block">Starts Here</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Track your books, connect with fellow readers, and discover your next great read. 
            Join a community of book lovers who share your passion for stories.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-3">
              <Link to="/signup">Start Your Journey</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-3">
              <Link to="/login">Welcome Back</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 lg:px-6 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need for Your Reading Life
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From tracking your progress to connecting with others, BookShare has all the tools 
              to enhance your reading experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 px-4 lg:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-2xl md:text-3xl font-medium text-foreground mb-6 italic">
            "BookShare has transformed how I discover and track my reading. The community 
            recommendations have introduced me to books I never would have found on my own."
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-foreground">Sarah M.</p>
              <p className="text-sm text-muted-foreground">BookShare Community Member</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 lg:px-6 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Begin Your Reading Adventure?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of readers who are already tracking their books, 
            sharing their thoughts, and discovering their next favorite story.
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-3">
            <Link to="/signup">Join the Community</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 lg:px-6 border-t border-border">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg text-primary">BookShare</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 BookShare. Built for book lovers, by book lovers.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
