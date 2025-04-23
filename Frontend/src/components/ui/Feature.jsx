import React from 'react'

const Feature = () => {
  return (
    <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-12">Why Use This Platform?</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-2">📘 Practice Problems</h3>
            <p>Wide range of categorized coding problems with real-time submission results.</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-2">📊 Dashboard</h3>
            <p>Visualize your stats, streaks, and recent submissions in a user-friendly dashboard.</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-2">📝 Submissions</h3>
            <p>Track all your attempts and revisit any problem with your previous submissions.</p>
          </div>
        </div>
      </section>
  )
}

export default Feature