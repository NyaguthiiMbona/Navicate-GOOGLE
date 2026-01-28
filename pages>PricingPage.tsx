
import React from 'react';
import { Button } from '../components/Button';

export const PricingPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20 animate-in fade-in duration-700">
      <div className="text-center mb-24">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Career Mapping and Material Generation
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
          Access realistic career path analysis and role-specific material generation. Paid plans increase usage volume.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
        {/* Free Plan */}
        <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-xl flex flex-col h-full transition-all hover:border-slate-700">
          <div className="mb-8">
            <h3 className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest mb-2">Free Plan</h3>
            <div className="text-2xl font-bold text-white mb-1">USD 0</div>
            <p className="text-xs text-slate-500 italic">Core exploration and basic usage.</p>
          </div>
          <ul className="space-y-4 mb-12 flex-grow">
            <li className="flex items-start gap-3 text-sm text-slate-300">
              <span className="text-[#D4AF37] mt-0.5">•</span>
              <span>Career path exploration</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-slate-300">
              <span className="text-[#D4AF37] mt-0.5">•</span>
              <span>Readiness diagnostic indicators</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-slate-300">
              <span className="text-[#D4AF37] mt-0.5">•</span>
              <span>1 generation per day</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-slate-300">
              <span className="text-[#D4AF37] mt-0.5">•</span>
              <span>Full Career Mode access</span>
            </li>
          </ul>
          <div className="space-y-4">
            <Button variant="outline" fullWidth disabled>Active Plan</Button>
          </div>
        </div>

        {/* Starter Plan */}
        <div className="bg-slate-900/60 border border-slate-700 p-8 rounded-xl flex flex-col h-full shadow-2xl scale-105 z-10">
          <div className="mb-8">
            <h3 className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest mb-2">Starter Plan</h3>
            <div className="text-2xl font-bold text-white mb-1">USD 9 <span className="text-sm font-normal text-slate-500">/ mo</span></div>
            <p className="text-xs text-slate-500 italic">Increased generation volume.</p>
          </div>
          <ul className="space-y-4 mb-12 flex-grow">
            <li className="flex items-start gap-3 text-sm text-slate-300">
              <span className="text-[#D4AF37] mt-0.5">•</span>
              <span>All Free Plan features</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-slate-300">
              <span className="text-[#D4AF37] mt-0.5">•</span>
              <span>5 generations per day</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-slate-300">
              <span className="text-[#D4AF37] mt-0.5">•</span>
              <span>Multi-role support</span>
            </li>
          </ul>
          <Button fullWidth>Select Plan</Button>
        </div>

        {/* Pro Plan */}
        <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-xl flex flex-col h-full transition-all hover:border-slate-700">
          <div className="mb-8">
            <h3 className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest mb-2">Pro Plan</h3>
            <div className="text-2xl font-bold text-white mb-1">USD 19 <span className="text-sm font-normal text-slate-500">/ mo</span></div>
            <p className="text-xs text-slate-500 italic">High-volume usage.</p>
          </div>
          <ul className="space-y-4 mb-12 flex-grow">
            <li className="flex items-start gap-3 text-sm text-slate-300">
              <span className="text-[#D4AF37] mt-0.5">•</span>
              <span>All Starter Plan features</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-slate-300">
              <span className="text-[#D4AF37] mt-0.5">•</span>
              <span>15 generations per day</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-slate-300">
              <span className="text-[#D4AF37] mt-0.5">•</span>
              <span>Saved history and versions</span>
            </li>
          </ul>
          <Button variant="secondary" fullWidth>Select Plan</Button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto mb-32 p-10 bg-slate-900/20 border border-slate-900 rounded-2xl">
        <h2 className="text-lg font-bold text-white mb-6 uppercase tracking-widest text-center">Generation Accounting</h2>
        <div className="space-y-6">
          <p className="text-sm text-slate-400 text-center">Usage is tracked per document creation or update:</p>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <li className="text-center p-4 border border-slate-800 rounded bg-black/40">
              <div className="text-xs font-bold text-[#D4AF37] mb-1">CV</div>
              <div className="text-xs text-slate-300">New document</div>
            </li>
            <li className="text-center p-4 border border-slate-800 rounded bg-black/40">
              <div className="text-xs font-bold text-[#D4AF37] mb-1">Cover Letter</div>
              <div className="text-xs text-slate-300">New document</div>
            </li>
            <li className="text-center p-4 border border-slate-800 rounded bg-black/40">
              <div className="text-xs font-bold text-[#D4AF37] mb-1">Regeneration</div>
              <div className="text-xs text-slate-300">Updating document</div>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-2xl mx-auto mb-32 text-center">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Diagnostic Accuracy</h2>
        <div className="space-y-4 text-sm text-slate-400 leading-relaxed">
          <p>
            Role recommendations are based on professional market patterns and user input. Accuracy is consistent across all plans.
          </p>
        </div>
      </div>
    </div>
  );
};
