import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Target, Rocket, Users, HelpCircle } from "lucide-react"

export default function About() {
  return (
    <main className="container mx-auto py-12 px-4 md:px-6 lg:px-8 max-w-7xl">
      {/* Hero Section */}
      <section className="text-center mb-16 bg-white dark:bg-gray-950 rounded-xl shadow-lg p-8 md:p-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl mb-6 text-gray-900 dark:text-gray-50">
            Welcome to CodeDSA
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
            Welcome to CodeDSA, a modern, intuitive, and developer-friendly platform built for mastering Data Structures
            and Algorithms (DSA). Whether you're just beginning your journey into the world of competitive programming
            or preparing for your dream software engineering role, CodeDSA is the perfect place to practice, improve,
            and grow.
          </p>
          <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
            At CodeDSA, we believe that consistent practice and exposure to real coding problems are the keys to
            becoming a better programmer. Our platform is crafted with simplicity, performance, and practicality in mind
            — helping you focus on what matters most: solving problems.
          </p>
        </div>
        <div className="mt-12 flex justify-center">
          <img
            src="/placeholder.svg?height=450&width=800"
            width={800}
            height={450}
            alt="CodeDSA platform overview"
            className="rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800"
          />
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="mb-16">
        <Card className="bg-white dark:bg-gray-900 shadow-lg border border-gray-200 dark:border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-4 text-4xl font-bold text-blue-600 dark:text-blue-400">
              <Target className="h-10 w-10" /> Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            <p className="mb-4">
              Our mission is simple yet powerful — to make DSA learning accessible, practical, and results-driven.
            </p>
            <p className="mb-4">
              We aim to empower students, professionals, and self-learners by offering a platform that:
            </p>
            <ul className="space-y-3 ml-6 list-none">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <span>Encourages daily problem-solving,</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <span>Provides real-time coding experience with instant feedback,</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <span>And allows users to track their coding journey over time.</span>
              </li>
            </ul>
            <p className="mt-4">
              By combining a clean interface with powerful features, CodeDSA fosters an engaging environment where
              learning DSA becomes enjoyable, structured, and goal-oriented.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Key Features Section */}
      <section className="mb-16">
        <Card className="bg-white dark:bg-gray-900 shadow-lg border border-gray-200 dark:border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-4 text-4xl font-bold text-blue-600 dark:text-blue-400">
              <Rocket className="h-10 w-10" /> Key Features of CodeDSA
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700 dark:text-gray-300 text-lg">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <span>
                  <span className="font-semibold">Solve Curated Problems:</span> Tackle a diverse set of coding problems
                  covering all essential topics in Data Structures and Algorithms — from arrays and linked lists to
                  graphs and dynamic programming.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <span>
                  <span className="font-semibold">Code & Submit with Real-time Feedback:</span> Write code in the
                  built-in editor, run it against custom or provided test cases, and get instant verdicts like
                  &quot;Accepted&quot;, &quot;Wrong Answer&quot;, or &quot;Time Limit Exceeded&quot;.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <span>
                  <span className="font-semibold">View Submissions & Track Progress:</span> Every submission is saved
                  under your profile. You can view past attempts, debug failures, and measure how far you&apos;ve come.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <span>
                  <span className="font-semibold">Problem Discussions & Insights (Upcoming):</span> Engage in
                  problem-specific discussions to learn new techniques, optimizations, and alternate approaches.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <span>
                  <span className="font-semibold">Test Case Output & Debugging:</span> See where your code fails by
                  comparing expected vs actual output, helping you learn from mistakes.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <span>
                  <span className="font-semibold">Search & Filter (Coming Soon):</span> Easily find problems based on
                  difficulty level, topic tags, or completion status.
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* Who Is CodeDSA For? Section */}
      <section className="mb-16 flex flex-col md:flex-row items-center gap-12">
        <div className="w-full md:w-1/2">
          <Card className="bg-white dark:bg-gray-900 shadow-lg border border-gray-200 dark:border-gray-800 h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-4 text-4xl font-bold text-blue-600 dark:text-blue-400">
                <Users className="h-10 w-10" /> Who Is CodeDSA For?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300 text-lg">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <span>Students preparing for university exams, coding competitions, and technical interviews.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <span>
                    Software developers who want to refresh their algorithmic thinking and problem-solving approach.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <span>
                    Teachers and mentors looking for a clean and effective platform to guide their students in DSA.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <span>Freshers and job seekers aiming to crack interviews at top tech companies.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <span>Self-taught programmers who want to build strong algorithmic foundations.</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <img
            src="/placeholder.svg?height=400&width=600"
            width={600}
            height={400}
            alt="People collaborating and learning"
            className="rounded-xl shadow-xl border border-gray-200 dark:border-gray-800"
          />
        </div>
      </section>

      {/* Frequently Asked Questions Section */}
      <section>
        <Card className="bg-white dark:bg-gray-900 shadow-lg border border-gray-200 dark:border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-4 text-4xl font-bold text-blue-600 dark:text-blue-400">
              <HelpCircle className="h-10 w-10" /> Frequently Asked Questions (FAQs)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-xl font-semibold text-left">
                  Q: Is CodeDSA free to use?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                  A: Yes, CodeDSA is currently 100% free. Our goal is to make DSA practice accessible to everyone,
                  regardless of background.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-xl font-semibold text-left">
                  Q: Why should I create an account?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                  A: Creating an account unlocks features like saving submissions, viewing your past activity, tracking
                  your performance, and receiving personalized problem recommendations.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-xl font-semibold text-left">
                  Q: Which languages are supported?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                  A: At present, you can write code in C++, Java, and Python. More languages will be added based on user
                  feedback.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-xl font-semibold text-left">
                  Q: Are new problems added regularly?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                  A: We continuously add new problems, improve existing ones, and introduce new features to make your
                  experience better.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-xl font-semibold text-left">
                  Q: Can I contribute to CodeDSA?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                  A: Yes! If you're interested in contributing problems, suggesting features, or collaborating as a
                  developer or content creator, we’d love to hear from you.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
