import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import StudentLayout from '../components/StudentLayout';
import { ASSESSMENT_QUESTIONS, ASSESSMENT_LEVELS } from '../data/mockData';
import { CheckCircle2, Lock, ChevronRight } from 'lucide-react';

type TestArea = 'verbal' | 'numerical' | 'logical' | 'diagrammatic' | 'critical' | 'situational';

export default function GamifiedAssessment() {
  const navigate = useNavigate();
  const { assessmentState, setAssessmentState, updateTestScore } = useAppContext();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showLevelUnlock, setShowLevelUnlock] = useState(false);

  const testAreas: { key: TestArea; label: string; description: string }[] = [
    { key: 'verbal', label: 'Verbal Reasoning', description: 'Assess reading comprehension and language skills' },
    { key: 'numerical', label: 'Numerical Reasoning', description: 'Evaluate numerical and data interpretation abilities' },
    { key: 'logical', label: 'Logical/Abstract Reasoning', description: 'Test pattern recognition and logical thinking' },
    { key: 'diagrammatic', label: 'Diagrammatic Reasoning', description: 'Measure ability to interpret diagrams and visual data' },
    { key: 'critical', label: 'Critical Thinking', description: 'Assess analytical and evaluation skills' },
    { key: 'situational', label: 'Situational Judgement', description: 'Evaluate decision-making in workplace scenarios' },
  ];

  const handleAreaSelect = (area: TestArea) => {
    setAssessmentState({
      ...assessmentState,
      selectedArea: area,
      selectedMode: null,
      questionnaireAnswers: [],
      verbalLevel: area === 'verbal' ? 1 : undefined,
    });
    setCurrentQuestion(0);
    setAnswers([]);
    setShowLevelUnlock(false);
  };

  const handleModeSelect = (mode: string) => {
    if (mode !== 'classic') return;
    setAssessmentState({
      ...assessmentState,
      selectedMode: mode,
    });
    setCurrentQuestion(0);
    setAnswers([]);
  };

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < 4) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const area = assessmentState.selectedArea as TestArea;
      const verbalLevel = (assessmentState as any).verbalLevel || 1;

      let score = 0;
      if (area === 'verbal') {
        const questions = ASSESSMENT_LEVELS.verbal[`level${verbalLevel}` as keyof typeof ASSESSMENT_LEVELS.verbal];
        score = answers.filter((answer, index) => {
          const question = questions[index];
          return answer === question.options[question.correctIndex];
        }).length;
      } else {
        const questions = ASSESSMENT_QUESTIONS[area];
        score = answers.filter((answer, index) => {
          const question = questions[index];
          return answer === question.options[(question as any).correctIndex];
        }).length;
      }

      if (area === 'verbal' && verbalLevel === 1 && score === 5) {
        setShowLevelUnlock(true);
      } else {
        if (area === 'verbal') {
          updateTestScore('verbal', { level: verbalLevel, score });
        } else {
          updateTestScore(area, score);
        }
        navigate('/student/feedback');
      }
    }
  };

  if (!assessmentState.selectedArea) {
    return (
      <StudentLayout>
        <div className="max-w-5xl">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Skills Assessment</h1>
          <p className="text-gray-600 mb-8">Choose an assessment area to begin</p>

          <div className="grid md:grid-cols-3 gap-6">
            {testAreas.map((area) => (
              <button
                key={area.key}
                onClick={() => handleAreaSelect(area.key)}
                className="bg-white rounded-xl shadow-md p-6 text-left hover:shadow-lg hover:border-2 hover:border-[#1E3A8A] transition-all border-2 border-transparent"
              >
                <h3 className="text-lg font-bold text-gray-800 mb-2">{area.label}</h3>
                <p className="text-sm text-gray-600">{area.description}</p>
              </button>
            ))}
          </div>
        </div>
      </StudentLayout>
    );
  }

  if (!assessmentState.selectedMode) {
    const selectedAreaInfo = testAreas.find(a => a.key === assessmentState.selectedArea);

    return (
      <StudentLayout>
        <div className="max-w-4xl">
          <button
            onClick={() => handleAreaSelect('' as TestArea)}
            className="text-[#1E3A8A] hover:underline font-medium mb-6"
          >
            ← Back to Areas
          </button>

          <div className="bg-gradient-to-r from-[#1E3A8A] to-[#2c4fa5] rounded-xl shadow-lg p-8 mb-8 text-white">
            <h1 className="text-3xl font-bold mb-2">{selectedAreaInfo?.label}</h1>
            <p className="text-blue-100">{selectedAreaInfo?.description}</p>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-6">Choose Assessment Mode</h2>

          <div className="space-y-4">
            <button
              onClick={() => handleModeSelect('classic')}
              className="w-full bg-white rounded-xl shadow-md p-6 text-left hover:shadow-lg hover:border-2 hover:border-[#1E3A8A] transition-all border-2 border-transparent"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle2 className="w-6 h-6 text-[#499F68]" />
                    <h3 className="text-xl font-bold text-gray-800">Classic Questionnaire</h3>
                  </div>
                  <p className="text-gray-600">
                    Complete a series of multiple-choice questions to assess your skills in this area.
                    Receive immediate scoring and feedback upon completion.
                  </p>
                </div>
                <ChevronRight className="w-6 h-6 text-gray-400" />
              </div>
            </button>

            <div className="bg-gray-100 rounded-xl shadow-md p-6 opacity-60 cursor-not-allowed">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Lock className="w-6 h-6 text-gray-500" />
                    <h3 className="text-xl font-bold text-gray-600">AI Voice Chat</h3>
                    <span className="px-3 py-1 bg-gray-300 text-gray-600 text-xs font-semibold rounded-full">
                      Coming Soon
                    </span>
                  </div>
                  <p className="text-gray-500">
                    Have a natural conversation with our AI to demonstrate your competencies through voice interaction.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-100 rounded-xl shadow-md p-6 opacity-60 cursor-not-allowed">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Lock className="w-6 h-6 text-gray-500" />
                    <h3 className="text-xl font-bold text-gray-600">AI Text Chat</h3>
                    <span className="px-3 py-1 bg-gray-300 text-gray-600 text-xs font-semibold rounded-full">
                      Coming Soon
                    </span>
                  </div>
                  <p className="text-gray-500">
                    Engage in a text-based conversation with our AI assistant to showcase your abilities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </StudentLayout>
    );
  }

  if (showLevelUnlock) {
    const verbalLevel = (assessmentState as any).verbalLevel || 1;
    return (
      <StudentLayout>
        <div className="max-w-3xl flex flex-col items-center justify-center min-h-[60vh]">
          <div className="bg-gradient-to-r from-[#1E3A8A] to-[#2c4fa5] rounded-xl shadow-lg p-12 text-white text-center">
            <h1 className="text-4xl font-bold mb-4">You Unlocked Level 2!</h1>
            <p className="text-lg text-blue-100 mb-8">You achieved a perfect score on Level 1. Ready for the next challenge?</p>
            <button
              onClick={() => {
                setAssessmentState({
                  ...assessmentState,
                  verbalLevel: 2,
                });
                setCurrentQuestion(0);
                setAnswers([]);
                setShowLevelUnlock(false);
              }}
              className="px-8 py-3 bg-white text-[#1E3A8A] rounded-lg font-bold hover:bg-blue-50 transition-colors"
            >
              Continue to Level 2
            </button>
          </div>
        </div>
      </StudentLayout>
    );
  }

  const area = assessmentState.selectedArea as TestArea;
  const verbalLevel = (assessmentState as any).verbalLevel || 1;
  const questions = area === 'verbal'
    ? ASSESSMENT_LEVELS.verbal[`level${verbalLevel}` as keyof typeof ASSESSMENT_LEVELS.verbal]
    : ASSESSMENT_QUESTIONS[area];
  const currentQ = questions[currentQuestion];

  return (
    <StudentLayout>
      <div className="max-w-3xl">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-800">
              {testAreas.find(a => a.key === assessmentState.selectedArea)?.label}
              {area === 'verbal' && <span className="text-lg text-[#1E3A8A] ml-2">(Level {verbalLevel})</span>}
            </h1>
            <span className="text-sm font-semibold text-[#1E3A8A]">
              Question {currentQuestion + 1} of 5
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-[#1E3A8A] h-2 rounded-full transition-all"
              style={{ width: `${((currentQuestion + 1) / 5) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">{currentQ.question}</h2>
          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className={`w-full text-left px-6 py-4 rounded-lg border-2 transition-all ${
                  answers[currentQuestion] === option
                    ? 'border-[#1E3A8A] bg-blue-50'
                    : 'border-gray-200 hover:border-[#1E3A8A] hover:bg-blue-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      answers[currentQuestion] === option
                        ? 'border-[#1E3A8A] bg-[#1E3A8A]'
                        : 'border-gray-300'
                    }`}
                  >
                    {answers[currentQuestion] === option && (
                      <div className="w-3 h-3 bg-white rounded-full" />
                    )}
                  </div>
                  <span className="text-gray-800">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => {
              if (currentQuestion > 0) {
                setCurrentQuestion(currentQuestion - 1);
              }
            }}
            disabled={currentQuestion === 0}
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={!answers[currentQuestion]}
            className="px-6 py-3 bg-[#1E3A8A] text-white rounded-lg font-semibold hover:bg-[#2c4fa5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentQuestion === 4 ? 'Submit' : 'Next'}
          </button>
        </div>
      </div>
    </StudentLayout>
  );
}
