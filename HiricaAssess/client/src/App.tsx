import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import NotFound from "@/pages/not-found";

import Landing from "@/pages/Landing";
import StudentSignUp from "@/pages/StudentSignUp";
import StudentSignIn from "@/pages/StudentSignIn";
import StudentDashboard from "@/pages/StudentDashboard";
import StudentProfile from "@/pages/StudentProfile";
import SkillsAssessment from "@/pages/SkillsAssessment";
import MockInterview from "@/pages/MockInterview";
import Feedback from "@/pages/Feedback";
import EmployerSignUp from "@/pages/EmployerSignUp";
import EmployerSignIn from "@/pages/EmployerSignIn";
import EmployerDashboard from "@/pages/EmployerDashboard";

function Router() {
  const { isAuthenticated, accountType } = useAuth();

  function ProtectedStudentRoute({ component: Component }: { component: React.ComponentType }) {
    if (!isAuthenticated || accountType !== 'student') {
      return <Redirect to="/student/signin" />;
    }
    return <Component />;
  }

  function ProtectedEmployerRoute({ component: Component }: { component: React.ComponentType }) {
    if (!isAuthenticated || accountType !== 'employer') {
      return <Redirect to="/employer/signin" />;
    }
    return <Component />;
  }

  return (
    <Switch>
      <Route path="/" component={Landing} />
      
      <Route path="/student/signup" component={StudentSignUp} />
      <Route path="/student/signin" component={StudentSignIn} />
      <Route path="/student/dashboard">
        {() => <ProtectedStudentRoute component={StudentDashboard} />}
      </Route>
      <Route path="/student/profile">
        {() => <ProtectedStudentRoute component={StudentProfile} />}
      </Route>
      <Route path="/student/assessments">
        {() => <ProtectedStudentRoute component={SkillsAssessment} />}
      </Route>
      <Route path="/student/mock-interview">
        {() => <ProtectedStudentRoute component={MockInterview} />}
      </Route>
      <Route path="/student/feedback">
        {() => <ProtectedStudentRoute component={Feedback} />}
      </Route>
      
      <Route path="/employer/signup" component={EmployerSignUp} />
      <Route path="/employer/signin" component={EmployerSignIn} />
      <Route path="/employer/dashboard">
        {() => <ProtectedEmployerRoute component={EmployerDashboard} />}
      </Route>
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Router />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
