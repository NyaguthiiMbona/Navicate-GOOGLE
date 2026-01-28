
import { GoogleGenAI, Type } from "@google/genai";
import { UserFormData, CareerAnalysisResult, ApplicationMaterials, ExperienceLevel } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const careerResponseSchema = {
  type: Type.OBJECT,
  properties: {
    suggestedPaths: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          role: { type: Type.STRING, description: "Formal title of the suggested role." },
          justification: { type: Type.STRING, description: "Exactly ONE neutral sentence explaining why this role appears in their results." },
          whyFit: { type: Type.STRING, description: "Professional explanation connecting their specific experience to the role." },
          readinessLabel: { 
            type: Type.STRING, 
            description: "Strictly one of: 'Ready Now', 'Near Ready', 'Exploratory Only'." 
          },
          readinessExplanation: { 
            type: Type.STRING, 
            description: "A neutral, diagnostic explanation of their current preparedness level." 
          },
          transferableSkills: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of 3-5 high-value skills the user already possesses based on their background."
          },
          skillGaps: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "Specific technical or industry skill gaps to work on."
          },
          practicalNextSteps: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "3-4 concrete actions like specific projects, volunteer work, or networking strategies."
          },
          realityCheck: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "3 concise bullet points describing day-to-day realities of the role. Neutral and honest tone."
          },
          adjacentRoles: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                role: { type: Type.STRING },
                explanation: { type: Type.STRING }
              },
              required: ["role", "explanation"]
            },
            description: "2-3 adjacent or stepping-stone roles requiring overlapping skills but lower entry barriers."
          },
          learningResources: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING, description: "Short title of the resource." },
                whyItMatters: { type: Type.STRING, description: "One sentence explaining why it matters for this specific path." },
                url: { type: Type.STRING, description: "A realistic URL or documentation link." }
              },
              required: ["title", "whyItMatters", "url"]
            },
            description: "2-4 resources specific to role and readiness."
          },
          roleTypes: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: [
          "role", 
          "justification",
          "whyFit", 
          "readinessLabel",
          "readinessExplanation",
          "transferableSkills", 
          "skillGaps", 
          "practicalNextSteps", 
          "realityCheck", 
          "adjacentRoles", 
          "learningResources", 
          "roleTypes"
        ]
      }
    },
    generalAdvice: { 
      type: Type.STRING, 
      description: "Professional summary of the transition landscape." 
    }
  },
  required: ["suggestedPaths", "generalAdvice"]
};

const cvSchema = {
  type: Type.OBJECT,
  properties: {
    cv: {
      type: Type.OBJECT,
      properties: {
        summary: { type: Type.STRING, description: "A neutral, professional summary (no fluff, max 2 lines)." },
        experienceBullets: { 
          type: Type.ARRAY, 
          items: { type: Type.STRING },
          description: "4-6 bullet points only. Start with action verbs. Max 2 lines each."
        },
        skills: { 
          type: Type.ARRAY, 
          items: { type: Type.STRING },
          description: "8-10 hard and soft skills mapped to the Active Role."
        }
      },
      required: ["summary", "experienceBullets", "skills"]
    }
  },
  required: ["cv"]
};

const coverLetterSchema = {
  type: Type.OBJECT,
  properties: {
    coverLetter: { type: Type.STRING, description: "A full professional cover letter (3 short paragraphs, 180-220 words)." }
  },
  required: ["coverLetter"]
};

const fullPackSchema = {
  type: Type.OBJECT,
  properties: {
    cv: {
      type: Type.OBJECT,
      properties: {
        summary: { type: Type.STRING },
        experienceBullets: { type: Type.ARRAY, items: { type: Type.STRING } },
        skills: { type: Type.ARRAY, items: { type: Type.STRING } }
      },
      required: ["summary", "experienceBullets", "skills"]
    },
    coverLetter: { type: Type.STRING }
  },
  required: ["cv", "coverLetter"]
};

export async function analyzeCareer(data: UserFormData): Promise<CareerAnalysisResult> {
  const stage = data.experienceLevel || (data.yearsOfExperience <= 2 ? ExperienceLevel.GRADUATE : ExperienceLevel.MID_CAREER);
  const isGraduate = stage === ExperienceLevel.GRADUATE;
  
  const prompt = `
    Role: Conservative Career Navigation System
    Task: Analyze user background and recommend realistic career paths based on their career stage.
    
    GLOBAL VERBOSITY KILL SWITCH: Enforce minimum viable clarity. Say the least amount needed to be useful. Delete any adjective or sentence that does not change a decision. 
    ANTI-CONSULTANT FILTER: Block career philosophy, inspirational language, abstract framing, and emotional encouragement.
    OUTPUT AUTHORITY: Never claim certainty or offer guarantees. Use 'plausible' or 'exploratory'.
    INTERNAL TEST: "Would this feel long if I read it at work?" If yes, shorten.

    MANDATORY CAREER STAGE: ${stage}
    
    STRICT ROLE READINESS INDICATORS:
    1. 'Ready Now': Evidence shows current preparedness.
    2. 'Near Ready': Clear transferable skills with 1-2 gaps.
    3. 'Exploratory Only': Major gaps, awareness only.
    
    INDICATOR MAPPING RULES:
    - ${isGraduate ? "Fresh graduates rarely see 'Ready Now' outside entry-level." : "Mid-career users see 'Ready Now' only for clear lateral fits."}
    
    STRICT ROLE ORDERING RULES:
    - Sequence by readiness: Ready Now > Near Ready > Exploratory Only.
    
    STRICT RULES FOR ${isGraduate ? 'GRADUATE / EARLY CAREER' : 'MID-CAREER PROFESSIONAL'}:
    ${isGraduate ? `
    - PROHIBITED: Senior, Lead, Manager, or Director titles. Focus on Junior/Associate.
    ` : `
    - EMPHASIZE: Lateral pivots.
    `}
    
    STRETCH ROLE DISCIPLINE: At most 1-2 'Exploratory Only' roles.
    JUSTIFICATION: Exactly ONE neutral sentence. No motivational language.
    
    User Profile:
    - Background: ${data.background}
    - Tenure: ${data.yearsOfExperience} years
    - Target Environment: ${data.interest}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: careerResponseSchema,
        temperature: 0.1,
      },
    });

    if (!response.text) throw new Error("No response");
    return JSON.parse(response.text.trim()) as CareerAnalysisResult;
  } catch (error) {
    console.error("Gemini error:", error);
    throw error;
  }
}

export async function generateMaterials(
  background: string,
  experience: number,
  targetRole: string,
  type: 'cv' | 'coverLetter' | 'both',
  experienceLevel?: ExperienceLevel
): Promise<ApplicationMaterials> {
  const prompt = `
    Role: Professional Career Advisor & Resume Expert
    Task: Create application materials for: ${targetRole}.
    
    GLOBAL VERBOSITY KILL SWITCH: Minimum viable clarity. Say the least amount needed. No fluff.
    ANTI-CONSULTANT FILTER: No career philosophy, metaphors, or abstract framing.
    INTERNAL TEST: "Would this feel long if I read it at work?" If yes, shorten.

    User Context:
    - Background: ${background}
    - Years of Experience: ${experience}
    - Career Stage: ${experienceLevel}
    
    STRICT CV RULES:
    1. SUMMARY: Max 2 lines. Factual. No narrative.
    2. BULLETS: Action verbs only. Outcomes/scope only. Max 2 lines each.
    
    STRICT COVER LETTER RULES:
    1. LENGTH: 3 short paragraphs (2-3 sentences each). Total 180-220 words.
    2. STRUCTURE:
       - P1: Identity, Role, Logical next step.
       - P2: 2-3 concrete results (plain language).
       - P3: Value add + simple close.
    3. FORBIDDEN WORDS: eager, passionate, dynamic, strategic, leverage, synergy, transformative, excited to.
  `;

  let responseSchema;
  if (type === 'cv') responseSchema = cvSchema;
  else if (type === 'coverLetter') responseSchema = coverLetterSchema;
  else responseSchema = fullPackSchema;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.8,
      },
    });

    if (!response.text) throw new Error("No response from AI");
    const result = JSON.parse(response.text.trim());
    return { ...result, targetRole };
  } catch (error) {
    console.error("Material generation error:", error);
    throw error;
  }
}
