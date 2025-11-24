import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import StudentLayout from '../components/StudentLayout';
import { Award, TrendingUp, Loader2 } from 'lucide-react';

export default function FeedbackPage() {
  const navigate = useNavigate();
  const { studentProfile, assessmentState, setAssessmentState } = useAppContext();
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generateFeedback();
  }, []);

  const generateFeedback = async () => {
    if (!assessmentState.selectedArea || !studentProfile) return;

    const area = assessmentState.selectedArea;
    const rawScore = studentProfile.testScores[
      area as keyof typeof studentProfile.testScores
    ];

    const isVerbal = area === 'verbal';
    const level =
      isVerbal && rawScore && typeof rawScore === 'object'
        ? rawScore.level
        : null;

    const coreScore =
      isVerbal && rawScore && typeof rawScore === 'object'
        ? rawScore.score
        : (rawScore as number) ?? 0;

    const scoreOutOf10 = isVerbal ? coreScore * 2 : coreScore;

    setLoading(true);
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY || '',
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 512,
          messages: [
            {
              role: 'user',
              content: `Generate brief, encouraging feedback for a student who scored ${scoreOutOf10}/10 on a ${area} reasoning assessment. Include:
1. Recognition of achievement
2. Skill interpretation
3. One improvement suggestion
4. Encouragement for next steps

Keep it to 3–4 sentences, positive and actionable.`,
            },
          ],
        }),
      });

      const data = await response.json();
      if (data.content && data.content[0]?.text) {
        setFeedback(data.content[0].text);
      } else {
        setFeedback(getMockFeedback(area, scoreOutOf10));
      }
    } catch (error) {
      setFeedback(getMockFeedback(area, scoreOutOf10));
    } finally {
      setLoading(false);
    }
  };

  const getMockFeedback = (area: string, score: number): string => {
    if (score >= 8) {
      return `Excellent performance in ${area}! You've demonstrated strong capability and mastery. Keep pushing into advanced materials to maintain this high standard.`;
    } else if (score >= 6) {
      return `Good work on your ${area} assessment! You're performing well and show strong potential. Continued practice will help you push even further.`;
    } else {
      return `You've completed the ${area} assessment and shown a good foundation. Regular practice and revisiting core concepts will help you improve quickly.`;
    }
  };

  if (!studentProfile || !assessmentState.selectedArea) {
    return null;
  }

  const area = assessmentState.selectedArea;
  const rawScore = studentProfile.testScores[
    area as keyof typeof studentProfile.testScores
  ];

  const isVerbal = area === 'verbal';

  const level =
    isVerbal && rawScore && typeof rawScore === 'object'
      ? rawScore.level
      : null;

  const coreScore =
    isVerbal && rawScore && typeof rawScore === 'object'
      ? rawScore.score
      : (rawScore as number) ?? 0;

  const scoreOutOf10 = isVerbal ? coreScore * 2 : coreScore;

  // Award badges ONLY for perfect performance
  const badgeEarned = scoreOutOf10 === 10;

  const areaLabels: Record<string, string> = {
    verbal: 'Verbal Reasoning',
    numerical: 'Numerical Reasoning',
    logical: 'Logical/Abstract Reasoning',
    diagrammatic: 'Diagrammatic Reasoning',
    critical: 'Critical Thinking',
    situational: 'Situational Judgement',
  };

  return (
    <StudentLayout>
      <div className="max-w-3xl">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-[#499F68] to-[#77B28C] rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Assessment Complete!</h1>
          <p className="text-gray-600">
            Well done on completing your {areaLabels[area]} assessment
            {isVerbal && level ? ` (Level ${level})` : ''}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Your Score</h2>
            <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-[#1E3A8A] to-[#2c4fa5] rounded-full mb-4">
              <span className="text-5xl font-bold text-white">{scoreOutOf10}</span>
              <span className="text-2xl text-blue-200">/10</span>
            </div>
            <p className="text-gray-600">
              {scoreOutOf10 >= 8
                ? 'Outstanding!'
                : scoreOutOf10 >= 6
                ? 'Good Performance!'
                : 'Keep Practising!'}
            </p>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-[#499F68]" />
              <h3 className="text-lg font-bold text-gray-800">Performance Analysis</h3>
            </div>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-8 h-8 text-[#1E3A8A] animate-spin" />
              </div>
            ) : (
              <div className="prose max-w-none text-gray-700">
                <p>{feedback}</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#499F68]/10 to-[#77B28C]/10 rounded-xl p-6 mb-6">
          <h3 className="font-bold text-gray-800 mb-3">Skill Badge Earned</h3>
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-[#499F68] to-[#77B28C] rounded-full flex items-center justify-center">
              <Award className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="font-semibold text-gray-800">
                {badgeEarned
                  ? `${areaLabels[area]}${isVerbal && level ? ` - Level ${level}` : ''}`
                  : 'No badge earned yet'}
              </p>
              <p className="text-sm text-gray-600">
                {badgeEarned
                  ? 'Added to your profile'
                  : 'Achieve a perfect score to earn this badge'}
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <button
            onClick={() => {
              // Reset assessment state so user returns to area selection
              setAssessmentState({
                selectedArea: null,
                selectedMode: null,
                questionnaireAnswers: [],
                results: assessmentState.results, // keep previous scores
                verbalLevel: undefined,
              });
        
              navigate('/student/assessment');
            }}
            className="border-2 border-[#1E3A8A] text-[#1E3A8A] px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Take Another Assessment
          </button>
        
          <button
            onClick={() => navigate('/student/profile')}
            className="bg-[#1E3A8A] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#2c4fa5] transition-colors"
          >
            Save and View Profile
          </button>
        </div>
      </div>
    </StudentLayout>
  );
}
