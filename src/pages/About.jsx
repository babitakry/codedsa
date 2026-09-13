import Loading from "@/components/common/Loading";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Target, Rocket, HelpCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function About() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return !loading ? (
    <main className="container mx-auto py-10 px-4 md:px-6 lg:px-8 max-w-5xl font-sans text-neutral-800 dark:text-neutral-200">
      {/* Hero Section */}
      <section className="text-center mb-12 bg-white dark:bg-[#282828] border border-neutral-200 dark:border-[#383838] rounded-xl shadow-xs p-6 md:p-10">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-neutral-900 dark:text-neutral-100 tracking-tight">
            About <span className="text-[#00b8a3]">CodeDSA</span>
          </h1>
          <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
            CodeDSA is a modern, intuitive, and developer-friendly platform designed for mastering Data Structures and Algorithms. 
            Whether you're preparing for competitive coding or software engineering interviews, CodeDSA gives you the environment you need to excel.
          </p>
          <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Practice in real-time across multiple programming languages, track your solved problem statistics, and leverage AI hints whenever you need guidance.
          </p>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="mb-8">
        <div className="bg-white dark:bg-[#282828] border border-neutral-200 dark:border-[#383838] rounded-xl p-6 shadow-xs">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#00b8a3]/10 text-[#00b8a3] flex items-center justify-center">
              <Target className="h-4 w-4" />
            </div>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Our Mission</h2>
          </div>
          <div className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed space-y-3">
            <p>
              Our mission is to make algorithmic problem-solving accessible, structured, and rewarding for developers of all skill levels.
            </p>
            <ul className="space-y-2 ml-1 list-none">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#00b8a3] flex-shrink-0" />
                <span>Structured problem set with topic categorization and difficulty ratings</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#00b8a3] flex-shrink-0" />
                <span>Instant test case verification and execution output</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#00b8a3] flex-shrink-0" />
                <span>Personalized analytics dashboard to measure growth over time</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="mb-8">
        <div className="bg-white dark:bg-[#282828] border border-neutral-200 dark:border-[#383838] rounded-xl p-6 shadow-xs">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#ffc01e]/10 text-[#ffc01e] flex items-center justify-center">
              <Rocket className="h-4 w-4" />
            </div>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Key Features</h2>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm">
            <li className="flex items-start gap-2.5 p-3 rounded-lg bg-neutral-50 dark:bg-[#202020] border border-neutral-200/60 dark:border-[#333333]">
              <CheckCircle2 className="h-4 w-4 text-[#00b8a3] mt-0.5 flex-shrink-0" />
              <div>
                <strong className="text-neutral-900 dark:text-neutral-100 font-medium block">Curated Problemset</strong>
                Cover essential topics from Two Pointers to Dynamic Programming.
              </div>
            </li>
            <li className="flex items-start gap-2.5 p-3 rounded-lg bg-neutral-50 dark:bg-[#202020] border border-neutral-200/60 dark:border-[#333333]">
              <CheckCircle2 className="h-4 w-4 text-[#00b8a3] mt-0.5 flex-shrink-0" />
              <div>
                <strong className="text-neutral-900 dark:text-neutral-100 font-medium block">Real-time Compiler</strong>
                Execute code against multiple testcases with instant verdicts.
              </div>
            </li>
            <li className="flex items-start gap-2.5 p-3 rounded-lg bg-neutral-50 dark:bg-[#202020] border border-neutral-200/60 dark:border-[#333333]">
              <CheckCircle2 className="h-4 w-4 text-[#00b8a3] mt-0.5 flex-shrink-0" />
              <div>
                <strong className="text-neutral-900 dark:text-neutral-100 font-medium block">Progress Tracker</strong>
                Inspect your submission history and solved difficulty breakdown.
              </div>
            </li>
            <li className="flex items-start gap-2.5 p-3 rounded-lg bg-neutral-50 dark:bg-[#202020] border border-neutral-200/60 dark:border-[#333333]">
              <CheckCircle2 className="h-4 w-4 text-[#00b8a3] mt-0.5 flex-shrink-0" />
              <div>
                <strong className="text-neutral-900 dark:text-neutral-100 font-medium block">AI Assistant</strong>
                Get smart hints, edge-case analysis, and complexity advice.
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* FAQ Section */}
      <section>
        <div className="bg-white dark:bg-[#282828] border border-neutral-200 dark:border-[#383838] rounded-xl p-6 shadow-xs">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#3b82f6]/10 text-[#3b82f6] flex items-center justify-center">
              <HelpCircle className="h-4 w-4" />
            </div>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Frequently Asked Questions</h2>
          </div>
          <Accordion type="single" collapsible className="w-full text-xs sm:text-sm">
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-medium text-left">
                Is CodeDSA free to use?
              </AccordionTrigger>
              <AccordionContent className="text-neutral-600 dark:text-neutral-400">
                Yes, CodeDSA is free to practice and solve coding problems.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="font-medium text-left">
                Why should I create an account?
              </AccordionTrigger>
              <AccordionContent className="text-neutral-600 dark:text-neutral-400">
                Creating an account unlocks submission history, progress tracking, and personalized statistics.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="font-medium text-left">
                Which programming languages are supported?
              </AccordionTrigger>
              <AccordionContent className="text-neutral-600 dark:text-neutral-400">
                Currently C++, Java, Python, and JavaScript are supported in the workspace editor.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </main>
  ) : <Loading />;
}
