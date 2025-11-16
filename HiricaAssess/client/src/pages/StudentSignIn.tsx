import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { signInSchema, type SignIn } from '@shared/schema';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { GraduationCap } from 'lucide-react';

export default function StudentSignIn() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignIn>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: SignIn) {
    setIsLoading(true);
    
    const success = await signIn(values.email, values.password, 'student');
    
    setIsLoading(false);
    
    if (success) {
      toast({
        title: 'Welcome back!',
        description: 'You have successfully signed in.',
      });
      setLocation('/student/dashboard');
    } else {
      toast({
        title: 'Invalid credentials',
        description: 'Use test account: fred.flintstone@bedrock.com',
        variant: 'destructive',
      });
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <Link href="/">
            <h1 className="text-2xl font-bold text-primary cursor-pointer">Hirica</h1>
          </Link>
          <div className="flex items-center justify-center gap-2">
            <GraduationCap className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Student Sign In</h2>
          </div>
          <p className="text-muted-foreground">Welcome back! Continue your journey</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Test account: <span className="font-mono text-xs">fred.flintstone@bedrock.com</span> / password: <span className="font-mono text-xs">password</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          type="email"
                          placeholder="you@example.com" 
                          {...field}
                          data-testid="input-email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input 
                          type="password"
                          placeholder="••••••••" 
                          {...field}
                          data-testid="input-password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                  data-testid="button-submit"
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center text-sm">
              <p className="text-muted-foreground">
                Don't have an account?{' '}
                <Link href="/student/signup" className="text-primary hover:underline" data-testid="link-signup">
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
