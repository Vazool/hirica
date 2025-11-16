import { Link } from 'wouter';
import { StudentLayout } from '@/components/StudentLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  ClipboardCheck, 
  Trophy, 
  Target, 
  Calendar,
  TrendingUp,
  ArrowRight,
  Clock
} from 'lucide-react';

export default function StudentDashboard() {
  const { studentProfile } = useAuth();

  if (!studentProfile) return null;

  const recentActivities = [
    { type: 'assessment', title: 'Completed JavaScript Assessment', time: '2 hours ago', icon: ClipboardCheck },
    { type: 'interview', title: 'Practiced Mock Interview', time: '1 day ago', icon: Calendar },
    { type: 'achievement', title: 'Earned "Quick Learner" Badge', time: '2 days ago', icon: Trophy },
  ];

  return (
    <StudentLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Track your progress and continue your journey</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover-elevate">
            <CardContent className="p-6 space-y-2">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <ClipboardCheck className="w-6 h-6 text-primary" />
                </div>
                <span className="text-3xl font-bold text-foreground" data-testid="text-assessments-completed">
                  {studentProfile.assessmentsCompleted}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Assessments Completed</p>
                <p className="text-xs text-muted-foreground">Keep up the momentum!</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-elevate">
            <CardContent className="p-6 space-y-2">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-accent-foreground" />
                </div>
                <span className="text-3xl font-bold text-foreground" data-testid="text-average-score">
                  {studentProfile.assessmentScore}%
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Average Score</p>
                <p className="text-xs text-muted-foreground">+5% from last week</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-elevate">
            <CardContent className="p-6 space-y-2">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-lg bg-chart-2/20 flex items-center justify-center">
                  <Target className="w-6 h-6 text-chart-2" />
                </div>
                <span className="text-3xl font-bold text-foreground" data-testid="text-skills-mastered">
                  {studentProfile.skillsMastered}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Skills Mastered</p>
                <p className="text-xs text-muted-foreground">Across all domains</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-elevate">
            <CardContent className="p-6 space-y-2">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-lg bg-chart-3/20 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-chart-3" />
                </div>
                <span className="text-3xl font-bold text-foreground" data-testid="text-upcoming-interviews">
                  {studentProfile.upcomingInterviews}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Upcoming Interviews</p>
                <p className="text-xs text-muted-foreground">Scheduled this week</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-lg hover-elevate"
                  data-testid={`activity-${index}`}
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <activity.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium text-foreground">{activity.title}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/student/assessments" data-testid="link-take-assessment">
                <Button className="w-full gap-2 justify-between" data-testid="button-take-assessment">
                  <span>Take Assessment</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/student/mock-interview" data-testid="link-practice-interview">
                <Button variant="outline" className="w-full gap-2 justify-between" data-testid="button-practice-interview">
                  <span>Practice Interview</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/student/feedback" data-testid="link-view-feedback">
                <Button variant="outline" className="w-full gap-2 justify-between" data-testid="button-view-feedback">
                  <span>View Feedback</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {studentProfile.skills.map((skill, index) => (
                <div 
                  key={index}
                  className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium"
                  data-testid={`skill-${index}`}
                >
                  {skill}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </StudentLayout>
  );
}
