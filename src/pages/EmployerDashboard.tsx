import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { MOCK_CANDIDATES } from '../data/mockData';
import { Briefcase, LogOut, Search, Award } from 'lucide-react';

export default function EmployerDashboard() {
  const navigate = useNavigate();
  const { employerProfile, setEmployerProfile } = useAppContext();
  const [jobDescription, setJobDescription] = useState('');
  const [showResults, setShowResults] = useState(false);

  if (!employerProfile) {
    return null;
  }

  const handleGenerateMatch = () => {
    if (jobDescription.trim()) {
      setShowResults(true);
    }
  };

  const handleSignOut = () => {
    setEmployerProfile(null);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Briefcase className="w-8 h-8 text-[#499F68]" />
              <div>
                <h1 className="text-2xl font-bold text-[#499F68]">Hirica</h1>
                <p className="text-sm text-gray-600">{employerProfile.companyName}</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-8 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome, {employerProfile.recruiterName}
            </h2>
            <p className="text-gray-600">Find the perfect candidates for your open positions</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Search className="w-6 h-6 text-[#499F68]" />
              <h3 className="text-xl font-bold text-gray-800">Candidate Matching</h3>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Job Description
              </label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste your job description here to find the best matching candidates..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#499F68] focus:outline-none transition-colors resize-none"
                rows={6}
              />
            </div>

            <button
              onClick={handleGenerateMatch}
              disabled={!jobDescription.trim()}
              className="bg-[#499F68] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#3d8556] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Generate Match
            </button>
          </div>

          {showResults && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Top Matching Candidates</h3>
              <div className="space-y-4">
                {MOCK_CANDIDATES.map((candidate) => (
                  <div
                    key={candidate.id}
                    className="border-2 border-gray-200 rounded-xl p-6 hover:border-[#499F68] transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg font-bold text-gray-800">{candidate.name}</h4>
                          <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full">
                            {candidate.matchScore}% Match
                          </span>
                        </div>
                        <p className="text-gray-600 mb-3">{candidate.degree}</p>
                        <div className="flex flex-wrap gap-2">
                          {candidate.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-[#77B28C] text-white text-sm rounded-full flex items-center gap-1"
                            >
                              <Award className="w-3 h-3" />
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex-shrink-0 ml-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-[#499F68] to-[#77B28C] rounded-full flex items-center justify-center">
                          <span className="text-2xl font-bold text-white">{candidate.matchScore}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button className="flex-1 bg-[#499F68] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#3d8556] transition-colors">
                        View Full Profile
                      </button>
                      <button className="flex-1 border-2 border-[#499F68] text-[#499F68] px-4 py-2 rounded-lg font-semibold hover:bg-green-50 transition-colors">
                        Contact Candidate
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!showResults && (
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#499F68]">
                <h4 className="font-semibold text-gray-800 mb-2">Total Candidates</h4>
                <p className="text-3xl font-bold text-[#499F68]">{MOCK_CANDIDATES.length}</p>
                <p className="text-sm text-gray-600 mt-1">Available for matching</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#1E3A8A]">
                <h4 className="font-semibold text-gray-800 mb-2">Verified Skills</h4>
                <p className="text-3xl font-bold text-[#1E3A8A]">6</p>
                <p className="text-sm text-gray-600 mt-1">Core competency areas</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#B4654A]">
                <h4 className="font-semibold text-gray-800 mb-2">Avg Match Score</h4>
                <p className="text-3xl font-bold text-[#B4654A]">84%</p>
                <p className="text-sm text-gray-600 mt-1">Typical match rate</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
