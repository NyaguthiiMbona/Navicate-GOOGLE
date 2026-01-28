
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { StateIndicator } from '../components/StateIndicator';
import { AreaOfInterest, UserFormData, CareerAnalysisResult, CareerPath, ReadinessLabel, ExperienceLevel } from '../types';
import { analyzeCareer } from '../services/geminiService';
import { clearAllSessionData } from '../services/storageService';

export const ExplorePage: React.FC = () => {
  const navigate = useNavigate();
  
  const SESSION_KEY = 'navicate_session_background';
  const ACTIVE_ROLE_KEY = 'navicate_active_role';
  const EXP_LEVEL_KEY = 'navicate_exp_level';

  const [formData, setFormData] = useState<UserFormData>(() => {
    const saved = localStorage.getItem(SESSION_KEY);
    const expLevel = localStorage.getItem(EXP_LEVEL_KEY) as ExperienceLevel | undefined;
    
    return saved ? { ...JSON.parse(saved), experienceLevel: expLevel } : {
      background: '',
      yearsOfExperience: 5,
      interest: AreaOfInterest.TECH,
      experienceLevel: expLevel
    };
  });
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CareerAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedToolkit, setSelectedToolkit] = useState<string | null>(null);
  const [activeRole, setActiveRole] = useState<string | null>(() => localStorage.getItem(ACTIVE_ROLE_KEY));
  
  const [showOnboarding, setShowOnboarding] = useState(!localStorage.getItem(EXP_LEVEL_KEY));
  const [showForm, setShowForm] = useState(() => {
    const saved = localStorage.getItem(SESSION_KEY);
    if (!saved) return true;
    const data = JSON.parse(saved);
    return !data.background || !data.background.trim();
  });

  useEffect(() => {
    const { experienceLevel, ...backgroundData } = formData;
    localStorage.setItem(SESSION_KEY, JSON.stringify(backgroundData));
    if (experienceLevel) {
      localStorage.setItem(EXP_LEVEL_KEY, experienceLevel);
    }
  }, [formData]);

  useEffect(() => {
    if (formData.background.trim() && !result && !loading && !showOnboarding) {
      handlePerformAnalysis();
    }
  }, []);

  const handlePerformAnalysis = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await analyzeCareer(formData);
      setResult(data);
      setShowForm(false);
    } catch (err) {
      setError("Analysis failed. Please check your connection or try again.");
      setShowForm(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.background.trim()) return;
    handlePerformAnalysis();
  };

  const handleResetExploration = () => {
    if (window.confirm("Start a new career exploration? This will clear your current background, stage, and selected roles.")) {
      clearAllSessionData();
      setFormData({
        background: '',
        yearsOfExperience: 5,
        interest: AreaOfInterest.TECH,
        experienceLevel: undefined
      });
      setResult(null);
      setActiveRole(null);
      setSelectedToolkit(null);
      setShowOnboarding(true);
      setShowForm(true);
    }
  };

  const handleExpLevelSelect = (level: ExperienceLevel) => {
    setFormData(prev => ({ ...prev, experienceLevel: level }));
    localStorage.setItem(EXP_LEVEL_KEY, level);
    setShowOnboarding(false);
    if (formData.background.trim()) {
      handlePerformAnalysis();
    }
  };

  const selectRole = (path: CareerPath) => {
    const newRole = selectedToolkit === path.role ? null : path.role;
    if (newRole) {
      localStorage.setItem(ACTIVE_ROLE_KEY, path.role);
    } else {
      localStorage.removeItem(ACTIVE_ROLE_KEY);
    }
    setActiveRole(newRole);
    setSelectedToolkit(newRole);
  };

  const handleAction = (path: CareerPath, type: 'cv' | 'coverLetter' | 'both') => {
    localStorage.setItem(ACTIVE_ROLE_KEY, path.role);
    setActiveRole(path.role);
    navigate('/materials', { 
      state: { 
        targetRole: path.role, 
        type,
        pathData: path 
      } 
    });
  };

  const getReadinessStyles = (label: ReadinessLabel) => {
    switch (label) {
      case 'Ready Now': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'Near Ready': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Exploratory Only': return 'bg-slate-800 text-slate-400 border-slate-700';
      default: return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  const renderRoleGroup = (title: string, paths: CareerPath[]) => {
    if (paths.length === 0) return null;
    return (
      <div className="space-y-6">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 border-b border-slate-900 pb-2">{title}</h2>
        <div className="grid gap-8">
          {paths.map((path, idx) => {
            const isOpen = selectedToolkit === path.role;
            return (
              <div key={idx} className={`bg-slate-900/40 border transition-all rounded-xl overflow-hidden ${isOpen ? 'border-[#D4AF37]/40 shadow-xl' : 'border-slate-800 hover:border-slate-700'}`}>
                <div className="p-8 cursor-pointer" onClick={() => selectRole(path)}>
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                    <h3 className="text-xl font-bold text-white">{path.role}</h3>
                    <div className={`px-2.5 py-1 rounded border text-[10px] font-bold uppercase tracking-widest ${getReadinessStyles(path.readinessLabel)}`}>
                      {path.readinessLabel}
                    </div>
                  </div>
                  
                  <p className="text-sm text-slate-400 mb-6 leading-relaxed italic border-l-2 border-slate-800 pl-4 py-1">
                    {path.justification}
                  </p>
                  
                  <div className="mb-6">
                    <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Diagnostic Assessment</h5>
                    <div className="bg-black/20 p-4 rounded-lg border border-slate-800/50">
                      <ul className="space-y-2">
                        <li className="text-slate-300 text-sm flex gap-3"><span className="text-[#D4AF37]">•</span>{path.readinessExplanation}</li>
                      </ul>
                      <p className="text-slate-400 text-xs mt-3 leading-relaxed">{path.whyFit}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                     <div className="flex gap-2">
                      {path.roleTypes.map((type, i) => (
                        <span key={i} className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 bg-slate-950 text-[#D4AF37] border border-slate-800 rounded">{type}</span>
                      ))}
                    </div>
                    <span className={`text-xs font-bold uppercase tracking-widest ${isOpen ? 'text-[#D4AF37]' : 'text-slate-500'} transition-colors`}>
                      {isOpen ? "Close Strategy" : "View Pivot Strategy"}
                    </span>
                  </div>
                </div>

                {isOpen && (
                  <div className="bg-slate-950 border-t border-slate-800 p-8 space-y-12 animate-in fade-in duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-6">
                        <div>
                          <h5 className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest mb-3">Core Transferable Skills</h5>
                          <div className="flex flex-wrap gap-2">
                            {path.transferableSkills.map((skill, sIdx) => (
                              <span key={sIdx} className="px-3 py-1 bg-slate-900 text-slate-300 text-[11px] rounded border border-slate-800">{skill}</span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Day-to-day Realities</h5>
                          <ul className="space-y-2">
                            {path.realityCheck.map((reality, rIdx) => (
                              <li key={rIdx} className="text-slate-300 text-xs flex gap-3"><span className="text-slate-700">•</span>{reality}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="bg-black/40 p-5 rounded border border-slate-800">
                          <h5 className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest mb-3">Action Steps</h5>
                          <ul className="space-y-3">
                            {path.practicalNextSteps.map((step, pIdx) => (
                              <li key={pIdx} className="text-slate-300 text-xs leading-relaxed flex gap-3"><span className="text-[#D4AF37] shrink-0">{pIdx+1}.</span>{step}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {path.learningResources && path.learningResources.length > 0 && (
                      <div className="pt-8 border-t border-slate-900">
                        <h5 className="text-[10px] font-bold text-white uppercase tracking-widest mb-6">What would actually help you move toward this role</h5>
                        {path.readinessLabel === 'Exploratory Only' && (
                          <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-6 italic">Note: This role is included for awareness only. It currently requires significant upskilling or responsibility jumps.</p>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {path.learningResources.map((resource, resIdx) => (
                            <a 
                              key={resIdx}
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group p-5 bg-slate-900/50 border border-slate-800 rounded-lg hover:border-[#D4AF37]/50 transition-all flex flex-col justify-between"
                            >
                              <div>
                                <div className="flex justify-between items-start mb-2">
                                  <h6 className="text-sm font-bold text-white group-hover:text-[#D4AF37] transition-colors">{resource.title}</h6>
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-slate-600 group-hover:text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                  </svg>
                                </div>
                                <p className="text-xs text-slate-400 leading-relaxed mb-4">{resource.whyItMatters}</p>
                              </div>
                              <span className="text-[9px] font-bold uppercase tracking-widest text-slate-600 group-hover:text-slate-400 transition-colors">Open Resource</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="pt-10 border-t border-slate-900">
                      <div className="bg-slate-900/40 border border-[#D4AF37]/20 p-8 rounded-xl text-center">
                        <p className="text-sm text-slate-400 mb-8 max-w-xl mx-auto">Prepare application materials for the active role: <strong>{path.role}</strong>.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
                          <Button variant="outline" className="text-xs" onClick={() => handleAction(path, 'cv')}>Generate CV</Button>
                          <Button variant="outline" className="text-xs" onClick={() => handleAction(path, 'coverLetter')}>Generate Cover Letter</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const strongMatches = result?.suggestedPaths.filter(p => p.readinessLabel === 'Ready Now') || [];
  const possibleMatches = result?.suggestedPaths.filter(p => p.readinessLabel === 'Near Ready') || [];
  const stretchOptions = result?.suggestedPaths.filter(p => p.readinessLabel === 'Exploratory Only') || [];

  if (showOnboarding) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center animate-in fade-in duration-500">
        <h2 className="text-2xl font-bold text-white mb-6">Select your current career stage</h2>
        <p className="text-slate-400 mb-10 text-sm">Recommendations and language are specifically tuned to your experience level.</p>
        <div className="space-y-4">
          <button 
            onClick={() => handleExpLevelSelect(ExperienceLevel.GRADUATE)}
            className="w-full p-6 bg-slate-900 border border-slate-800 rounded-xl hover:border-[#D4AF37] transition-all text-left group"
          >
            <div className="font-bold text-white mb-1 group-hover:text-[#D4AF37] transition-colors">Fresh Graduate / Early Career</div>
            <div className="text-xs text-slate-500">0–2 years experience. Focusing on junior, entry-level, and associate pathways.</div>
          </button>
          <button 
            onClick={() => handleExpLevelSelect(ExperienceLevel.MID_CAREER)}
            className="w-full p-6 bg-slate-900 border border-slate-800 rounded-xl hover:border-[#D4AF37] transition-all text-left group"
          >
            <div className="font-bold text-white mb-1 group-hover:text-[#D4AF37] transition-colors">Mid Career Professional</div>
            <div className="text-xs text-slate-500">3+ years experience. Focusing on lateral pivots and role-specific transitions.</div>
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <StateIndicator 
        stage={formData.experienceLevel} 
        activeRole={activeRole} 
        onChangeStage={() => setShowOnboarding(true)}
      />
      
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Explore Career Paths</h1>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Review roles grouped by their diagnostic readiness indicators.
          </p>
        </div>

        {showForm && (
          <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-xl mb-16 shadow-xl animate-in fade-in slide-in-from-top-4">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Professional Background</label>
                <textarea
                  className="w-full bg-slate-950 border border-slate-800 rounded-md p-4 text-white focus:outline-none focus:ring-1 focus:ring-[#D4AF37] transition-all min-h-[160px] leading-relaxed text-sm"
                  placeholder={formData.experienceLevel === ExperienceLevel.GRADUATE 
                    ? "Describe academic projects, internships, and core coursework..." 
                    : "Describe your professional tenure, core responsibilities, and industry impact..."}
                  value={formData.background}
                  onChange={(e) => setFormData({ ...formData, background: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                    <span>Tenure</span>
                    <span className="text-[#D4AF37]">{formData.yearsOfExperience} Years</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="40"
                    step="1"
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                    value={formData.yearsOfExperience}
                    onChange={(e) => setFormData({ ...formData, yearsOfExperience: parseInt(e.target.value) })}
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Target Environment</label>
                  <div className="grid grid-cols-3 gap-2">
                    {Object.values(AreaOfInterest).map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        className={`py-2 px-1 rounded border text-[10px] font-bold uppercase tracking-wider transition-all ${
                          formData.interest === opt ? 'bg-[#D4AF37] text-black border-[#D4AF37]' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                        onClick={() => setFormData({ ...formData, interest: opt })}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Button type="submit" fullWidth disabled={loading}>
                  {loading ? "Analyzing..." : (result ? "Update Background" : "Identify Career Paths")}
                </Button>
                {result && (
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)} className="sm:w-1/3">Cancel</Button>
                )}
              </div>
            </form>
          </div>
        )}

        {loading && !result && (
          <div className="py-24 text-center">
            <div className="animate-pulse flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-2 border-slate-800 border-t-[#D4AF37] rounded-full animate-spin"></div>
              <p className="text-slate-500 text-sm">Identifying role matches for your {formData.experienceLevel} status...</p>
            </div>
          </div>
        )}

        {error && !loading && (
          <div className="bg-red-900/10 border border-red-900/30 p-8 rounded-lg text-center max-w-md mx-auto mb-12">
            <p className="text-red-400 text-sm mb-6">{error}</p>
            <Button onClick={handlePerformAnalysis} className="text-xs">Retry Analysis</Button>
          </div>
        )}

        {result && !showForm && (
          <div className="space-y-16 animate-in slide-in-from-bottom-4">
            <div className="bg-slate-900/30 border border-slate-800 p-4 rounded-lg text-center">
              <p className="text-xs text-slate-400">
                {formData.experienceLevel === ExperienceLevel.GRADUATE 
                  ? "Roles are sequenced strictly by diagnostic readiness: Ready Now first."
                  : "Roles are sequenced strictly by diagnostic readiness: Ready Now first."}
              </p>
            </div>

            {renderRoleGroup("Strong Matches", strongMatches)}
            {renderRoleGroup("Possible Matches", possibleMatches)}
            {renderRoleGroup("Stretch Options", stretchOptions)}

            <div className="text-center pt-12 border-t border-slate-900 flex flex-wrap justify-center gap-4">
              <Button variant="outline" onClick={() => setShowForm(true)} className="text-xs">Refine Background</Button>
              <Button variant="secondary" onClick={() => setShowOnboarding(true)} className="text-xs">Change Career Stage</Button>
              <Button variant="secondary" onClick={handleResetExploration} className="text-xs">Start a new career exploration</Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
