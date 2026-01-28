
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { StateIndicator } from '../components/StateIndicator';
import { ApplicationMaterials, UserFormData, CareerPath, ExperienceLevel } from '../types';
import { generateMaterials } from '../services/geminiService';
import { hasReachedLimit, incrementGenerationCount } from '../services/storageService';

export const MaterialsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const SESSION_KEY = 'navicate_session_background';
  const ACTIVE_ROLE_KEY = 'navicate_active_role';
  const EXP_LEVEL_KEY = 'navicate_exp_level';

  const [sessionBackground] = useState<UserFormData | null>(() => {
    const saved = localStorage.getItem(SESSION_KEY);
    const expLevel = localStorage.getItem(EXP_LEVEL_KEY) as ExperienceLevel | undefined;
    return saved ? { ...JSON.parse(saved), experienceLevel: expLevel } : null;
  });

  const targetRole = location.state?.targetRole || localStorage.getItem(ACTIVE_ROLE_KEY);
  const initialType = location.state?.type || 'cv';
  const [type, setType] = useState<'cv' | 'coverLetter'>(initialType === 'both' ? 'cv' : initialType);
  const pathData = location.state?.pathData as CareerPath | undefined;

  const [loading, setLoading] = useState(false);
  const [materials, setMaterials] = useState<ApplicationMaterials | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [limitReached, setLimitReached] = useState(() => hasReachedLimit());
  const [showPreview, setShowPreview] = useState(true);

  useEffect(() => {
    if (!sessionBackground?.background || !targetRole) {
      navigate('/explore');
      return;
    }
  }, [targetRole, navigate, sessionBackground]);

  const handleTriggerGeneration = async () => {
    if (!sessionBackground || !targetRole) return;
    if (limitReached && !materials) return;
    
    setShowPreview(false);
    setLoading(true);
    setError(null);
    try {
      const data = await generateMaterials(
        sessionBackground.background, 
        sessionBackground.yearsOfExperience, 
        targetRole, 
        type,
        sessionBackground.experienceLevel
      );
      setMaterials(data);
      incrementGenerationCount();
      setLimitReached(hasReachedLimit());
    } catch (err) {
      setError("Generation failed. Please retry.");
      setShowPreview(true);
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = () => {
    if (hasReachedLimit()) {
      setLimitReached(true);
      return;
    }
    handleTriggerGeneration();
  };

  return (
    <>
      <StateIndicator 
        stage={sessionBackground?.experienceLevel} 
        activeRole={targetRole} 
        onChangeStage={() => navigate('/explore')}
        onChangeRole={() => navigate('/explore')}
      />

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Link to="/explore" className="text-xs text-slate-500 hover:text-[#D4AF37] uppercase tracking-widest font-bold transition-colors">Explore</Link>
              <span className="text-slate-800">/</span>
              <span className="text-xs text-slate-300 uppercase tracking-widest font-bold">Action</span>
            </div>
            <h1 className="text-3xl font-bold text-white">
              {type === 'cv' ? 'CV' : 'Cover Letter'} Generation
            </h1>
          </div>
          
          <Link to="/explore">
            <Button variant="outline" className="text-xs whitespace-nowrap">
              Change Role
            </Button>
          </Link>
        </div>

        {limitReached && !materials && showPreview && !loading && (
          <div className="mb-12 p-8 bg-slate-900/50 border border-slate-800 rounded-xl text-center animate-in fade-in duration-500">
            <h3 className="text-white font-bold mb-2">Usage Limit Reached</h3>
            <p className="text-sm text-slate-400 mb-6 max-w-lg mx-auto leading-relaxed">
              You’ve used today’s free generation. Browsing remains available, but document generation is restricted until tomorrow.
            </p>
            <Link to="/pricing">
              <Button variant="primary" className="text-xs px-10">
                View Usage Plans
              </Button>
            </Link>
          </div>
        )}

        {showPreview && !materials && !loading && (
          <div className="max-w-2xl mx-auto animate-in fade-in zoom-in duration-300">
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
              <div className="p-8 border-b border-slate-800 bg-slate-900/30">
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-8 text-center">Diagnostic Preview</h2>
                <div className="space-y-10">
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <label className="text-[10px] font-bold text-[#D4AF37] uppercase block mb-2 tracking-widest">Target Role</label>
                      <p className="text-sm text-white font-bold">{targetRole}</p>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-[#D4AF37] uppercase block mb-2 tracking-widest">Experience</label>
                      <p className="text-sm text-white font-bold">{sessionBackground?.yearsOfExperience} Years</p>
                    </div>
                  </div>
                  
                  {pathData?.transferableSkills && (
                    <div>
                      <label className="text-[10px] font-bold text-[#D4AF37] uppercase block mb-3 tracking-widest">Detected Skills</label>
                      <div className="flex flex-wrap gap-2">
                        {pathData.transferableSkills.slice(0, 3).map((skill, i) => (
                          <span key={i} className="px-3 py-1 bg-slate-950 text-slate-300 text-xs rounded border border-slate-800">{skill}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="p-8 bg-black/20 flex flex-col items-center">
                <Button 
                  fullWidth 
                  onClick={handleTriggerGeneration}
                  disabled={limitReached}
                >
                  {limitReached ? 'Limit Reached' : `Generate ${type === 'cv' ? 'CV' : 'Cover Letter'}`}
                </Button>
                <p className="mt-4 text-[10px] text-slate-500 uppercase font-bold tracking-widest">
                  Counts as one generation
                </p>
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className="py-32 text-center">
            <div className="max-w-sm mx-auto space-y-6">
              <div className="flex justify-center">
                <div className="w-10 h-10 border-2 border-slate-800 border-t-[#D4AF37] rounded-full animate-spin"></div>
              </div>
              <p className="text-white text-sm font-bold">Generating {type.toUpperCase()} for {targetRole}...</p>
            </div>
          </div>
        )}

        {error && !loading && (
          <div className="bg-red-900/10 border border-red-900/30 p-8 rounded-lg text-center max-w-md mx-auto">
            <p className="text-red-400 text-sm mb-6">{error}</p>
            <Button onClick={handleTriggerGeneration} className="text-xs">Retry</Button>
          </div>
        )}

        {materials && !loading && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="max-w-4xl mx-auto">
              {materials.cv && type === 'cv' && (
                <div className="bg-slate-900/30 border border-slate-800 p-8 rounded-xl space-y-10">
                  <div className="border-b border-slate-800 pb-4">
                    <h2 className="text-[10px] font-bold text-white uppercase tracking-widest">Tailored CV</h2>
                  </div>
                  <div className="space-y-8">
                    <div>
                      <label className="text-[10px] font-bold text-[#D4AF37] uppercase block mb-3 tracking-widest">Summary</label>
                      <div className="w-full bg-slate-950/50 border border-slate-800 rounded-lg p-5 text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                        {materials.cv.summary}
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-[#D4AF37] uppercase block mb-3 tracking-widest">Experience</label>
                      <div className="space-y-3">
                        {materials.cv.experienceBullets.map((bullet, idx) => (
                          <div key={idx} className="w-full bg-slate-950/50 border border-slate-800 rounded-lg p-4 text-sm text-slate-300 leading-relaxed flex gap-3">
                            <span className="text-[#D4AF37] shrink-0">•</span>
                            {bullet}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-[#D4AF37] uppercase block mb-3 tracking-widest">Skills</label>
                      <div className="flex flex-wrap gap-2">
                        {materials.cv.skills.map((skill, idx) => (
                          <div key={idx} className="bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider text-slate-400">{skill}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {materials.coverLetter && type === 'coverLetter' && (
                <div className="bg-slate-900/30 border border-slate-800 p-8 rounded-xl space-y-8">
                  <div className="border-b border-slate-800 pb-4">
                    <h2 className="text-[10px] font-bold text-white uppercase tracking-widest">Cover Letter</h2>
                  </div>
                  <div className="bg-slate-950/50 border border-slate-800 rounded-lg p-8 text-sm text-slate-300 leading-relaxed whitespace-pre-wrap font-serif">
                    {materials.coverLetter}
                  </div>
                </div>
              )}

              <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => window.print()} variant="outline" className="text-xs px-10">Export PDF</Button>
                <Button onClick={handleRegenerate} variant="secondary" className="text-xs px-10" disabled={limitReached && !materials}>
                  Regenerate
                </Button>
                <Link to="/explore"><Button variant="primary" className="text-xs px-10">Explore Roles</Button></Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
