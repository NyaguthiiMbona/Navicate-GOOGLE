
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
          Map your experience to a <br />
          <span className="text-[#D4AF37]">realistic career transition</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Navicate translates your existing professional background into actionable paths for tech and remote-first roles. 
          Identify where your skills actually fit without the guesswork.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={handleStart} className="text-base px-10">
            Explore career paths
          </Button>
          <Button onClick={scrollToHowItWorks} variant="outline" className="text-base px-10">
            How it works
          </Button>
        </div>
      </section>

      {/* How Outputs Work Section */}
      <section className="py-20 px-4 max-w-5xl mx-auto border-t border-slate-900">
        <h2 className="text-xl font-bold mb-12 text-center uppercase tracking-widest text-slate-400">How Outputs Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest">CVs</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Your CV is tailored to the chosen role using your background and experience. One page, ATS-friendly, professional format.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest">Cover Letters</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Each cover letter targets your selected role and is phrased uniquely every time. Structure stays consistent, wording changes to highlight your skills.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest">Role Alignment Labels</h4>
            <div className="space-y-3">
              <p className="text-slate-400 text-sm leading-relaxed font-medium">
                Labels show how closely your current experience matches a role:
              </p>
              <ul className="space-y-3 text-xs text-slate-400">
                <li><strong className="font-bold text-[#D4AF37]">Strong Fit</strong> – high alignment with current strengths</li>
                <li><strong className="font-bold text-[#D4AF37]">Adjacent Fit</strong> – leverages transferable skills with minor gaps</li>
                <li><strong className="font-bold text-[#D4AF37]">Stretch Role</strong> – missing critical requirements for readiness</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Who this is for Section */}
      <section className="py-24 px-4 bg-slate-900/20 border-y border-slate-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-sm font-bold text-center mb-12 uppercase tracking-[0.2em] text-[#D4AF37]">Who this is for</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 border border-slate-800 bg-black/40 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-white">Mid-Career Professionals</h3>
              <p className="text-slate-400 text-sm leading-relaxed">For those looking to leverage established industry expertise in a new context through lateral pivots.</p>
            </div>
            <div className="p-8 border border-slate-800 bg-black/40 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-white">Modern Graduates</h3>
              <p className="text-slate-400 text-sm leading-relaxed">For recent graduates identifying practical entry points based on academic projects and early-career exposure.</p>
            </div>
            <div className="p-8 border border-slate-800 bg-black/40 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-white">Career Switchers</h3>
              <p className="text-slate-400 text-sm leading-relaxed">For professionals curious about transitioning into the digital economy seeking a clear, conservative starting point.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section id="how-it-works" className="py-24 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16">A grounded approach to pivoting</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="relative">
            <div className="text-5xl font-bold text-slate-800/50 mb-4">01</div>
            <h4 className="text-lg font-semibold text-white mb-2">Describe your background</h4>
            <p className="text-slate-400 text-sm leading-relaxed">Provide details on your current role, responsibilities, and professional experience.</p>
          </div>
          <div className="relative">
            <div className="text-5xl font-bold text-slate-800/50 mb-4">02</div>
            <h4 className="text-lg font-semibold text-white mb-2">Explore realistic paths</h4>
            <p className="text-slate-400 text-sm leading-relaxed">Review career roles specifically selected because they value the transferable skills you already possess.</p>
          </div>
          <div className="relative">
            <div className="text-5xl font-bold text-slate-800/50 mb-4">03</div>
            <h4 className="text-lg font-semibold text-white mb-2">Get honest guidance</h4>
            <p className="text-slate-400 text-sm leading-relaxed">Access practical toolkits covering skill gaps, core realities, and immediate action steps.</p>
          </div>
        </div>
      </section>

      {/* Differentiation Section */}
      <section className="py-24 px-4 bg-slate-900/30 border-t border-slate-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12">What makes Navicate different</h2>
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="mt-1 text-[#D4AF37]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-white">Focus on transferable skills</h4>
                <p className="text-slate-400 text-sm">We prioritize your established expertise and functional strengths over generic job titles.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="mt-1 text-[#D4AF37]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-white">Honest expectations</h4>
                <p className="text-slate-400 text-sm">Every suggestion includes conservative alignment assessments and insights into the actual day-to-day reality of the role.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="mt-1 text-[#D4AF37]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-white">Practical guidance</h4>
                <p className="text-slate-400 text-sm">Get specific, actionable advice on learning resources and stepping-stone roles instead of generic career tips.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA & Future Note */}
      <section className="py-32 px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to map your move?</h2>
        <Button onClick={handleStart} className="text-lg px-12 mb-12">
          Explore career paths
        </Button>
        <div className="pt-12 border-t border-slate-900 max-w-xl mx-auto">
          <p className="text-slate-500 text-xs tracking-wide uppercase font-medium">
            Application-ready CV and cover letter tools active now.
          </p>
        </div>
      </section>
    </div>
  );
};
