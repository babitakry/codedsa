import React from 'react'

export const LeftSide = (activeTab, setActiveTab) => {
  return (
    <div className="w-full border-r border-gray-200">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex">
          {["Description", "Editorial", "Solutions", "Submissions"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium border-b-2 ${activeTab === tab
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Problem Content */}
      <div className="p-6 overflow-y-auto h-[calc(100vh-120px)]">
        <div className="space-y-6">
          {/* Title and Tags */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">1. Two Sum</h1>
            <div className="flex items-center space-x-3">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">Easy</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">Topics</span>
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium">Companies</span>
              <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium">Hint</span>
            </div>
          </div>

          {/* Problem Statement */}
          <div className="space-y-4">
            <p className="text-gray-700">
              Given an array of integers <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">nums</code> and
              an integer <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">target</code>, return{" "}
              <em>indices of the two numbers such that they add up to</em>{" "}
              <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">target</code>.
            </p>

            <p className="text-gray-700">
              You may assume that each input would have <strong>exactly one solution</strong>, and you may not use
              the <em>same</em> element twice.
            </p>

            <p className="text-gray-700">You can return the answer in any order.</p>
          </div>

          {/* Examples */}
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Example 1:</h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div>
                  <strong>Input:</strong> nums = [2,7,11,15], target = 9
                </div>
                <div>
                  <strong>Output:</strong> [0,1]
                </div>
                <div>
                  <strong>Explanation:</strong> Because nums[0] + nums[1] == 9, we return [0, 1].
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Example 2:</h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div>
                  <strong>Input:</strong> nums = [3,2,4], target = 6
                </div>
                <div>
                  <strong>Output:</strong> [1,2]
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Example 3:</h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div>
                  <strong>Input:</strong> nums = [3,3], target = 6
                </div>
                <div>
                  <strong>Output:</strong> [0,1]
                </div>
              </div>
            </div>
          </div>

          {/* Constraints */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Constraints:</h3>
            <ul className="space-y-1 text-gray-700">
              <li>• 2 ≤ nums.length ≤ 10⁴</li>
              <li>• -10⁹ ≤ nums[i] ≤ 10⁹</li>
              <li>• -10⁹ ≤ target ≤ 10⁹</li>
              <li>
                • <strong>Only one valid answer exists.</strong>
              </li>
            </ul>
          </div>

          {/* Follow-up */}
          <div>
            <p className="text-gray-700">
              <strong>Follow-up:</strong> Can you come up with an algorithm that is less than{" "}
              <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">O(n²)</code> time complexity?
            </p>
          </div>

          {/* Stats */}
          <div className="border-t pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-gray-500">Accepted</span>
                <div className="font-semibold">17,382,815</div>
                <span className="text-xs text-gray-400">61.2M</span>
              </div>
              <div>
                <span className="text-sm text-gray-500">Acceptance Rate</span>
                <div className="font-semibold">55.7%</div>
              </div>
            </div>

            {/* Topics */}
            <div className="pt-4">
              <button className="text-sm text-blue-600 hover:text-blue-800">Topics</button>
            </div>

            {/* Online Status */}
            <div className="flex items-center justify-between pt-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">2166 Online</span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
