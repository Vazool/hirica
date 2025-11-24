import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Briefcase } from 'lucide-react';

export default function EmployerSignIn() {
  const navigate = useNavigate();
  const { setEmployerProfile } = useAppContext();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (email === 'hr@rocksupplies.com') {
      setEmployerProfile({
        companyName: 'Rock Supplies Ltd',
        recruiterName: 'Rocky McRockface',
        email: 'hr@rocksupplies.com',
      });
      navigate('/employer/dashboard');
    } else {
      setError('Invalid test account');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Briefcase className="w-10 h-10 text-[#499F68]" />
            <h1 className="text-3xl font-bold text-[#499F68]">Hirica</h1>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Employer Sign In</h2>
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
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#499F68] focus:outline-none transition-colors"
                placeholder="hr@rocksupplies.com"
              />
              {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#499F68] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#3d8556] transition-colors"
            >
              Enter Dashboard
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/employer/signup')}
                className="text-[#499F68] font-semibold hover:underline"
              >
                Sign up
              </button>
            </p>
          </div>

          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <p className="text-xs text-gray-600 text-center">
              Test account: hr@rocksupplies.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
