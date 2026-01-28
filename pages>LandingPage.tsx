
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleStart = () => navigate('/explore');
  const scrollToHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="py-24 md:py-40 px-4 max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
          Diagnostic career <br />
          <span className="text-[#D4AF37]">transition mapping</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Map professional experience to realistic tech and remote roles. 
          Identify skill alignment using diagnostic readiness indicators.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={handleStart} className="text-base px-10">
            Start exploration
          </Button>
          <Button onClick={scrollToHowItWorks} variant="outline" className="text-base px-10">
            How it works
          </Button>
        </div>
      </section>

      {/* How Outputs Work Section */}
      <section className="py-20 px-4 max-w-5xl mx-auto border-t border-slate-900">
        <h2 className="text-xl font-bold mb-12 text-center uppercase tracking-widest text-slate-400">System Outputs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest">CV Mapping</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Experience reframed for specific role requirements. Factual, outcome-driven formatting.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest">Cover Letters</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Three-paragraph documents following strict professional structural constraints.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest">Readiness Diagnostics</h4>
            <div className="space-y-3">
              <p className="text-slate-400 text-sm leading-relaxed">
                Roles are categorized by evidence-based accessibility:
              </p>
              <ul className="space-y-3 text-xs text-slate-400">
                <li><strong className="font-bold text-[#D4AF37]">Ready Now</strong> – high current alignment</li>
                <li><strong className="font-bold text-[#D4AF37]">Near Ready</strong> – manageable skill gaps</li>
                <li><strong className="font-bold text-[#D4AF37]">Exploratory Only</strong> – awareness only</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section id="how-it-works" className="py-24 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16 uppercase tracking-widest text-slate-600">Methodology</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="relative">
            <div className="text-5xl font-bold text-slate-800/50 mb-4">01</div>
            <h4 className="text-lg font-semibold text-white mb-2">Input Background</h4>
            <p className="text-slate-400 text-sm leading-relaxed">Establish tenure and core professional responsibilities.</p>
          </div>
          <div className="relative">
            <div className="text-5xl font-bold text-slate-800/50 mb-4">02</div>
            <h4 className="text-lg font-semibold text-white mb-2">Identify Paths</h4>
            <p className="text-slate-400 text-sm leading-relaxed">Analyze role matches grouped by diagnostic readiness.</p>
          </div>
          <div className="relative">
            <div className="text-5xl font-bold text-slate-800/50 mb-4">03</div>
            <h4 className="text-lg font-semibold text-white mb-2">Generate Materials</h4>
            <p className="text-slate-400 text-sm leading-relaxed">Produce role-specific CVs and cover letters for immediate use.</p>
          </div>
        </div>
      </section>

      {/* Final CTA & Future Note */}
      <section className="py-32 px-4 text-center">
        <Button onClick={handleStart} className="text-lg px-12">
          Start exploration
        </Button>
      </section>
    </div>
  );
};
