import { useNavigate } from 'react-router-dom';
import { GraduationCap, Briefcase } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <GraduationCap className="w-12 h-12 text-[#1E3A8A]" />
            <h1 className="text-5xl font-bold text-[#1E3A8A]">Hirica</h1>
          </div>
          <p className="text-2xl text-[#499F68] font-semibold">Level-up. Get hired.</p>
        </header>

        <div className="max-h-[35vh] mb-16 bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-12 shadow-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Prove Your Skills Once, Share With Everyone
            </h2>
            <p className="text-lg text-gray-600">
              Hirica is the gamified assessment platform that helps students demonstrate their graduate skills
              through engaging challenges and AI-powered feedback, then share verified results with employers.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-gray-100 hover:border-[#1E3A8A] transition-all">
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap className="w-8 h-8 text-[#1E3A8A]" />
                <h3 className="text-2xl font-bold text-gray-800">Students</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Complete gamified assessments, get AI feedback, and build a verified skills profile to share with employers.
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/student/signup')}
                  className="w-full bg-[#1E3A8A] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#2c4fa5] transition-colors"
                >
                  Sign up as Student
                </button>
                <button
                  onClick={() => navigate('/student/signin')}
                  className="w-full border-2 border-[#1E3A8A] text-[#1E3A8A] px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  Sign in as Student
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-gray-100 hover:border-[#499F68] transition-all">
              <div className="flex items-center gap-3 mb-6">
                <Briefcase className="w-8 h-8 text-[#499F68]" />
                <h3 className="text-2xl font-bold text-gray-800">Employers</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Access verified candidate profiles, match job requirements, and discover top talent with confidence.
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/employer/signup')}
                  className="w-full bg-[#499F68] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#3d8556] transition-colors"
                >
                  Sign up as Employer
                </button>
                <button
                  onClick={() => navigate('/employer/signin')}
                  className="w-full border-2 border-[#499F68] text-[#499F68] px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
                >
                  Sign in as Employer
                </button>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#499F68]/10 to-[#77B28C]/10 rounded-xl p-8 shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">How It Works</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="w-10 h-10 bg-[#1E3A8A] text-white rounded-full flex items-center justify-center font-bold mb-3">1</div>
                <h4 className="font-semibold text-gray-800 mb-2">Assess</h4>
                <p className="text-sm text-gray-600">Complete gamified assessments across 6 core competency areas</p>
              </div>
              <div>
                <div className="w-10 h-10 bg-[#499F68] text-white rounded-full flex items-center justify-center font-bold mb-3">2</div>
                <h4 className="font-semibold text-gray-800 mb-2">Improve</h4>
                <p className="text-sm text-gray-600">Get AI-powered feedback and practice with mock interviews</p>
              </div>
              <div>
                <div className="w-10 h-10 bg-[#B4654A] text-white rounded-full flex items-center justify-center font-bold mb-3">3</div>
                <h4 className="font-semibold text-gray-800 mb-2">Share</h4>
                <p className="text-sm text-gray-600">Share your verified profile with employers and get hired</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
