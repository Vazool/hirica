import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  CheckCircle, 
  MessageSquare, 
  BarChart3, 
  Briefcase, 
  TrendingUp, 
  Users, 
  Target, 
  Award,
  ArrowRight
} from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="min-h-[80vh] flex items-center justify-center px-6 py-16">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                  Master Your Skills,
                  <br />
                  <span className="text-primary">Land Your Dream Job</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-xl">
                  Hirica transforms graduate job hunting through gamified assessments, AI-powered mock interviews, and intelligent employer matching. Practice, improve, and get hired.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Link href="/student/signup" data-testid="link-student-signup">
                  <Button size="lg" className="gap-2" data-testid="button-student-signup">
                    I'm a Graduate
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/employer/signup" data-testid="link-employer-signup">
                  <Button size="lg" variant="outline" className="gap-2" data-testid="button-employer-signup">
                    I'm an Employer
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-8 lg:p-12">
                <div className="grid grid-cols-2 gap-6">
                  <Card className="hover-elevate">
                    <CardContent className="p-6 space-y-2">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground">Skill Assessments</h3>
                      <p className="text-sm text-muted-foreground">Gamified tests that measure your abilities</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover-elevate">
                    <CardContent className="p-6 space-y-2">
                      <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                        <MessageSquare className="w-6 h-6 text-accent-foreground" />
                      </div>
                      <h3 className="font-semibold text-foreground">AI Interviews</h3>
                      <p className="text-sm text-muted-foreground">Practice with intelligent feedback</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover-elevate">
                    <CardContent className="p-6 space-y-2">
                      <div className="w-12 h-12 rounded-lg bg-chart-2/20 flex items-center justify-center">
                        <BarChart3 className="w-6 h-6 text-chart-2" />
                      </div>
                      <h3 className="font-semibold text-foreground">Progress Tracking</h3>
                      <p className="text-sm text-muted-foreground">Monitor your improvement</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover-elevate">
                    <CardContent className="p-6 space-y-2">
                      <div className="w-12 h-12 rounded-lg bg-chart-3/20 flex items-center justify-center">
                        <Briefcase className="w-6 h-6 text-chart-3" />
                      </div>
                      <h3 className="font-semibold text-foreground">Get Matched</h3>
                      <p className="text-sm text-muted-foreground">Connect with top employers</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to accelerate your career journey
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover-elevate">
              <CardContent className="p-8 space-y-4">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">1. Assess</h3>
                <p className="text-muted-foreground">
                  Take gamified skills assessments that evaluate your technical abilities, problem-solving, and soft skills.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover-elevate">
              <CardContent className="p-8 space-y-4">
                <div className="w-16 h-16 rounded-xl bg-accent/20 flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-accent-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">2. Practice</h3>
                <p className="text-muted-foreground">
                  Use AI-powered mock interviews to refine your responses and build confidence before the real thing.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover-elevate">
              <CardContent className="p-8 space-y-4">
                <div className="w-16 h-16 rounded-xl bg-chart-2/20 flex items-center justify-center">
                  <Briefcase className="w-8 h-8 text-chart-2" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">3. Get Hired</h3>
                <p className="text-muted-foreground">
                  Get matched with employers looking for candidates with your exact skill set and potential.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Everything You Need to Succeed</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools designed to showcase your talents and connect you with opportunities
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Award, title: 'Gamified Assessments', description: 'Engaging skill tests that feel more like challenges than exams' },
              { icon: MessageSquare, title: 'AI Mock Interviews', description: 'Practice with intelligent AI that provides detailed feedback' },
              { icon: BarChart3, title: 'Skills Tracking', description: 'Visualize your progress and identify areas for improvement' },
              { icon: Users, title: 'Employer Matching', description: 'Get discovered by companies seeking your unique talents' },
              { icon: TrendingUp, title: 'Progress Analytics', description: 'Deep insights into your performance and growth over time' },
              { icon: CheckCircle, title: 'Behavioral Insights', description: 'Understand your work style and personality strengths' },
            ].map((feature, index) => (
              <Card key={index} className="hover-elevate">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-24 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Trusted by Graduates & Employers</h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground">What Students Say</h3>
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-6 space-y-2">
                    <p className="text-foreground italic">"Hirica helped me identify my weak areas and practice until I felt confident. Landed my dream job in just 2 months!"</p>
                    <p className="text-sm text-muted-foreground">— Sarah Chen, Software Engineer</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 space-y-2">
                    <p className="text-foreground italic">"The AI mock interviews were invaluable. I went into real interviews feeling prepared and calm."</p>
                    <p className="text-sm text-muted-foreground">— Marcus Johnson, Data Analyst</p>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground">What Employers Say</h3>
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-6 space-y-2">
                    <p className="text-foreground italic">"Hirica candidates are pre-vetted and ready to contribute from day one. It's revolutionized our hiring process."</p>
                    <p className="text-sm text-muted-foreground">— Jennifer Adams, HR Director at TechCorp</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 space-y-2">
                    <p className="text-foreground italic">"The matching algorithm saved us weeks of screening. We found the perfect candidates quickly."</p>
                    <p className="text-sm text-muted-foreground">— David Park, Talent Acquisition Lead</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of graduates who have transformed their careers with Hirica
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/student/signup" data-testid="link-student-signup-footer">
              <Button size="lg" className="gap-2" data-testid="button-student-signup-footer">
                Get Started as a Graduate
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/employer/signup" data-testid="link-employer-signup-footer">
              <Button size="lg" variant="outline" className="gap-2" data-testid="button-employer-signup-footer">
                Find Top Talent
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-primary">Hirica</h3>
              <p className="text-sm text-muted-foreground">
                Empowering graduates to showcase their potential and connect with opportunity.
              </p>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">For Graduates</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/student/signup" className="hover:text-primary">Sign Up</Link></li>
                <li><Link href="/student/signin" className="hover:text-primary">Sign In</Link></li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">For Employers</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/employer/signup" className="hover:text-primary">Sign Up</Link></li>
                <li><Link href="/employer/signin" className="hover:text-primary">Sign In</Link></li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>About Us</li>
                <li>Contact</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Hirica. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
