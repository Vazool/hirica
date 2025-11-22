import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import StudentLayout from '../components/StudentLayout';
import { Share2, ArrowLeft, Award } from 'lucide-react';

export default function ProfileSummary() {
  const navigate = useNavigate();
  const { studentProfile } = useAppContext();

  if (!studentProfile) {
    return null;
  }

  const getBadgeOpacity = (score: number | null): string => {
    if (score === null || score === 0) return 'opacity-30 grayscale';
    if (score <= 2.5) return 'opacity-40';
    if (score <= 5) return 'opacity-60';
    if (score <= 7.5) return 'opacity-80';
    return 'opacity-100';
  };

  const testAreas = [
    { key: 'verbal', label: 'Verbal Reasoning', score: studentProfile.testScores.verbal, color: '#1E3A8A' },
    { key: 'numerical', label: 'Numerical Reasoning', score: studentProfile.testScores.numerical, color: '#499F68' },
    { key: 'logical', label: 'Logical Reasoning', score: studentProfile.testScores.logical, color: '#B4654A' },
    { key: 'diagrammatic', label: 'Diagrammatic Reasoning', score: studentProfile.testScores.diagrammatic, color: '#77B28C' },
    { key: 'critical', label: 'Critical Thinking', score: studentProfile.testScores.critical, color: '#1E3A8A' },
    { key: 'situational', label: 'Situational Judgement', score: studentProfile.testScores.situational, color: '#499F68' },
  ];

  return (
    <StudentLayout>
      <div className="max-w-4xl">
        <div className="mb-6">
          <button
            onClick={() => navigate('/student/dashboard')}
            className="flex items-center gap-2 text-[#1E3A8A] hover:underline font-medium mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-800">Profile Summary</h1>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{studentProfile.name}</h2>
              <p className="text-gray-600 mb-1">{studentProfile.email}</p>
              <p className="text-gray-600">{studentProfile.degree}</p>
            </div>
            <button className="flex items-center gap-2 bg-[#1E3A8A] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#2c4fa5] transition-colors">
              <Share2 className="w-4 h-4" />
              Share Profile
            </button>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Soft Skills Badges</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {studentProfile.skillBadges.map((badge, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-4 bg-gradient-to-br from-[#499F68] to-[#77B28C] rounded-xl text-white shadow-md"
                >
                  <Award className="w-8 h-8 mb-2" />
                  <span className="text-sm font-semibold text-center">{badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Core Competency Scores</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {testAreas.map((area) => (
              <div key={area.key} className="relative">
                <div className={`border-2 rounded-xl p-6 transition-all ${getBadgeOpacity(area.score)}`}>
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-semibold text-gray-800">{area.label}</h4>
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                      style={{ backgroundColor: area.color }}
                    >
                      {area.score ?? 0}
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="h-3 rounded-full transition-all"
                      style={{
                        width: `${area.score !== null ? (area.score / 10) * 100 : 0}%`,
                        backgroundColor: area.color,
                      }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {area.score !== null ? `${Math.round((area.score / 10) * 100)}% completion` : 'Not assessed yet'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Performance Summary</h3>
          <div className="prose max-w-none text-gray-700">
            <p className="mb-3">
              {studentProfile.name} has demonstrated strong capabilities across multiple competency areas.
              The assessment results indicate a well-rounded skill set with particular strengths in areas
              scoring 7 or above.
            </p>
            <p className="mb-3">
              <strong>Key Strengths:</strong> The candidate shows consistent performance across verbal,
              logical, and critical thinking domains. These skills are highly valued in graduate roles
              requiring analytical thinking and problem-solving abilities.
            </p>
            <p className="mb-3">
              <strong>Development Areas:</strong> Continued practice in diagrammatic reasoning and
              numerical analysis would further strengthen the overall profile. The mock interview feature
              can provide targeted feedback for improvement.
            </p>
            <p>
              <strong>Soft Skills:</strong> The earned badges reflect important workplace competencies
              including teamwork, goal orientation, adaptability, and problem-solving aptitude.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => navigate('/student/dashboard')}
            className="flex-1 border-2 border-[#1E3A8A] text-[#1E3A8A] px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    </StudentLayout>
  );
}
