
import React from 'react';
import { Button } from '../components/Button';

export const PricingPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20 animate-in fade-in duration-700">
      {/* Headline and Value Statement */}
      <div className="text-center mb-24">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Career clarity without guesswork.
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
          Navicate helps you explore realistic career paths and create role specific CVs and cover letters based on where you are today. No inflated promises. No generic advice.
        </p>
      </div>

      {/* Pricing Plans Table */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
        {/* Free Plan */}
        <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-xl flex flex-col h-full transition-all hover:border-slate-700">
          <div className="mb-8">
            <h3 className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest mb-2">Free Plan</h3>
            <div className="text-2xl font-bold text-white mb-1">USD 0</div>
            <p className="text-xs text-slate-500 italic">Exploring options and direction.</p>
          </div>
          <ul className="space-y-4 mb-12 flex-grow">
            <li className="flex items-start gap-3 text-sm text-slate-300">
              <span className="text-[#D4AF37] mt-0.5">•</span>
              <span>Career path exploration</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-slate-300">
              <span className="text-[#D4AF37] mt-0.5">•</span>
              <span>Role readiness labels</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-slate-300">
              <span className="text-[#D4AF37] mt-0.5">•</span>
              <span>1 CV + 1 cover letter generation per day</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-slate-300">
              <span className="text-[#D4AF37] mt-0.5">•</span>
              <span>Graduate and Mid Career Mode access</span>
            </li>
          </ul>
          <div className="space-y-4">
            <Button variant="outline" fullWidth>Current Plan</Button>
            <p className="text-[10px] text-slate-500 text-center leading-relaxed">
              For learning and testing direction, not mass applications.
            </p>
          </div>
        </div>

        {/* Starter Plan */}
        <div className="bg-slate-900/60 border border-slate-700 p-8 rounded-xl flex flex-col h-full shadow-2xl scale-105 z-10">
          <div className="mb-8">
            <h3 className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest mb-2">Starter Plan</h3>
            <div className="text-2xl font-bold text-white mb-1">USD 9 <span className="text-sm font-normal text-slate-500">/ month</span></div>
            <p className="text-xs text-slate-500 italic">Focused job seekers applying consistently.</p>
          </div>
          <ul className="space-y-4 mb-12 flex-grow">
            <li className="flex items-start gap-3 text-sm text-slate-300 font-medium">
              <span className="text-[#D4AF37] mt-0.5">•</span>
              <span>Everything in Free</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-slate-300">
              <span className="text-[#D4AF37] mt-0.5">•</span>
              <span>5 generations per day</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-slate-300">
              <span className="text-[#D4AF37] mt-0.5">•</span>
              <span>CV and cover letter for multiple roles</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-slate-300">
              <span className="text-[#D4AF37] mt-0.5">•</span>
              <span>Priority formatting and clarity improvements</span>
            </li>
          </ul>
          <Button fullWidth>Upgrade to Starter</Button>
        </div>

        {/* Pro Plan */}
        <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-xl flex flex-col h-full transition-all hover:border-slate-700">
          <div className="mb-8">
            <h3 className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest mb-2">Pro Plan</h3>
            <div className="text-2xl font-bold text-white mb-1">USD 19 <span className="text-sm font-normal text-slate-500">/ month</span></div>
            <p className="text-xs text-slate-500 italic">Career switchers and active applicants.</p>
          </div>
          <ul className="space-y-4 mb-12 flex-grow">
            <li className="flex items-start gap-3 text-sm text-slate-300 font-medium">
              <span className="text-[#D4AF37] mt-0.5">•</span>
              <span>Everything in Starter</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-slate-300">
              <span className="text-[#D4AF37] mt-0.5">•</span>
              <span>15 generations per day</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-slate-300">
              <span className="text-[#D4AF37] mt-0.5">•</span>
              <span>Faster output generation</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-slate-300">
              <span className="text-[#D4AF37] mt-0.5">•</span>
              <span>Advanced role readiness explanations</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-slate-300">
              <span className="text-[#D4AF37] mt-0.5">•</span>
              <span>Save and reuse role specific versions</span>
            </li>
          </ul>
          <Button variant="secondary" fullWidth>Get Pro Access</Button>
        </div>
      </div>

      {/* What counts as a generation */}
      <div className="max-w-3xl mx-auto mb-32 p-10 bg-slate-900/20 border border-slate-900 rounded-2xl">
        <h2 className="text-lg font-bold text-white mb-6 uppercase tracking-widest text-center">What counts as a generation</h2>
        <div className="space-y-6">
          <p className="text-sm text-slate-400 text-center">A generation is counted when:</p>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <li className="text-center p-4 border border-slate-800 rounded bg-black/40">
              <div className="text-xs font-bold text-[#D4AF37] mb-1">Step 1</div>
              <div className="text-xs text-slate-300">You create a CV</div>
            </li>
            <li className="text-center p-4 border border-slate-800 rounded bg-black/40">
              <div className="text-xs font-bold text-[#D4AF37] mb-1">Step 2</div>
              <div className="text-xs text-slate-300">You create a cover letter</div>
            </li>
            <li className="text-center p-4 border border-slate-800 rounded bg-black/40">
              <div className="text-xs font-bold text-[#D4AF37] mb-1">Step 3</div>
              <div className="text-xs text-slate-300">You regenerate either one</div>
            </li>
          </ul>
          <div className="pt-4 text-center">
            <p className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">
              Creating a CV and cover letter together counts as one generation.
            </p>
          </div>
        </div>
      </div>

      {/* Fair Use and Honesty Note */}
      <div className="max-w-2xl mx-auto mb-32 text-center">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Fair Use and Honesty Note</h2>
        <div className="space-y-4 text-sm text-slate-400 leading-relaxed">
          <p>
            Navicate is designed to help individuals think clearly about their next move and present themselves honestly. It is not intended for mass automated job applications or unrealistic role targeting.
          </p>
          <p>
            Role recommendations and documents are based on your inputs and current market patterns. Employment outcomes are not guaranteed.
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto pb-32">
        <h2 className="text-2xl font-bold text-white mb-12 text-center">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          <div>
            <h4 className="font-bold text-white mb-2">Can fresh graduates use Navicate for free?</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Yes. The free plan is designed to help early career users explore realistic entry points and create their first targeted applications.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-2">Why are there limits?</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Limits keep the tool fair, sustainable, and focused on thoughtful applications rather than spam.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-2">Can I switch between Graduate and Mid Career mode?</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Yes. You can update your experience level at any time in settings.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-2">Does Navicate apply for jobs for me?</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              No. Navicate helps you prepare. You stay in control of where and how you apply.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
