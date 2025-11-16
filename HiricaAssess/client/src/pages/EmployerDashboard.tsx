import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { 
  Briefcase, 
  Search, 
  LogOut,
  Target,
  TrendingUp,
  Mail
} from 'lucide-react';

const MOCK_CANDIDATES = [
  {
    id: '1',
    name: 'Sarah Chen',
    matchPercentage: 94,
    keySkills: ['JavaScript', 'React', 'Problem Solving', 'Team Leadership'],
    initials: 'SC',
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    matchPercentage: 89,
    keySkills: ['Python', 'Data Analysis', 'Communication', 'Critical Thinking'],
    initials: 'MJ',
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    matchPercentage: 87,
    keySkills: ['UI/UX Design', 'Figma', 'Teamwork', 'Creativity'],
    initials: 'ER',
  },
  {
    id: '4',
    name: 'David Park',
    matchPercentage: 85,
    keySkills: ['Java', 'Spring Boot', 'Agile', 'Problem Solving'],
    initials: 'DP',
  },
  {
    id: '5',
    name: 'Priya Patel',
    matchPercentage: 82,
    keySkills: ['Full Stack', 'Node.js', 'MongoDB', 'Communication'],
    initials: 'PP',
  },
];

export default function EmployerDashboard() {
  const { employerProfile, signOut } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [jobDescription, setJobDescription] = useState('');
  const [candidates, setCandidates] = useState<typeof MOCK_CANDIDATES>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateMatch = async () => {
    if (!jobDescription.trim() || jobDescription.trim().length < 50) {
      toast({
        title: 'Job description required',
        description: 'Please provide a detailed job description (at least 50 characters).',
        variant: 'destructive',
      });
      return;
    }

    setIsGenerating(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setCandidates(MOCK_CANDIDATES);
    setIsGenerating(false);
    
    toast({
      title: 'Candidates Matched!',
      description: `Found ${MOCK_CANDIDATES.length} qualified candidates for your role.`,
    });
  };

  const handleSignOut = () => {
    signOut();
    setLocation('/');
  };

  if (!employerProfile) return null;

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-background border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <h1 className="text-xl font-bold text-primary cursor-pointer">Hirica</h1>
              </Link>
              <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                <Briefcase className="w-4 h-4" />
                <span>Employer Portal</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium text-foreground">{employerProfile.companyName}</p>
                <p className="text-xs text-muted-foreground">{employerProfile.email}</p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2"
                onClick={handleSignOut}
                data-testid="button-sign-out"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-foreground">Candidate Matching</h2>
          <p className="text-muted-foreground">
            Find the perfect candidates for your open positions using AI-powered matching
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Job Description</CardTitle>
            <CardDescription>
              Describe the role, required skills, and ideal candidate profile
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="job-description">
                Paste or type your job description
              </Label>
              <Textarea
                id="job-description"
                placeholder="We're looking for a Full Stack Developer with 2+ years of experience in React and Node.js. The ideal candidate should be proficient in..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="min-h-48 resize-y"
                data-testid="textarea-job-description"
              />
              <p className="text-xs text-muted-foreground">
                {jobDescription.length} characters (minimum 50 recommended)
              </p>
            </div>

            <Button
              onClick={handleGenerateMatch}
              disabled={isGenerating}
              className="gap-2"
              size="lg"
              data-testid="button-generate-match"
            >
              <Search className="w-4 h-4" />
              {isGenerating ? 'Finding Candidates...' : 'Generate Match'}
            </Button>
          </CardContent>
        </Card>

        {candidates.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-foreground">
                Top Candidates ({candidates.length})
              </h3>
              <Badge variant="outline" className="gap-2">
                <TrendingUp className="w-3 h-3" />
                Sorted by Match Score
              </Badge>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {candidates.map((candidate, index) => (
                <Card key={candidate.id} className="hover-elevate" data-testid={`card-candidate-${index}`}>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-16 h-16">
                        <AvatarFallback className="text-lg font-bold bg-primary/10 text-primary">
                          {candidate.initials}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 space-y-1">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h4 className="font-semibold text-lg text-foreground" data-testid={`text-candidate-name-${index}`}>
                              {candidate.name}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Recent Graduate
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1">
                              <Target className="w-4 h-4 text-accent-foreground" />
                              <span className="text-2xl font-bold text-accent-foreground" data-testid={`text-match-percentage-${index}`}>
                                {candidate.matchPercentage}%
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground">Match</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium text-foreground">Key Skills:</p>
                      <div className="flex flex-wrap gap-2">
                        {candidate.keySkills.map((skill, skillIndex) => (
                          <Badge 
                            key={skillIndex}
                            variant="outline"
                            className="bg-primary/5"
                            data-testid={`skill-${index}-${skillIndex}`}
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button className="flex-1 gap-2" data-testid={`button-view-profile-${index}`}>
                        View Full Profile
                      </Button>
                      <Button variant="outline" size="icon" data-testid={`button-contact-${index}`}>
                        <Mail className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <div className="text-center space-y-2">
                  <h4 className="font-semibold text-foreground">Want to refine your search?</h4>
                  <p className="text-sm text-muted-foreground">
                    Update the job description above and generate new matches
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {candidates.length === 0 && (
          <Card className="bg-muted/50">
            <CardContent className="p-12 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <Search className="w-8 h-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">No candidates yet</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Enter a job description above and click "Generate Match" to find the perfect candidates for your role
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
