import { GenerationStats } from "../types";

const LIMIT_KEY = 'navicate_gen_stats';
const FREE_USED_KEY = 'navicate_free_used';
const SESSION_BG_KEY = 'navicate_session_background';
const ACTIVE_ROLE_KEY = 'navicate_active_role';
const EXP_LEVEL_KEY = 'navicate_exp_level';

const FREE_DAILY_LIMIT = 1;

export const getGenerationStats = (): GenerationStats => {
  const today = new Date().toISOString().split('T')[0];
  const stored = localStorage.getItem(LIMIT_KEY);

  if (stored) {
    const stats: GenerationStats = JSON.parse(stored);
    if (stats.date === today) {
      return stats;
    }
  }

  return { date: today, count: 0 };
};

export const incrementGenerationCount = () => {
  const stats = getGenerationStats();
  stats.count += 1;
  localStorage.setItem(LIMIT_KEY, JSON.stringify(stats));

  if (stats.count >= FREE_DAILY_LIMIT) {
    localStorage.setItem(FREE_USED_KEY, 'true');
  }
};

export const hasUsedFreeGeneration = (): boolean => {
  return localStorage.getItem(FREE_USED_KEY) === 'true';
};

export const hasReachedLimit = (isPaid: boolean = false): boolean => {
  if (isPaid) return false;
  return hasUsedFreeGeneration();
};

export const clearAllSessionData = () => {
  localStorage.removeItem(SESSION_BG_KEY);
  localStorage.removeItem(ACTIVE_ROLE_KEY);
  localStorage.removeItem(EXP_LEVEL_KEY);
};
