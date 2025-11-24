import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { GraduationCap } from 'lucide-react';

export default function StudentSignIn() {
  const navigate = useNavigate();
  const { setStudentProfile } = useAppContext();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (email === 'fred.flintstone@bedrock.com') {
      setStudentProfile({
        name: 'Fred Flintstone',
        email: 'fred.flintstone@bedrock.com',
        degree: 'BSc Computer Science',
        skillBadges: ['Team player', 'Goal-oriented', 'Quick learner', 'Problem solver'],
        testScores: {
          verbal: 7,
          numerical: 6,
          logical: 8,
          diagrammatic: 5,
          critical: 7,
          situational: 6,
        },
      });
      navigate('/student/dashboard');
    } else {
      setError('Invalid test account');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <GraduationCap className="w-10 h-10 text-[#1E3A8A]" />
            <h1 className="text-3xl font-bold text-[#1E3A8A]">Hirica</h1>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Student Sign In</h2>
          <p className="text-gray-600 mt-2">Welcome back!</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#1E3A8A] focus:outline-none transition-colors"
                placeholder="fred.flintstone@bedrock.com"
              />
              {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#1E3A8A] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#2c4fa5] transition-colors"
            >
              Enter Dashboard
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/student/signup')}
                className="text-[#1E3A8A] font-semibold hover:underline"
              >
                Sign up
              </button>
            </p>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-xs text-gray-600 text-center">
              Test account: fred.flintstone@bedrock.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
