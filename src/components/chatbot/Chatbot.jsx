import React, { useEffect, useState, useRef, useMemo } from "react";
import { Send, Bot, User, Loader2, Copy, Check } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import { chatbotEndpoints, chatbotEndpoinst } from "@/services/api";

// ChatGPT-Style Code Block Component with full Syntax Highlighting
const CodeBlock = ({ language, code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlightedHtml = useMemo(() => {
    if (!code) return "";
    try {
      if (language && hljs.getLanguage(language)) {
        return hljs.highlight(code, { language, ignoreIllegals: true }).value;
      }
      return hljs.highlightAuto(code).value;
    } catch {
      return code;
    }
  }, [code, language]);

  return (
    <div className="my-3 rounded-lg overflow-hidden border border-neutral-700/80 bg-[#1e1e1e] shadow-md">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-3.5 py-1.5 bg-[#2d2d2d] border-b border-neutral-700/80 text-xs font-sans text-neutral-300 select-none">
        <span className="lowercase font-semibold text-neutral-300 tracking-wide">
          {language || "code"}
        </span>
        <button
          onClick={handleCopy}
          type="button"
          className="flex items-center gap-1.5 text-xs text-neutral-300 hover:text-white px-2 py-0.5 rounded hover:bg-neutral-700/60 transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check size={13} className="text-[#00b8a3]" />
              <span className="text-[#00b8a3] font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={13} />
              <span>Copy code</span>
            </>
          )}
        </button>
      </div>

      {/* Code Text with Atom One Dark Syntax Highlighting */}
      <div className="p-3.5 overflow-x-auto text-xs sm:text-[13px] font-mono leading-relaxed bg-[#1e1e1e]">
        <pre className="!bg-transparent !p-0 !m-0 font-mono whitespace-pre text-neutral-100">
          <code
            className={`hljs ${language ? `language-${language}` : ""} !bg-transparent !p-0`}
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          />
        </pre>
      </div>
    </div>
  );
};

// Helper to fix and format Markdown tables reliably
const preprocessMarkdown = (content) => {
  if (!content) return "";

  // Split content around code blocks to leave code fences untouched
  const codeBlockRegex = /(```[\s\S]*?```)/g;
  const parts = content.split(codeBlockRegex);

  for (let p = 0; p < parts.length; p++) {
    if (parts[p].startsWith("```")) {
      continue;
    }

    let text = parts[p];
    text = text.replace(/\|\s*\|/g, "|\n|");

    const lines = text.split("\n");
    const processedLines = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();
      const prevTrimmed = i > 0 ? lines[i - 1].trim() : "";

      const isTableRow = trimmed.startsWith("|") && (trimmed.endsWith("|") || trimmed.includes("|"));
      const wasPrevTableRow = prevTrimmed.startsWith("|") && (prevTrimmed.endsWith("|") || prevTrimmed.includes("|"));

      if (isTableRow && !wasPrevTableRow && prevTrimmed !== "" && i > 0) {
        processedLines.push("");
      }

      processedLines.push(line);

      const nextTrimmed = i < lines.length - 1 ? lines[i + 1].trim() : "";
      const isNextTableRow = nextTrimmed.startsWith("|") && (nextTrimmed.endsWith("|") || nextTrimmed.includes("|"));

      if (isTableRow && !isNextTableRow && nextTrimmed !== "" && i < lines.length - 1) {
        processedLines.push("");
      }
    }

    parts[p] = processedLines.join("\n");
  }

  return parts.join("");
};

// Markdown renderer with GFM Tables, Dark Mode support & LeetCode typography
const MarkdownRenderer = ({ content }) => {
  const processedContent = useMemo(() => preprocessMarkdown(content), [content]);

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        pre: ({ children }) => <>{children}</>,
        code: ({ inline, className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || "");
          const codeString = String(children).replace(/\n$/, "");

          if (!inline && (match || codeString.includes("\n"))) {
            return (
              <CodeBlock
                language={match ? match[1] : "code"}
                code={codeString}
              />
            );
          }

          return (
            <code
              className="bg-neutral-100 dark:bg-[#333333] text-[#00b8a3] dark:text-[#00b8a3] px-1.5 py-0.5 rounded text-xs font-mono font-medium border border-neutral-200 dark:border-neutral-700"
              {...props}
            >
              {children}
            </code>
          );
        },
        table: ({ children }) => (
          <div className="my-3 overflow-x-auto rounded-lg border border-neutral-200 dark:border-[#383838] bg-white dark:bg-[#1f1f1f] shadow-sm">
            <table className="w-full text-left text-xs border-collapse font-sans min-w-[320px]">
              {children}
            </table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-neutral-100/90 dark:bg-[#282828] border-b border-neutral-200 dark:border-[#383838] text-neutral-900 dark:text-neutral-100">
            {children}
          </thead>
        ),
        tbody: ({ children }) => (
          <tbody className="divide-y divide-neutral-100 dark:divide-[#333333] text-neutral-800 dark:text-neutral-200">
            {children}
          </tbody>
        ),
        tr: ({ children }) => (
          <tr className="hover:bg-neutral-50/80 dark:hover:bg-[#282828]/60 transition-colors">
            {children}
          </tr>
        ),
        th: ({ children }) => (
          <th className="px-3.5 py-2.5 text-xs font-semibold text-neutral-900 dark:text-neutral-100 border-r last:border-r-0 border-neutral-200 dark:border-[#383838]">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="px-3.5 py-2.5 text-xs text-neutral-700 dark:text-neutral-300 border-r last:border-r-0 border-neutral-100 dark:border-[#333333] leading-relaxed">
            {children}
          </td>
        ),
        h1: ({ children }) => (
          <h1 className="text-base font-bold text-neutral-900 dark:text-neutral-100 mt-3 mb-1 border-b border-neutral-200 dark:border-neutral-700 pb-1">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 mt-2.5 mb-1">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200 mt-2 mb-1">
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="mb-2 last:mb-0 leading-relaxed text-xs sm:text-sm text-neutral-800 dark:text-neutral-200">
            {children}
          </p>
        ),
        ul: ({ children }) => (
          <ul className="list-disc list-outside pl-4 space-y-1 my-2 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-outside pl-4 space-y-1 my-2 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200">
            {children}
          </ol>
        ),
        li: ({ children }) => (
          <li className="text-xs sm:text-sm leading-relaxed text-neutral-800 dark:text-neutral-200">
            {children}
          </li>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-neutral-900 dark:text-neutral-100">
            {children}
          </strong>
        ),
        hr: () => <hr className="my-2.5 border-neutral-200 dark:border-neutral-700" />,
      }}
    >
      {processedContent}
    </ReactMarkdown>
  );
};

const Chatbot = ({ problemId, messageHistory = [], setMessageHistory }) => {
  const [input, setInput] = useState("");
  const [streamingMessage, setStreamingMessage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const chatRef = useRef(null);

  const targetTextRef = useRef("");
  const displayedTextRef = useRef("");
  const isNetworkDoneRef = useRef(false);
  const streamTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (streamTimerRef.current) clearInterval(streamTimerRef.current);
    };
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isGenerating) return;

    const userPrompt = input.trim();
    setInput("");

    setMessageHistory((prev) => [...prev, { role: "user", message: userPrompt }]);
    setIsGenerating(true);
    setStreamingMessage("");

    targetTextRef.current = "";
    displayedTextRef.current = "";
    isNetworkDoneRef.current = false;

    if (streamTimerRef.current) clearInterval(streamTimerRef.current);

    streamTimerRef.current = setInterval(() => {
      const target = targetTextRef.current;
      const current = displayedTextRef.current;

      if (current.length < target.length) {
        const diff = target.length - current.length;
        let step = 1;
        if (diff > 180) step = 5;
        else if (diff > 80) step = 3;
        else if (diff > 35) step = 2;
        else step = 1;

        const next = target.slice(0, current.length + step);
        displayedTextRef.current = next;
        setStreamingMessage(next);
      } else if (isNetworkDoneRef.current) {
        clearInterval(streamTimerRef.current);
        streamTimerRef.current = null;

        if (target.length > 0) {
          setMessageHistory((prev) => [
            ...prev,
            { role: "system", message: target },
          ]);
        }
        setStreamingMessage("");
        setIsGenerating(false);
      }
    }, 24);

    try {
      const endpoint = (chatbotEndpoints && chatbotEndpoints.GET_CHATBOT) || (chatbotEndpoinst && chatbotEndpoinst.GET_CHATBOT);
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userPrompt, problemId }),
      });

      if (!response.ok) throw new Error("Failed to get chatbot response");

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const events = buffer.split("\n\n");
        buffer = events.pop() || "";

        for (const event of events) {
          const lines = event.split("\n");
          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;

            const dataStr = line.slice(6);
            if (dataStr.trim() === "[DONE]") {
              break;
            }

            try {
              const parsed = JSON.parse(dataStr);
              if (parsed && typeof parsed.text === "string") {
                targetTextRef.current += parsed.text;
              }
            } catch {
              targetTextRef.current += dataStr;
            }
          }
        }
      }

      isNetworkDoneRef.current = true;
    } catch (error) {
      console.error("Chatbot error:", error);
      if (streamTimerRef.current) clearInterval(streamTimerRef.current);
      streamTimerRef.current = null;
      setIsGenerating(false);
      setStreamingMessage("");
      setMessageHistory((prev) => [
        ...prev,
        { role: "system", message: "⚠️ Error generating response. Please try again." },
      ]);
    }
  };

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messageHistory, streamingMessage]);

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-neutral-50 dark:bg-[#202020] mt-2 rounded-lg border border-neutral-200 dark:border-[#383838] shadow-none overflow-hidden transition-colors font-sans">
      {/* Header */}
      <div className="p-3 bg-white dark:bg-[#282828] border-b border-neutral-200 dark:border-[#383838] flex items-center gap-2 font-medium text-xs text-neutral-800 dark:text-neutral-200">
        <Bot className="w-4 h-4 text-[#00b8a3]" />
        <span>AI Problem Assistant</span>
      </div>

      {/* Messages Window */}
      <div ref={chatRef} className="flex-1 overflow-y-auto p-3.5 space-y-3.5">
        {messageHistory.length === 0 && !streamingMessage && (
          <div className="flex items-start gap-2">
            <div className="w-7 h-7 rounded-full bg-[#00b8a3]/10 flex items-center justify-center text-[#00b8a3] flex-shrink-0">
              <Bot size={15} />
            </div>
            <div className="bg-white dark:bg-[#282828] border border-neutral-200 dark:border-[#383838] p-3 rounded-lg text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-[85%]">
              Hello! 👋 Ask me anything about this DSA problem (hints, edge cases, time complexity, or approach).
            </div>
          </div>
        )}

        {/* History */}
        {messageHistory.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start gap-2 ${
              msg.role === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.role === "user"
                  ? "bg-[#00b8a3] text-white"
                  : "bg-[#00b8a3]/10 text-[#00b8a3]"
              }`}
            >
              {msg.role === "user" ? <User size={14} /> : <Bot size={14} />}
            </div>

            <div
              className={`p-3 rounded-lg text-xs leading-relaxed max-w-[85%] ${
                msg.role === "user"
                  ? "bg-[#00b8a3] text-white whitespace-pre-wrap"
                  : "bg-white dark:bg-[#282828] border border-neutral-200 dark:border-[#383838] text-neutral-800 dark:text-neutral-200"
              }`}
            >
              {msg.role === "user" ? (
                msg.message
              ) : (
                <MarkdownRenderer content={msg.message} />
              )}
            </div>
          </div>
        ))}

        {/* Live Streaming Message */}
        {streamingMessage && (
          <div className="flex items-start gap-2">
            <div className="w-7 h-7 rounded-full bg-[#00b8a3]/10 flex items-center justify-center text-[#00b8a3] flex-shrink-0 animate-pulse">
              <Bot size={14} />
            </div>
            <div className="bg-white dark:bg-[#282828] border border-neutral-200 dark:border-[#383838] p-3 rounded-lg text-xs leading-relaxed max-w-[85%]">
              <MarkdownRenderer content={streamingMessage} />
              <span className="inline-block w-1.5 h-3.5 ml-1 bg-[#00b8a3] animate-pulse align-middle" />
            </div>
          </div>
        )}

        {isGenerating && !streamingMessage && (
          <div className="flex items-center gap-2 text-xs text-neutral-400 pl-9">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-[#00b8a3]" /> Thinking...
          </div>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={onSubmit} className="p-2.5 bg-white dark:bg-[#282828] border-t border-neutral-200 dark:border-[#383838]">
        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            disabled={isGenerating}
            placeholder={isGenerating ? "AI is responding..." : "Ask a question..."}
            className="flex-1 px-3 py-1.5 text-xs bg-neutral-50 dark:bg-[#1e1e1e] text-neutral-900 dark:text-neutral-100 border border-neutral-200 dark:border-[#383838] rounded-md focus:outline-none focus:border-[#00b8a3] disabled:opacity-50 placeholder:text-neutral-400"
          />
          <button
            type="submit"
            disabled={isGenerating || !input.trim()}
            className="p-1.5 bg-[#00b8a3] hover:bg-[#00a390] disabled:opacity-50 text-white rounded-md transition cursor-pointer"
          >
            <Send size={14} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chatbot;
