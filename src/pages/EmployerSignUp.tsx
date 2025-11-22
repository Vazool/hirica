import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase } from 'lucide-react';

export default function EmployerSignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    recruiterName: '',
    email: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Briefcase className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Sign-up Request Received</h2>
          <p className="text-gray-600 mb-6">
            Please check your email to complete your registration.
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-[#499F68] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#3d8556] transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Briefcase className="w-10 h-10 text-[#499F68]" />
            <h1 className="text-3xl font-bold text-[#499F68]">Hirica</h1>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Employer Sign Up</h2>
          <p className="text-gray-600 mt-2">Find verified talent for your organization</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Company Name
              </label>
              <input
                type="text"
                required
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#499F68] focus:outline-none transition-colors"
                placeholder="Enter your company name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Recruiter Name
              </label>
              <input
                type="text"
                required
                value={formData.recruiterName}
                onChange={(e) => setFormData({ ...formData, recruiterName: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#499F68] focus:outline-none transition-colors"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#499F68] focus:outline-none transition-colors"
                placeholder="your.email@company.com"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#499F68] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#3d8556] transition-colors"
            >
              Continue to Dashboard
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/employer/signin')}
                className="text-[#499F68] font-semibold hover:underline"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
