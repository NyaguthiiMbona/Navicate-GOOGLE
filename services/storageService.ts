import { GenerationStats } from "../types";

const LIMIT_KEY = 'navicate_gen_stats';
const SESSION_BG_KEY = 'navicate_session_background';
const ACTIVE_ROLE_KEY = 'navicate_active_role';
const EXP_LEVEL_KEY = 'navicate_exp_level';
const FREE_DAILY_LIMIT = 1;

// EXPORT LIMIT CONSTANTS
const EXPORT_COUNT_KEY = 'navicate_export_count';
const FREE_EXPORT_LIMIT = 1;

// --------------------
// GENERATION LIMIT LOGIC
// --------------------

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
};

export const hasReachedLimit = (isPaid: boolean = false): boolean => {
  if (isPaid) return false;
  const stats = getGenerationStats();
  return stats.count >= FREE_DAILY_LIMIT;
};

// --------------------
// EXPORT / DOWNLOAD LIMIT LOGIC
// --------------------

export const getExportCount = (): number => {
  const stored = localStorage.getItem(EXPORT_COUNT_KEY);
  return stored ? parseInt(stored, 10) : 0;
};

export const hasUsedFreeExport = (isPaid: boolean = false): boolean => {
  if (isPaid) return false;
  return getExportCount() >= FREE_EXPORT_LIMIT;
};

export const incrementExportCount = () => {
  const count = getExportCount();
  localStorage.setItem(EXPORT_COUNT_KEY, String(count + 1));
};

// --------------------
// SESSION CLEANUP
// --------------------

export const clearAllSessionData = () => {
  localStorage.removeItem(SESSION_BG_KEY);
  localStorage.removeItem(ACTIVE_ROLE_KEY);
  localStorage.removeItem(EXP_LEVEL_KEY);
};
