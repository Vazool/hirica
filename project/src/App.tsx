import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import LandingPage from './pages/LandingPage';
import StudentSignUp from './pages/StudentSignUp';
import StudentSignIn from './pages/StudentSignIn';
import StudentDashboard from './pages/StudentDashboard';
import ProfileSummary from './pages/ProfileSummary';
import GamifiedAssessment from './pages/GamifiedAssessment';
import MockInterview from './pages/MockInterview';
import FeedbackPage from './pages/FeedbackPage';
import EmployerSignUp from './pages/EmployerSignUp';
import EmployerSignIn from './pages/EmployerSignIn';
import EmployerDashboard from './pages/EmployerDashboard';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/student/signup" element={<StudentSignUp />} />
          <Route path="/student/signin" element={<StudentSignIn />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/profile" element={<ProfileSummary />} />
          <Route path="/student/assessment" element={<GamifiedAssessment />} />
          <Route path="/student/mock-interview" element={<MockInterview />} />
          <Route path="/student/feedback" element={<FeedbackPage />} />
          <Route path="/employer/signup" element={<EmployerSignUp />} />
          <Route path="/employer/signin" element={<EmployerSignIn />} />
          <Route path="/employer/dashboard" element={<EmployerDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
