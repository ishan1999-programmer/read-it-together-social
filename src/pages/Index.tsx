
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  BookOpen, 
  Users, 
  MessageSquare, 
  Heart, 
  Search, 
  MessageCircle, 
  Library, 
  Bell,
  Star,
  Quote
} from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Track Your Reading Journey",
      description: "Organize books into Want to Read, Currently Reading, and Read lists to stay on top of your literary adventures."
    },
    {
      icon: Users,
      title: "Follow Fellow Readers",
      description: "Connect with other book lovers and discover what they're reading to expand your literary horizons."
    },
    {
      icon: MessageSquare,
      title: "Share Your Thoughts",
      description: "Post book reviews, thoughts, and recommendations to engage with the reading community."
    },
    {
      icon: Heart,
      title: "Like & Comment",
      description: "Interact with posts from other readers through likes and meaningful conversations."
    },
    {
      icon: Search,
      title: "Explore New Books",
      description: "Discover new genres, authors, and hidden gems recommended by your reading community."
    },
    {
      icon: MessageCircle,
      title: "Chat with Readers",
      description: "Connect one-on-one with fellow book enthusiasts to discuss your favorite stories."
    },
    {
      icon: Library,
      title: "Build Your Virtual Bookshelf",
      description: "Create a beautiful digital library that showcases your reading history and future reads."
    },
    {
      icon: Bell,
      title: "Stay Connected",
      description: "Get notifications for likes, comments, and follow requests to never miss a connection."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent via-background to-secondary">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="flex justify-center mb-8">
          <BookOpen className="h-16 w-16 text-primary" />
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6 leading-tight">
          Welcome to <span className="text-primary">BookMates</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
          Join a community of passionate readers who track their books, share discoveries, and connect over the stories that move them. Your reading journey starts here.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg">
            <Link to="/signup">Start Your Journey</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="px-8 py-3 text-lg border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            <Link to="/login">Sign In</Link>
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-4">
          Everything You Need for Your Reading Life
        </h2>
        <p className="text-center text-muted-foreground mb-12 text-lg max-w-2xl mx-auto">
          Discover powerful features designed to enhance your reading experience and connect you with fellow book lovers.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-0 bg-card">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-full bg-primary/10">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-primary mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="bg-primary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Quote className="h-12 w-12 text-primary mx-auto mb-6" />
            <blockquote className="text-2xl md:text-3xl font-medium text-primary mb-6 leading-relaxed italic">
              "BookMates has completely transformed how I discover and track my reading. The community is incredibly welcoming, and I've found so many amazing books through other readers' recommendations!"
            </blockquote>
            <div className="flex justify-center items-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-5 w-5 fill-primary text-primary" />
              ))}
            </div>
            <cite className="text-muted-foreground text-lg">
              — Sarah M., BookMates Community Member
            </cite>
          </div>
        </div>
      </div>

      {/* Final Call-to-Action */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
          Ready to Begin Your Reading Adventure?
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of readers who are already tracking their books, sharing their thoughts, and discovering their next great read.
        </p>
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg">
          <Link to="/signup">Join BookMates Today</Link>
        </Button>
      </div>

      {/* Footer */}
      <footer className="bg-muted py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold text-primary">BookMates</span>
          </div>
          <p className="text-muted-foreground">
            © 2024 BookMates. Building a community of readers, one book at a time.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
