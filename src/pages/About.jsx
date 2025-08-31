import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Target, Rocket, HelpCircle } from "lucide-react"

export default function About() {
  return (
    <main className="container mx-auto py-12 px-4 md:px-6 lg:px-8 max-w-6xl">
      {/* Hero Section */}
      <section className="text-center mb-16 bg-white dark:bg-gray-950 rounded-xl shadow-md p-6 md:p-10">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl mb-4 text-gray-900 dark:text-gray-50">
            Welcome to CodeDSA
          </h1>
          <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            CodeDSA is a modern, intuitive, and developer-friendly platform for mastering Data Structures and Algorithms (DSA). 
            Whether you're starting your competitive programming journey or preparing for a software engineering role, this is the 
            perfect place to practice and grow.
          </p>
          <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            We believe consistent practice and exposure to real coding problems are the keys to becoming a better programmer. 
            Our platform is crafted with simplicity and performance in mind — helping you focus on solving problems.
          </p>
        </div>
        <div className="mt-10 flex justify-center">
          <img
            src="https://cdn.dribbble.com/userupload/23767519/file/original-77c50c1cc3f9e2d5d0832fddd9616a11.gif?height=450&width=800"
            width={700}
            height={400}
            alt="CodeDSA platform overview"
            className="rounded-xl shadow-lg"
          />
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="mb-12">
        <Card className="bg-white dark:bg-gray-900 shadow-md border-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl font-semibold text-blue-600 dark:text-blue-400">
              <Target className="h-8 w-8" /> Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
            <p className="mb-3">
              Our mission is simple — to make DSA learning accessible, practical, and results-driven.
            </p>
            <ul className="space-y-2 ml-5 list-none">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                <span>Encourages daily problem-solving</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                <span>Provides real-time coding experience with instant feedback</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                <span>Allows users to track their coding journey over time</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* Key Features Section */}
      <section className="mb-12">
        <Card className="bg-white dark:bg-gray-900 shadow-md border-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl font-semibold text-blue-600 dark:text-blue-400">
              <Rocket className="h-8 w-8" /> Key Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 dark:text-gray-300 text-base">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                <span><b>Solve Curated Problems:</b> Cover all essential DSA topics from arrays to dynamic programming.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                <span><b>Real-time Feedback:</b> Run code and get verdicts like Accepted, Wrong Answer, or TLE instantly.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                <span><b>Track Progress:</b> Review past attempts and measure improvements over time.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                <span><b>Discussions (Coming Soon):</b> Learn new approaches and optimizations from peers.</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* FAQ Section */}
      <section>
        <Card className="bg-white dark:bg-gray-900 shadow-md border-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl font-semibold text-blue-600 dark:text-blue-400">
              <HelpCircle className="h-8 w-8" /> FAQs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full text-sm md:text-base">
              <AccordionItem value="item-1">
                <AccordionTrigger className="font-medium text-left">
                  Is CodeDSA free to use?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 dark:text-gray-300">
                  Yes, CodeDSA is 100% free. Our goal is to make DSA practice accessible to everyone.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="font-medium text-left">
                  Why should I create an account?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 dark:text-gray-300">
                  Creating an account unlocks features like saving submissions, tracking progress, and personalized recommendations.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="font-medium text-left">
                  Which languages are supported?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 dark:text-gray-300">
                  Currently C++, Java, and Python are supported. More will be added soon.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="font-medium text-left">
                  Are new problems added regularly?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 dark:text-gray-300">
                  Yes! We continuously add new problems, improve existing ones, and introduce new features.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger className="font-medium text-left">
                  Can I contribute to CodeDSA?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 dark:text-gray-300">
                  Absolutely! You can contribute problems, suggest features, or collaborate as a developer/content creator.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
