import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Circle, CheckCircle2, Clock } from 'lucide-react';

const ProblemCard = ({ problem, index, isSolved = false, isAttempted = false }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/problems/${problem?.title}`, {
      state: problem?._id
    });
  };

  return (
    <div
      onClick={handleNavigate}
      className={`group flex items-center justify-between px-4 py-3.5 border-b border-neutral-100 dark:border-[#2a2a2a] hover:bg-neutral-50 dark:hover:bg-[#262626] transition-colors cursor-pointer select-none ${
        index % 2 === 0 ? 'bg-white dark:bg-[#1f1f1f]' : 'bg-neutral-50/50 dark:bg-[#1a1a1a]'
      }`}
    >
      {/* Left: Status Icon & Title */}
      <div className="flex items-center gap-3 min-w-0 flex-1 pr-4">
        {isSolved ? (
          <CheckCircle2 className="w-4 h-4 text-[#00b8a3] flex-shrink-0" />
        ) : isAttempted ? (
          <Clock className="w-4 h-4 text-amber-500 flex-shrink-0" />
        ) : (
          <Circle className="w-4 h-4 text-neutral-300 dark:text-neutral-600 flex-shrink-0 group-hover:text-neutral-400 dark:group-hover:text-neutral-500 transition" />
        )}
        
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-[#00b8a3] transition truncate">
            {index + 1}. {problem?.title}
          </p>
        </div>
      </div>

      {/* Middle/Right: Topic & Difficulty & Status */}
      <div className="flex items-center gap-4 sm:gap-8 flex-shrink-0">
        {problem?.topic && (
          <span className="hidden md:inline-block text-xs font-medium text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-[#2a2a2a] px-2.5 py-0.5 rounded-full max-w-[120px] truncate">
            {problem.topic}
          </span>
        )}

        <span
          className={`text-xs font-medium w-16 text-left ${
            problem?.difficulty === 'Easy'
              ? 'text-[#00b8a3]'
              : problem?.difficulty === 'Medium'
              ? 'text-[#ffc01e]'
              : problem?.difficulty === 'Hard'
              ? 'text-[#ff375f]'
              : 'text-neutral-400'
          }`}
        >
          {problem?.difficulty}
        </span>

        {/* Status column matching table header */}
        <div className="hidden sm:flex items-center justify-end w-16">
          {isSolved ? (
            <span className="text-[11px] font-semibold text-[#00b8a3] bg-[#00b8a3]/10 border border-[#00b8a3]/20 px-2 py-0.5 rounded-full">
              Solved
            </span>
          ) : isAttempted ? (
            <span className="text-[11px] font-semibold text-amber-500 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
              Tried
            </span>
          ) : (
            <span className="text-xs text-neutral-400 dark:text-neutral-600 font-normal">
              —
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProblemCard;
