import { MockCandidate } from '../types';

export const MOCK_CANDIDATES: MockCandidate[] = [
  {
    id: 1,
    name: 'Fred Flintstone',
    degree: 'BSc Computer Science',
    matchScore: 92,
    skills: ['Team player', 'Problem solver', 'Quick learner'],
  },
  {
    id: 2,
    name: 'Wilma Flintstone',
    degree: 'BA Business Administration',
    matchScore: 88,
    skills: ['Goal-oriented', 'Leadership', 'Communication'],
  },
  {
    id: 3,
    name: 'Barney Rubble',
    degree: 'BEng Mechanical Engineering',
    matchScore: 85,
    skills: ['Analytical', 'Detail-oriented', 'Team player'],
  },
  {
    id: 4,
    name: 'Betty Rubble',
    degree: 'BSc Data Science',
    matchScore: 79,
    skills: ['Creative thinking', 'Problem solver', 'Adaptable'],
  },
  {
    id: 5,
    name: 'Pebbles Flintstone',
    degree: 'BSc Psychology',
    matchScore: 75,
    skills: ['Empathetic', 'Goal-oriented', 'Communication'],
  },
];

export const ASSESSMENT_QUESTIONS = {
  verbal: [
    {
      question: 'Read the passage: "Companies that invest in employee development see 24% higher profit margins." Which statement is most accurate?',
      options: [
        'Employee development guarantees profit',
        'There is a correlation between development and margins',
        'All companies must invest in development',
        'Profit margins are solely dependent on training',
      ],
      correctIndex: 1,
    },
    {
      question: 'If "lucid" means clear and easy to understand, what does "elucidate" mean?',
      options: ['To confuse', 'To explain clearly', 'To hide information', 'To question'],
      correctIndex: 1,
    },
    {
      question: 'Complete the analogy: Doctor is to Hospital as Teacher is to ___',
      options: ['Books', 'Students', 'School', 'Education'],
      correctIndex: 2,
    },
    {
      question: 'Which word is closest in meaning to "meticulous"?',
      options: ['Careless', 'Thorough', 'Quick', 'Simple'],
      correctIndex: 1,
    },
    {
      question: 'In the sentence "The proposal was deemed viable," what does viable mean?',
      options: ['Expensive', 'Rejected', 'Feasible', 'Complex'],
      correctIndex: 2,
    },
  ],
  numerical: [
    {
      question: 'If a product costs £50 and is discounted by 20%, what is the new price?',
      options: ['£30', '£40', '£45', '£10'],
    },
    {
      question: 'A team of 5 people completes a project in 10 days. How long would it take 10 people?',
      options: ['5 days', '10 days', '15 days', '20 days'],
    },
    {
      question: 'What is 15% of 200?',
      options: ['15', '30', '35', '40'],
    },
    {
      question: 'If sales increased from 100 to 150 units, what is the percentage increase?',
      options: ['25%', '33%', '50%', '66%'],
    },
    {
      question: 'A budget of £1000 is split in ratio 3:2. What is the larger amount?',
      options: ['£400', '£500', '£600', '£700'],
    },
  ],
  logical: [
    {
      question: 'What comes next in the sequence: 2, 4, 8, 16, ___',
      options: ['24', '28', '32', '64'],
    },
    {
      question: 'If all A are B, and all B are C, then:',
      options: ['All A are C', 'Some C are A', 'No A are C', 'Cannot determine'],
    },
    {
      question: 'Complete the pattern: O, T, T, F, F, S, S, ___',
      options: ['E', 'N', 'T', 'S'],
    },
    {
      question: 'Which shape is the odd one out: Circle, Square, Triangle, Rectangle?',
      options: ['Circle', 'Square', 'Triangle', 'All are similar'],
    },
    {
      question: 'If the day before yesterday was Thursday, what day is tomorrow?',
      options: ['Friday', 'Saturday', 'Sunday', 'Monday'],
    },
  ],
  diagrammatic: [
    {
      question: 'A flowchart shows: Start → Process A → Decision → Process B → End. What does the Decision box represent?',
      options: ['A calculation', 'A choice point', 'An end state', 'A loop'],
    },
    {
      question: 'In a Venn diagram, the overlapping section represents:',
      options: ['Differences', 'Common elements', 'All elements', 'Neither set'],
    },
    {
      question: 'A pie chart showing company expenses has 4 equal sections. What percentage is each?',
      options: ['20%', '25%', '33%', '50%'],
    },
    {
      question: 'In an organizational chart, who typically appears at the top?',
      options: ['Entry-level staff', 'Middle management', 'Senior leadership', 'All levels'],
    },
    {
      question: 'A bar chart shows values increasing left to right. This indicates:',
      options: ['Negative trend', 'No change', 'Positive trend', 'Random data'],
    },
  ],
  critical: [
    {
      question: 'A company claims "9 out of 10 customers recommend us." What should you question?',
      options: ['The grammar', 'Sample size and selection method', 'The company name', 'Nothing, it\'s factual'],
    },
    {
      question: 'When evaluating a source, what is most important?',
      options: ['Length of article', 'Author credentials and bias', 'Publication date only', 'Number of images'],
    },
    {
      question: 'If correlation exists between two variables, can we assume causation?',
      options: ['Yes, always', 'No, correlation ≠ causation', 'Only with large samples', 'Only in experiments'],
    },
    {
      question: 'What is a red flag in an argument?',
      options: ['Clear evidence', 'Logical reasoning', 'Ad hominem attacks', 'Multiple sources'],
    },
    {
      question: 'Which represents the strongest evidence?',
      options: ['Anecdotal stories', 'Expert opinion', 'Peer-reviewed research', 'Social media posts'],
    },
  ],
  situational: [
    {
      question: 'Your team is behind schedule. What do you do first?',
      options: ['Blame team members', 'Assess the situation and communicate', 'Ignore it', 'Work alone'],
    },
    {
      question: 'A colleague takes credit for your work. How do you respond?',
      options: ['Confront aggressively', 'Document and discuss professionally', 'Do nothing', 'Complain to everyone'],
    },
    {
      question: 'You notice an error in a published report. What should you do?',
      options: ['Hide it', 'Report it immediately through proper channels', 'Fix it secretly', 'Blame others'],
    },
    {
      question: 'A client requests something unethical. Your response?',
      options: ['Do it for the money', 'Refuse and explain why', 'Ask someone else to do it', 'Ignore the request'],
    },
    {
      question: 'You have conflicting deadlines. How do you prioritize?',
      options: ['Work on easiest first', 'Assess urgency and impact', 'Random order', 'Ask someone else'],
    },
  ],
};

export const MOCK_INTERVIEW_QUESTIONS = [
  'Tell me about a time when you had to work with a difficult team member. How did you handle the situation?',
  'Describe a situation where you had to meet a tight deadline. What approach did you take?',
  'Give an example of when you had to adapt to significant change. What was your strategy?',
];

export const ASSESSMENT_LEVELS = {
  verbal: {
    level1: [
      {
        question: 'Read the passage: "Companies that invest in employee development see 24% higher profit margins." Which statement is most accurate?',
        options: [
          'Employee development guarantees profit',
          'There is a correlation between development and margins',
          'All companies must invest in development',
          'Profit margins are solely dependent on training',
        ],
        correctIndex: 1,
      },
      {
        question: 'If "lucid" means clear and easy to understand, what does "elucidate" mean?',
        options: ['To confuse', 'To explain clearly', 'To hide information', 'To question'],
        correctIndex: 1,
      },
      {
        question: 'Complete the analogy: Doctor is to Hospital as Teacher is to ___',
        options: ['Books', 'Students', 'School', 'Education'],
        correctIndex: 2,
      },
      {
        question: 'Which word is closest in meaning to "meticulous"?',
        options: ['Careless', 'Thorough', 'Quick', 'Simple'],
        correctIndex: 1,
      },
      {
        question: 'In the sentence "The proposal was deemed viable," what does viable mean?',
        options: ['Expensive', 'Rejected', 'Feasible', 'Complex'],
        correctIndex: 2,
      },
    ],
    level2: [
      {
        question: 'Remote teams report equal or higher productivity compared to office-based teams, with 77% of remote workers claiming increased output. However, some managers express concerns about monitoring performance. What can be inferred?',
        options: [
          'Remote work is universally superior',
          'There is evidence of productivity benefits but concerns remain',
          'Managers are always wrong about remote work',
          'Office work is obsolete',
        ],
        correctIndex: 1,
      },
      {
        question: 'In the sentence "The committee reached a tentative agreement," what does tentative mean?',
        options: [
          'Final and binding',
          'Provisional and subject to change',
          'Enthusiastic',
          'Rejected',
        ],
        correctIndex: 1,
      },
      {
        question: 'If the proposal is accepted, we can begin implementation next month. The proposal was accepted. Therefore:',
        options: [
          'Implementation must occur next month',
          'Implementation can begin next month',
          'Implementation is impossible',
          'The proposal was rejected',
        ],
        correctIndex: 1,
      },
      {
        question: 'Which sentence clarifies the ambiguity in "Sam discussed the project with the client before submitting it"?',
        options: [
          'Sam discussed the project',
          'Sam discussed the project with the client before submitting the project',
          'Sam discussed it',
          'The project was submitted',
        ],
        correctIndex: 1,
      },
      {
        question: 'Transparent is to opaque as candid is to ___',
        options: [
          'Honest',
          'Secretive',
          'Open',
          'Clear',
        ],
        correctIndex: 1,
      },
    ],
  },
};
