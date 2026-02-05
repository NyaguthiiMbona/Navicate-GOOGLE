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
    } catch (err) {
      setError("Generation failed. Please check your connection and try again.");
      setShowPreview(true);
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = () => {
    handleTriggerGeneration();
  };

  const handleExport = () => {
    if (hasReachedLimit()) {
      navigate('/pricing');
      return;
    }

    incrementGenerationCount();
    setLimitReached(hasReachedLimit());
    window.print();
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
              <Link to="/explore" className="text-xs text-slate-500 hover:text-[#D4AF37] uppercase tracking-widest font-bold transition-colors">Explore Paths</Link>
              <span className="text-slate-800">/</span>
              <span className="text-xs text-slate-300 uppercase tracking-widest font-bold">Action Stage</span>
            </div>
            <h1 className="text-3xl font-bold text-white">
              Generate Your {type === 'cv' ? 'CV' : 'Cover Letter'}
            </h1>
          </div>
          
          <Link to="/explore">
            <Button variant="outline" className="text-xs whitespace-nowrap">
              Change career path or role
            </Button>
          </Link>
        </div>

        {limitReached && !materials && showPreview && !loading && (
          <div className="mb-12 p-8 bg-slate-900/50 border border-slate-800 rounded-xl text-center">
            <h3 className="text-white font-bold mb-2">Export Limit Reached</h3>
            <p className="text-sm text-slate-400 mb-6 max-w-lg mx-auto">
              You’ve used your free daily export. You can still generate and review documents, but exporting is locked until tomorrow.
            </p>
            <Link to="/pricing">
              <Button variant="primary" className="text-xs px-10">
                View Plans
              </Button>
            </Link>
          </div>
        )}

        {showPreview && !materials && !loading && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
              <div className="p-8 border-b border-slate-800">
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-8 text-center">
                  Generation Preview
                </h2>

                <div className="space-y-8">
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <label className="text-[10px] font-bold text-[#D4AF37] uppercase block mb-2 tracking-widest">
                        Active Role
                      </label>
                      <p className="text-sm text-white font-bold">{targetRole}</p>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-[#D4AF37] uppercase block mb-2 tracking-widest">
                        Experience
                      </label>
                      <p className="text-sm text-white font-bold">
                        {sessionBackground?.yearsOfExperience} Years
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-black/20">
                <Button
                  fullWidth
                  onClick={handleTriggerGeneration}
                  className="text-xs"
                >
                  Generate {type === 'cv' ? 'CV' : 'Cover Letter'}
                </Button>
                <p className="mt-4 text-[10px] text-slate-500 uppercase font-bold tracking-widest text-center">
                  Preview is free. Export counts toward daily limit.
                </p>
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className="py-32 text-center">
            <p className="text-white text-sm font-bold">
              Generating tailored output for {targetRole}...
            </p>
          </div>
        )}

        {error && (
          <div className="text-center text-red-400 text-sm mt-8">
            {error}
          </div>
        )}

        {materials && !loading && (
          <div className="space-y-12">
            <div className="max-w-4xl mx-auto">

              {materials.cv && type === 'cv' && (
                <div className="bg-slate-900/30 border border-slate-800 p-8 rounded-xl space-y-8">
                  <pre className="whitespace-pre-wrap text-sm text-slate-300">
                    {materials.cv.summary}
                  </pre>
                </div>
              )}

              {materials.coverLetter && type === 'coverLetter' && (
                <div className="bg-slate-900/30 border border-slate-800 p-8 rounded-xl">
                  <pre className="whitespace-pre-wrap text-sm text-slate-300 font-serif">
                    {materials.coverLetter}
                  </pre>
                </div>
              )}

              <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={handleExport} variant="outline" className="text-xs px-10">
                  Save as PDF
                </Button>
                <Button onClick={handleRegenerate} variant="secondary" className="text-xs px-10">
                  Regenerate
                </Button>
                <Link to="/explore">
                  <Button variant="primary" className="text-xs px-10">
                    Explore Other Roles
                  </Button>
                </Link>
              </div>

            </div>
          </div>
        )}
      </div>
    </>
  );
};
