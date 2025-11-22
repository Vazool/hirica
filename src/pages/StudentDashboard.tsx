import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import StudentLayout from '../components/StudentLayout';
import { Target, Award, TrendingUp } from 'lucide-react';

export default function StudentDashboard() {
  const navigate = useNavigate();
  const { studentProfile } = useAppContext();

  if (!studentProfile) {
    return null;
  }

  const testAreas = [
    { key: 'verbal', label: 'Verbal Reasoning', score: studentProfile.testScores.verbal },
    { key: 'numerical', label: 'Numerical Reasoning', score: studentProfile.testScores.numerical },
    { key: 'logical', label: 'Logical/Abstract Reasoning', score: studentProfile.testScores.logical },
    { key: 'diagrammatic', label: 'Diagrammatic Reasoning', score: studentProfile.testScores.diagrammatic },
    { key: 'critical', label: 'Critical Thinking', score: studentProfile.testScores.critical },
    { key: 'situational', label: 'Situational Judgement', score: studentProfile.testScores.situational },
  ];

  return (
    <StudentLayout>
      <div className="max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome back, {studentProfile.name}
          </h1>
          <p className="text-gray-600">{studentProfile.degree}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#1E3A8A]">
            <div className="flex items-center gap-3 mb-2">
              <Target className="w-6 h-6 text-[#1E3A8A]" />
              <h3 className="font-semibold text-gray-800">Assessments</h3>
            </div>
            <p className="text-2xl font-bold text-[#1E3A8A]">6</p>
            <p className="text-sm text-gray-600">Core areas available</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#499F68]">
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-6 h-6 text-[#499F68]" />
              <h3 className="font-semibold text-gray-800">Skills Badges</h3>
            </div>
            <p className="text-2xl font-bold text-[#499F68]">{studentProfile.skillBadges.length}</p>
            <p className="text-sm text-gray-600">Earned badges</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#B4654A]">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-6 h-6 text-[#B4654A]" />
              <h3 className="font-semibold text-gray-800">Progress</h3>
            </div>
            <p className="text-2xl font-bold text-[#B4654A]">
              {Math.round((testAreas.filter(t => t.score !== null).length / testAreas.length) * 100)}%
            </p>
            <p className="text-sm text-gray-600">Completion rate</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1E3A8A] to-[#2c4fa5] rounded-xl shadow-lg p-8 mb-8 text-white">
          <h2 className="text-2xl font-bold mb-3">Start Skills Assessment</h2>
          <p className="mb-6 text-blue-100">
            Complete assessments across 6 core competency areas to build your verified skills profile.
          </p>
          <button
            onClick={() => navigate('/student/assessment')}
            className="bg-white text-[#1E3A8A] px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Begin Assessment
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-[#499F68] mb-4">Soft Skill Badges</h3>
            <div className="flex flex-wrap gap-2">
              {studentProfile.skillBadges.map((badge, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-[#77B28C] text-white rounded-full text-sm font-medium"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-[#499F68] mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/student/mock-interview')}
                className="w-full text-left px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-[#1E3A8A] hover:bg-blue-50 transition-colors"
              >
                <div className="font-semibold text-gray-800">Practice Mock Interview</div>
                <div className="text-sm text-gray-600">Get AI-powered feedback</div>
              </button>
              <button
                onClick={() => navigate('/student/profile')}
                className="w-full text-left px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-[#1E3A8A] hover:bg-blue-50 transition-colors"
              >
                <div className="font-semibold text-gray-800">View Profile Summary</div>
                <div className="text-sm text-gray-600">See your complete profile</div>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Core Test Areas Progress</h3>
          <div className="space-y-4">
            {testAreas.map((area) => (
              <div key={area.key}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-700">{area.label}</span>
                  <span className="text-sm font-semibold text-[#1E3A8A]">
                    {area.score !== null ? `${area.score}/10` : 'Not started'}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-[#1E3A8A] h-3 rounded-full transition-all"
                    style={{ width: `${area.score !== null ? (area.score / 10) * 100 : 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
