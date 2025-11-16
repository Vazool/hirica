import { useState, useEffect } from 'react';
import { StudentLayout } from '@/components/StudentLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  Award,
  TrendingUp,
  Users,
  Target,
  Lightbulb,
  Share2,
  RefreshCw,
  Sparkles
} from 'lucide-react';

const SKILL_LEVELS = {
  communication: 85,
  problemSolving: 78,
  teamwork: 92,
  leadership: 70,
};

const BEHAVIORAL_BADGES = [
  { name: 'Team Player', icon: Users, color: 'bg-primary/10 text-primary' },
  { name: 'Quick Learner', icon: Lightbulb, color: 'bg-accent/20 text-accent-foreground' },
  { name: 'Goal Oriented', icon: Target, color: 'bg-chart-2/20 text-chart-2' },
  { name: 'Problem Solver', icon: TrendingUp, color: 'bg-chart-3/20 text-chart-3' },
];

async function generateAISummary(): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return `Based on your assessment results and mock interview performance, here are key insights about your professional profile:

**Key Strengths:**
Your teamwork and communication skills are exceptional, placing you in the top 15% of all candidates. You demonstrate a natural ability to collaborate effectively and articulate ideas clearly. Your problem-solving approach shows systematic thinking and creativity.

**Growth Opportunities:**
Leadership skills present an excellent area for development. Consider seeking opportunities to lead small projects or mentor junior team members to build this competency. Your technical knowledge is solid, but staying current with emerging technologies will further enhance your marketability.

**Career Recommendations:**
You're well-suited for roles that require strong collaboration and communication, such as Product Manager, UX Designer, or Technical Team Lead positions. Your skills profile aligns particularly well with agile development environments.

**Next Steps:**
1. Focus on leadership development through online courses or volunteer opportunities
2. Maintain your strong teamwork abilities - this is a key differentiator
3. Consider certifications in your target role to boost credibility
4. Practice technical interviews to build confidence in showcasing your problem-solving skills`;
}

export default function Feedback() {
  const { toast } = useToast();
  const [aiSummary, setAiSummary] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    handleGenerateSummary();
  }, []);

  const handleGenerateSummary = async () => {
    setIsGenerating(true);
    const summary = await generateAISummary();
    setAiSummary(summary);
    setIsGenerating(false);
  };

  const handleShare = () => {
    toast({
      title: 'Results Shared',
      description: 'Your feedback summary has been copied to clipboard.',
    });
  };

  const handleRetake = () => {
    toast({
      title: 'New Assessment Started',
      description: 'Redirecting to skills assessment...',
    });
  };

  return (
    <StudentLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Your Feedback</h1>
          <p className="text-muted-foreground">
            Comprehensive analysis of your skills and performance
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(SKILL_LEVELS).map(([skill, level]) => (
            <Card key={skill} className="hover-elevate">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground capitalize">
                    {skill.replace(/([A-Z])/g, ' $1').trim()}
                  </h3>
                  <Badge variant="outline" data-testid={`badge-${skill}`}>
                    {level}%
                  </Badge>
                </div>
                <div className="space-y-2">
                  <Progress value={level} className="h-2" data-testid={`progress-${skill}`} />
                  <p className="text-xs text-muted-foreground">
                    {level >= 85 ? 'Excellent' : level >= 70 ? 'Good' : 'Developing'}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Behavioral Badges
            </CardTitle>
            <CardDescription>Strengths identified from your assessments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {BEHAVIORAL_BADGES.map((badge, index) => (
                <Card key={index} className="hover-elevate">
                  <CardContent className="p-6 text-center space-y-3">
                    <div className={`w-16 h-16 mx-auto rounded-full ${badge.color} flex items-center justify-center`}>
                      <badge.icon className="w-8 h-8" />
                    </div>
                    <h4 className="font-semibold text-foreground" data-testid={`badge-name-${index}`}>
                      {badge.name}
                    </h4>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              AI-Generated Career Insights
            </CardTitle>
            <CardDescription>
              Personalized recommendations based on your performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isGenerating ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <p className="text-muted-foreground">Generating personalized insights...</p>
              </div>
            ) : (
              <div className="space-y-4" data-testid="text-ai-summary">
                {aiSummary.split('\n').map((line, index) => {
                  if (line.startsWith('**') && line.endsWith('**')) {
                    return (
                      <h3 key={index} className="font-semibold text-foreground mt-4">
                        {line.replace(/\*\*/g, '')}
                      </h3>
                    );
                  }
                  if (line.trim()) {
                    return (
                      <p key={index} className="text-foreground leading-relaxed">
                        {line}
                      </p>
                    );
                  }
                  return null;
                })}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex flex-wrap gap-4 justify-center">
          <Button className="gap-2" onClick={handleShare} data-testid="button-share">
            <Share2 className="w-4 h-4" />
            Share Results
          </Button>
          <Button variant="outline" className="gap-2" onClick={handleRetake} data-testid="button-retake">
            <RefreshCw className="w-4 h-4" />
            Retake Assessment
          </Button>
        </div>
      </div>
    </StudentLayout>
  );
}
