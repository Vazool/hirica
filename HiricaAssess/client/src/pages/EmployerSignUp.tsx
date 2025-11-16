import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { signUpSchema, type SignUp } from '@shared/schema';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Briefcase } from 'lucide-react';

export default function EmployerSignUp() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignUp>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      companyName: '',
      accountType: 'employer',
    },
  });

  async function onSubmit(values: SignUp) {
    setIsLoading(true);
    
    setTimeout(() => {
      toast({
        title: 'Account created successfully!',
        description: 'Welcome to Hirica. You can now sign in.',
      });
      setIsLoading(false);
      setLocation('/employer/signin');
    }, 1000);
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <Link href="/">
            <h1 className="text-2xl font-bold text-primary cursor-pointer">Hirica</h1>
          </Link>
          <div className="flex items-center justify-center gap-2">
            <Briefcase className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Employer Sign Up</h2>
          </div>
          <p className="text-muted-foreground">Find your next star employee</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Create Company Account</CardTitle>
            <CardDescription>Access top-tier graduate talent</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Acme Corp" 
                          {...field}
                          data-testid="input-company-name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Person</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="John Doe" 
                          {...field}
                          data-testid="input-name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          type="email"
                          placeholder="hr@company.com" 
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

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input 
                          type="password"
                          placeholder="••••••••" 
                          {...field}
                          data-testid="input-confirm-password"
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
                  {isLoading ? 'Creating account...' : 'Create Account'}
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center text-sm">
              <p className="text-muted-foreground">
                Already have an account?{' '}
                <Link href="/employer/signin" className="text-primary hover:underline" data-testid="link-signin">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
