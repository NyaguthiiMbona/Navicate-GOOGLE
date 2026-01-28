
export enum AreaOfInterest {
  TECH = 'Tech',
  REMOTE = 'Remote',
  HYBRID = 'Hybrid'
}

export enum ExperienceLevel {
  GRADUATE = 'Graduate / Early Career (0–2 years)',
  MID_CAREER = 'Mid Career Professional (3+ years)'
}

export type ReadinessLabel = 
  | 'Ready Now' 
  | 'Near Ready' 
  | 'Exploratory Only';

export interface UserFormData {
  background: string;
  yearsOfExperience: number;
  interest: AreaOfInterest;
  experienceLevel?: ExperienceLevel;
}

export interface LearningResource {
  title: string;
  whyItMatters: string;
  url: string;
}

export interface CareerPath {
  role: string;
  justification: string;
  whyFit: string;
  readinessLabel: ReadinessLabel;
  readinessExplanation: string;
  transferableSkills: string[];
  skillGaps: string[];
  practicalNextSteps: string[];
  realityCheck: string[];
  adjacentRoles: { role: string; explanation: string }[];
  learningResources: LearningResource[];
  roleTypes: string[];
}

export interface CareerAnalysisResult {
  suggestedPaths: CareerPath[];
  generalAdvice: string;
}

export interface ApplicationMaterials {
  cv?: {
    summary: string;
    experienceBullets: string[];
    skills: string[];
  };
  coverLetter?: string;
  targetRole: string;
}

export interface GenerationStats {
  date: string;
  count: number;
}
