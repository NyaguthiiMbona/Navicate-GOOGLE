import React from 'react';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';

export const PricingPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-24">
      <h1 className="text-4xl font-bold text-center text-white mb-4">
        Simple pricing for career moves
      </h1>
      <p className="text-center text-slate-400 mb-16">
        Built for people changing direction, not just updating documents.
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Free */}
        <div className="border border-slate-800 rounded-xl p-8 bg-slate-900/30">
          <h3 className="text-white font-bold mb-2">Free</h3>
          <p className="text-slate-400 text-sm mb-6">
            One free starter application
          </p>
          <ul className="text-sm text-slate-300 space-y-2 mb-8">
            <li>One CV</li>
            <li>One cover letter</li>
            <li>One role only</li>
          </ul>
          <Link to="/explore">
            <Button fullWidth>Start free</Button>
          </Link>
        </div>

        {/* One Role Pass */}
        <div className="border border-[#D4AF37] rounded-xl p-8 bg-slate-900/40 relative">
          <span className="absolute -top-3 right-4 text-[10px] bg-[#D4AF37] text-black px-3 py-1 rounded-full uppercase">
            Most popular
          </span>
          <h3 className="text-white font-bold mb-2">One Role Pass</h3>
          <p className="text-3xl font-bold text-white mb-6">$7</p>
          <ul className="text-sm text-slate-300 space-y-2 mb-8">
            <li>Unlimited regenerations</li>
            <li>One role</li>
            <li>Download and refine freely</li>
          </ul>
          <Button fullWidth>Unlock this role</Button>
        </div>

        {/* Career Switcher */}
        <div className="border border-slate-800 rounded-xl p-8 bg-slate-900/30">
          <h3 className="text-white font-bold mb-2">Career Switcher</h3>
          <p className="text-3xl font-bold text-white mb-6">$15</p>
          <ul className="text-sm text-slate-300 space-y-2 mb-8">
            <li>Multiple roles</li>
            <li>Unlimited CVs and cover letters</li>
            <li>Explore transferable skills and gaps</li>
          </ul>
          <Button fullWidth>Plan my switch</Button>
        </div>
      </div>

      <p className="text-center text-xs text-slate-500 mt-12">
        Prices shown in USD. Local currency available at checkout.
      </p>
    </div>
  );
};
