import { useState } from 'react';
import StudentLayout from '../components/StudentLayout';
import { MOCK_INTERVIEW_QUESTIONS } from '../data/mockData';
import { MessageSquare, Loader2 } from 'lucide-react';

export default function MockInterview() {
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  const analyzeMockAnswer = async () => {
    setLoading(true);
    setFeedback('');

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
          max_tokens: 1024,
          messages: [
            {
              role: 'user',
              content: `You are an expert HR interviewer providing feedback on a candidate's answer to a competency-based interview question.

Question: ${MOCK_INTERVIEW_QUESTIONS[selectedQuestion]}

Candidate's Answer: ${answer}

Please provide constructive feedback on this answer. Consider:
1. Whether they used the STAR method (Situation, Task, Action, Result)
2. Clarity and structure of their response
3. Demonstration of relevant skills and competencies
4. Areas for improvement

Keep your feedback concise (3-4 paragraphs) and actionable.`,
            },
          ],
        }),
      });

      const data = await response.json();
      if (data.content && data.content[0]?.text) {
        setFeedback(data.content[0].text);
      } else {
        setFeedback('Unable to generate feedback. Please try again.');
      }
    } catch (error) {
      setFeedback(
        'Mock feedback: Your answer demonstrates good awareness of the situation. To strengthen your response, consider using the STAR method more explicitly: describe the Situation, explain your Task, detail the Actions you took, and highlight the Results. Be specific about your individual contributions and quantify outcomes where possible. Overall, you show potential but could benefit from more structured responses.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <StudentLayout>
      <div className="max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">AI Mock Interview</h1>
          <p className="text-gray-600">
            Practice your interview skills and get AI-powered feedback on your answers
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <MessageSquare className="w-6 h-6 text-[#1E3A8A]" />
            <h2 className="text-xl font-bold text-gray-800">Competency Questions</h2>
          </div>

          <div className="space-y-3 mb-6">
            {MOCK_INTERVIEW_QUESTIONS.map((question, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedQuestion(index);
                  setAnswer('');
                  setFeedback('');
                }}
                className={`w-full text-left px-6 py-4 rounded-lg border-2 transition-all ${
                  selectedQuestion === index
                    ? 'border-[#1E3A8A] bg-blue-50'
                    : 'border-gray-200 hover:border-[#1E3A8A] hover:bg-blue-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-[#1E3A8A] text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </span>
                  <span className="text-gray-800">{question}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Your Answer
            </label>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer here using the STAR method (Situation, Task, Action, Result)..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#1E3A8A] focus:outline-none transition-colors resize-none"
              rows={8}
            />
            <button
              onClick={analyzeMockAnswer}
              disabled={!answer.trim() || loading}
              className="mt-4 bg-[#1E3A8A] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#2c4fa5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Analyse Answer'
              )}
            </button>
          </div>
        </div>

        {feedback && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-[#499F68] mb-4">AI Feedback</h3>
            <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">
              {feedback}
            </div>
          </div>
        )}
      </div>
    </StudentLayout>
  );
}
