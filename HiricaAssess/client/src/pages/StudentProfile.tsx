import { StudentLayout } from '@/components/StudentLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Mail, GraduationCap, Calendar, Award } from 'lucide-react';

export default function StudentProfile() {
  const { studentProfile } = useAuth();

  if (!studentProfile) return null;

  const initials = studentProfile.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <StudentLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Profile</h1>
          <p className="text-muted-foreground">Manage your profile information</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardContent className="p-6 space-y-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <Avatar className="w-24 h-24">
                  <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h3 className="font-semibold text-lg text-foreground" data-testid="text-profile-name">
                    {studentProfile.name}
                  </h3>
                  <p className="text-sm text-muted-foreground" data-testid="text-profile-email">
                    {studentProfile.email}
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-6 border-t">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">University</p>
                    <p className="text-sm font-medium text-foreground">{studentProfile.university}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                    <Award className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Degree</p>
                    <p className="text-sm font-medium text-foreground">{studentProfile.degree}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-chart-2/20 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-chart-2" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Graduation Year</p>
                    <p className="text-sm font-medium text-foreground">{studentProfile.graduationYear}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Edit Profile</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    defaultValue={studentProfile.name}
                    data-testid="input-name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input 
                      id="email" 
                      type="email"
                      className="pl-10"
                      defaultValue={studentProfile.email}
                      data-testid="input-email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="university">University</Label>
                  <Input 
                    id="university" 
                    defaultValue={studentProfile.university}
                    data-testid="input-university"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="degree">Degree</Label>
                    <Input 
                      id="degree" 
                      defaultValue={studentProfile.degree}
                      data-testid="input-degree"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="year">Graduation Year</Label>
                    <Input 
                      id="year" 
                      defaultValue={studentProfile.graduationYear}
                      data-testid="input-graduation-year"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button data-testid="button-save-changes">
                  Save Changes
                </Button>
                <Button variant="outline" data-testid="button-cancel">
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Skills</CardTitle>
            <CardDescription>Skills identified from your assessments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {studentProfile.skills.map((skill, index) => (
                <div 
                  key={index}
                  className="px-4 py-2 rounded-lg bg-primary/10 text-primary font-medium"
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
