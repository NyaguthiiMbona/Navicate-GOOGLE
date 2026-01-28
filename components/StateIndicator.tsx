
import React from 'react';
import { ExperienceLevel } from '../types';

interface StateIndicatorProps {
  stage: ExperienceLevel | undefined;
  activeRole: string | null;
  onChangeStage: () => void;
  onChangeRole?: () => void;
}

export const StateIndicator: React.FC<StateIndicatorProps> = ({ 
  stage, 
  activeRole, 
  onChangeStage,
  onChangeRole 
}) => {
  if (!stage && !activeRole) return null;

  return (
    <div className="w-full bg-slate-900/50 border-b border-slate-800 backdrop-blur-sm sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 h-12 flex items-center justify-between overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-6 whitespace-nowrap">
          {stage && (
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Viewing as:</span>
              <span className="text-xs font-bold text-white">{stage}</span>
              <button 
                onClick={onChangeStage}
                className="text-[10px] gold-accent hover:underline uppercase font-bold ml-1"
              >
                Change
              </button>
            </div>
          )}
          {activeRole && (
            <div className="flex items-center gap-2 border-l border-slate-800 pl-6">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Target Role:</span>
              <span className="text-xs font-bold text-white">{activeRole}</span>
              {onChangeRole && (
                <button 
                  onClick={onChangeRole}
                  className="text-[10px] gold-accent hover:underline uppercase font-bold ml-1"
                >
                  Change
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
