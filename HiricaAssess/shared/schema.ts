import { z } from "zod";

// Student Profile Schema
export const studentProfileSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  university: z.string().optional(),
  degree: z.string().optional(),
  graduationYear: z.string().optional(),
  skills: z.array(z.string()).default([]),
  assessmentScore: z.number().default(0),
  assessmentsCompleted: z.number().default(0),
  skillsMastered: z.number().default(0),
  upcomingInterviews: z.number().default(0),
});

export type StudentProfile = z.infer<typeof studentProfileSchema>;

export const insertStudentProfileSchema = studentProfileSchema.omit({ id: true });
export type InsertStudentProfile = z.infer<typeof insertStudentProfileSchema>;

// Employer Profile Schema
export const employerProfileSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  companyName: z.string(),
  industry: z.string().optional(),
  contactPerson: z.string().optional(),
});

export type EmployerProfile = z.infer<typeof employerProfileSchema>;

export const insertEmployerProfileSchema = employerProfileSchema.omit({ id: true });
export type InsertEmployerProfile = z.infer<typeof insertEmployerProfileSchema>;

// Skills Assessment Schema
export const skillsAssessmentSchema = z.object({
  id: z.string(),
  studentId: z.string(),
  type: z.enum(["speak", "chat", "questionnaire"]),
  questions: z.array(z.object({
    id: z.string(),
    question: z.string(),
    answer: z.string().optional(),
    options: z.array(z.string()).optional(),
  })),
  score: z.number().optional(),
  completedAt: z.string().optional(),
});

export type SkillsAssessment = z.infer<typeof skillsAssessmentSchema>;

export const insertSkillsAssessmentSchema = skillsAssessmentSchema.omit({ id: true });
export type InsertSkillsAssessment = z.infer<typeof insertSkillsAssessmentSchema>;

// Mock Interview Schema
export const mockInterviewSchema = z.object({
  id: z.string(),
  studentId: z.string(),
  questions: z.array(z.object({
    id: z.string(),
    question: z.string(),
    answer: z.string().optional(),
    feedback: z.string().optional(),
  })),
  completedAt: z.string().optional(),
});

export type MockInterview = z.infer<typeof mockInterviewSchema>;

export const insertMockInterviewSchema = mockInterviewSchema.omit({ id: true });
export type InsertMockInterview = z.infer<typeof insertMockInterviewSchema>;

// Feedback Schema
export const feedbackSchema = z.object({
  id: z.string(),
  studentId: z.string(),
  skillLevels: z.object({
    communication: z.number(),
    problemSolving: z.number(),
    teamwork: z.number(),
    leadership: z.number(),
  }),
  behavioralBadges: z.array(z.string()),
  aiSummary: z.string(),
  generatedAt: z.string(),
});

export type Feedback = z.infer<typeof feedbackSchema>;

export const insertFeedbackSchema = feedbackSchema.omit({ id: true });
export type InsertFeedback = z.infer<typeof insertFeedbackSchema>;

// Candidate Match Schema (for employers)
export const candidateMatchSchema = z.object({
  id: z.string(),
  studentId: z.string(),
  name: z.string(),
  matchPercentage: z.number(),
  keySkills: z.array(z.string()),
  avatarUrl: z.string().optional(),
});

export type CandidateMatch = z.infer<typeof candidateMatchSchema>;

// Auth Schemas
export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type SignIn = z.infer<typeof signInSchema>;

export const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
  name: z.string().min(2),
  accountType: z.enum(["student", "employer"]),
  companyName: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type SignUp = z.infer<typeof signUpSchema>;
