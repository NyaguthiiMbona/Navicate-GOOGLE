import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { StateIndicator } from '../components/StateIndicator';
import {
  ApplicationMaterials,
  UserFormData,
  CareerPath,
  ExperienceLevel
} from '../types';
import { generateMaterials } from '../services/geminiService';

const FREE_USED_KEY = 'navicate_free_used';

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

  const targetRole =
    location.state?.targetRole || localStorage.getItem(ACTIVE_ROLE_KEY);

  const pathData = location.state?.pathData as CareerPath | undefined;

  const [type, setType] = useState<'cv' | 'coverLetter'>(
    location.state?.type === 'coverLetter' ? 'coverLetter' : 'cv'
  );

  const [materials, setMaterials] = useState<ApplicationMaterials | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPaywall, setShowPaywall] = useState(false);

  const freeUsed = localStorage.getItem(FREE_USED_KEY) === 'true';

  useEffect(() => {
    if (!sessionBackground?.background || !targetRole) {
      navigate('/explore');
    }
  }, [navigate, sessionBackground, targetRole]);

  const handleGenerate = async () => {
    if (!sessionBackground || !targetRole) return;

    if (freeUsed && materials) {
      setShowPaywall(true);
      return;
    }

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
      localStorage.setItem(FREE_USED_KEY, 'true');
    } catch {
      setError('Generation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = () => {
    setShowPaywall(true);
  };

  return (
    <>
      <StateIndicator
        stage={sessionBackground?.experienceLevel}
        activeRole={targetRole}
        onChangeRole={() => navigate('/explore')}
        onChangeStage={() => navigate('/explore')}
      />

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="mb-12 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Generate your {type === 'cv' ? 'CV' : 'Cover Letter'}
            </h1>
            <p className="text-slate-400 text-sm mt-2">
              One free application set per role.
            </p>
          </div>

          <Link to="/explore">
            <Button variant="outline" className="text-xs">
              Change role
            </Button>
          </Link>
        </div>

        {/* Preview */}
        {!materials && !loading && (
          <div className="max-w-2xl mx-auto bg-slate-900/50 border border-slate-800 rounded-xl">
            <div className="p-8 space-y-6">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">
                  Active role
                </p>
                <p className="text-white font-bold">{targetRole}</p>
              </div>

              {pathData?.transferableSkills && (
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-widest mb-2">
                    Key skills detected
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {pathData.transferableSkills.slice(0, 3).map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-slate-950 border border-slate-800 rounded text-xs text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <Button
                fullWidth
                onClick={handleGenerate}
                disabled={loading}
              >
                Generate free CV + cover letter
              </Button>

              <p className="text-[10px] text-slate-500 uppercase tracking-widest text-center">
                Includes one CV and one cover letter
              </p>
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="py-32 text-center">
            <div className="w-10 h-10 mx-auto border-2 border-slate-800 border-t-[#D4AF37] rounded-full animate-spin"></div>
            <p className="mt-6 text-slate-400 text-sm">
              Generating tailored materials…
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="max-w-md mx-auto bg-red-900/10 border border-red-900/30 p-6 rounded text-center">
            <p className="text-red-400 text-sm mb-4">{error}</p>
            <Button onClick={handleGenerate} className="text-xs">
              Retry
            </Button>
          </div>
        )}

        {/* Output */}
        {materials && !loading && (
          <div className="max-w-4xl mx-auto space-y-10">
            {materials.cv && (
              <div className="bg-slate-900/30 border border-slate-800 p-8 rounded-xl">
                <h2 className="text-xs uppercase tracking-widest font-bold mb-4">
                  CV draft
                </h2>
                <pre className="whitespace-pre-wrap text-sm text-slate-300">
                  {materials.cv.summary}
                </pre>
              </div>
            )}

            {materials.coverLetter && (
              <div className="bg-slate-900/30 border border-slate-800 p-8 rounded-xl">
                <h2 className="text-xs uppercase tracking-widest font-bold mb-4">
                  Cover letter
                </h2>
                <pre className="whitespace-pre-wrap text-sm text-slate-300">
                  {materials.coverLetter}
                </pre>
              </div>
            )}

            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="outline" onClick={() => window.print()} className="text-xs">
                Save as PDF
              </Button>
              <Button
                variant="secondary"
                onClick={handleRegenerate}
                className="text-xs"
              >
                Regenerate (Locked)
              </Button>
              <Link to="/explore">
                <Button variant="primary" className="text-xs">
                  Explore other roles
                </Button>
              </Link>
            </div>

            <p className="text-center text-[10px] text-slate-500 uppercase tracking-widest">
              Regeneration and additional roles require a plan
            </p>
          </div>
        )}

        {/* Paywall */}
        {showPaywall && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl max-w-sm text-center">
              <h3 className="text-white font-bold mb-3">
                Regeneration is a paid feature
              </h3>
              <p className="text-sm text-slate-400 mb-6">
                Each regeneration creates a new tailored draft.
              </p>
              <div className="flex gap-3 justify-center">
                <Link to="/pricing">
                  <Button className="text-xs">View plans</Button>
                </Link>
                <Button
                  variant="outline"
                  className="text-xs"
                  onClick={() => setShowPaywall(false)}
                >
                  Keep current version
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
