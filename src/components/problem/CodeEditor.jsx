import React from "react";
import Editor from "@monaco-editor/react";
import {
  RotateCcw,
  Maximize2,
  Code2,
  Play,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const defaultLanguages = [
  { lang: "javascript", code: "// JavaScript Solution\nfunction solve() {\n    \n}" },
  { lang: "python", code: "# Python Solution\nclass Solution:\n    def solve(self):\n        pass" },
  { lang: "cpp", code: "// C++ Solution\n#include <iostream>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        \n    }\n};" },
  { lang: "java", code: "// Java Solution\nclass Solution {\n    public void solve() {\n        \n    }\n}" },
];

const CodeEditor = ({
  setSize,
  initialCode,
  code,
  setCode,
  language,
  setLanguage,
  onRun,
  onSubmit,
  isRunning = false,
  isSubmitting = false,
}) => {
  const { isDark } = useTheme();

  const codeTemplates = (initialCode && initialCode.length > 0) ? initialCode : defaultLanguages;

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    const matched = codeTemplates.find((item) => item.lang.toLowerCase() === newLang.toLowerCase());
    if (matched && (!code || code.trim() === "")) {
      setCode(matched.code);
    }
  };

  const handleResetCode = () => {
    const matched = codeTemplates.find(
      (item) => item.lang.toLowerCase() === language.toLowerCase()
    );
    if (matched) {
      setCode(matched.code);
    } else if (codeTemplates.length > 0) {
      setCode(codeTemplates[0].code);
    }
  };

  const getMonacoLanguage = (lang) => {
    switch (lang?.toLowerCase()) {
      case "cpp":
      case "c++":
        return "cpp";
      case "python":
      case "py":
        return "python";
      case "javascript":
      case "js":
        return "javascript";
      case "typescript":
      case "ts":
        return "typescript";
      case "java":
        return "java";
      case "c":
        return "c";
      default:
        return "javascript";
    }
  };

  return (
    <div className="w-full h-full flex flex-col rounded-lg shadow-xs border border-neutral-200 dark:border-[#333333] bg-white dark:bg-[#1e1e1e] overflow-hidden transition-colors">
      {/* Top Toolbar */}
      <div className="px-3 py-1.5 bg-neutral-50 dark:bg-[#202020] border-b border-neutral-200 dark:border-[#333333] flex items-center justify-between">
        {/* Language Selector */}
        <div className="flex items-center gap-1.5">
          <Code2 size={14} className="text-[#00b8a3]" />
          <Select onValueChange={handleLanguageChange} value={language || "javascript"}>
            <SelectTrigger className="w-[125px] h-7 text-xs font-medium capitalize bg-white dark:bg-[#282828] border-neutral-200 dark:border-[#383838] text-neutral-800 dark:text-neutral-200 rounded-md shadow-none cursor-pointer focus:ring-1 focus:ring-[#00b8a3]">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-[#282828] border-neutral-200 dark:border-[#383838] shadow-lg">
              {codeTemplates.map((obj, ind) => (
                <SelectItem
                  key={ind}
                  value={obj.lang}
                  className="capitalize text-xs cursor-pointer font-medium focus:bg-neutral-100 dark:focus:bg-[#333333]"
                >
                  {obj.lang}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-1">
          <button
            className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-[#282828] rounded-md transition cursor-pointer"
            onClick={handleResetCode}
            title="Reset code to default"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
          {setSize && (
            <button
              className="p-1 hover:bg-neutral-100 dark:hover:bg-[#282828] rounded-md text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition cursor-pointer"
              onClick={() => setSize(100)}
              title="Expand Editor"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Monaco Editor Container */}
      <div className="flex-1 relative bg-white dark:bg-[#1e1e1e]">
        <Editor
          height="100%"
          theme={isDark ? "vs-dark" : "light"}
          defaultLanguage="javascript"
          language={getMonacoLanguage(language)}
          value={code}
          onChange={(value) => setCode(value || "")}
          options={{
            fontSize: 13.5,
            lineHeight: 21,
            fontFamily:
              "'JetBrains Mono', 'Fira Code', Menlo, Monaco, Consolas, 'Courier New', monospace",
            fontLigatures: true,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            bracketPairColorization: { enabled: true },
            padding: { top: 12, bottom: 12 },
            lineNumbersMinChars: 3,
            cursorBlinking: "smooth",
            cursorSmoothCaretAnimation: "on",
            smoothScrolling: true,
            tabSize: 4,
          }}
        />

        {/* Mobile Run & Submit overlay */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2 sm:hidden bg-white/95 dark:bg-[#282828]/95 backdrop-blur p-1.5 rounded-lg shadow-lg border border-neutral-200 dark:border-[#383838] z-20">
          <button
            onClick={onRun}
            disabled={isRunning || isSubmitting}
            className="flex items-center gap-1.5 bg-neutral-100 dark:bg-[#333333] text-neutral-800 dark:text-neutral-200 px-3 py-1.5 rounded-md text-xs font-medium transition cursor-pointer disabled:opacity-50"
          >
            {isRunning ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-[#00b8a3]" />
            ) : (
              <Play className="w-3.5 h-3.5 text-[#00b8a3] fill-[#00b8a3]" />
            )}
            <span>Run</span>
          </button>
          <button
            onClick={onSubmit}
            disabled={isRunning || isSubmitting}
            className="flex items-center gap-1.5 bg-[#00b8a3] hover:bg-[#00a390] text-white px-3.5 py-1.5 rounded-md text-xs font-medium transition cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
            ) : (
              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
            )}
            <span>Submit</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
