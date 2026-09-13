import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Circle, ArrowRight } from 'lucide-react';

const ProblemCard = ({ problem, index }) => {
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
      {/* Left: Status & Title */}
      <div className="flex items-center gap-3 min-w-0 flex-1 pr-4">
        <Circle className="w-4 h-4 text-neutral-300 dark:text-neutral-600 flex-shrink-0 group-hover:text-neutral-400 dark:group-hover:text-neutral-500 transition" />
        
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-[#00b8a3] transition truncate">
            {index + 1}. {problem?.title}
          </p>
        </div>
      </div>

      {/* Middle/Right: Topic & Difficulty */}
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

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNavigate();
          }}
          className="hidden sm:flex items-center gap-1 text-xs font-medium px-3 py-1 rounded bg-neutral-100 hover:bg-[#00b8a3] dark:bg-[#2c2c2c] dark:hover:bg-[#00b8a3] text-neutral-700 dark:text-neutral-300 hover:text-white dark:hover:text-white transition cursor-pointer"
        >
          <span>Solve</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

export default ProblemCard;
