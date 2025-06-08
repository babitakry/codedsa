import React from 'react'

const Profile = () => {
    return (
        <div className="w-[800px] mx-auto mt-10 bg-white border border-gray-300 rounded-xl shadow-sm mb-8">
            <div className="flex items-center p-6">
                <img
                    src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                    alt="user"
                    className="w-28 h-28 rounded-full border-2 border-gray-200 shadow-sm"
                />
                <div className="ml-6">
                    <h1 className="text-2xl font-semibold text-gray-800">Babita Kumari</h1>
                    <p className="text-sm text-gray-500">Competitive Programmer | Web Developer</p>
                </div>
            </div>

            <div className="border-t border-gray-200 px-6 py-4 grid grid-cols-3 gap-4">
                <div>
                    <p className="text-sm text-gray-500">Country</p>
                    <p className="font-medium text-gray-700">India</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">College</p>
                    <p className="font-medium text-gray-700">XYZ College of Engineering</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Languages Used</p>
                    <p className="font-medium text-gray-700">C++, Python, JavaScript</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">LinkedIn</p>
                    <a
                        href="https://www.linkedin.com/in/your-linkedin-profile"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                    >
                        linkedin.com/in/your-linkedin-profile
                    </a>
                </div>
                <div>
                    <p className="text-sm text-gray-500">GitHub</p>
                    <a
                        href="https://github.com/your-github-profile"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-800 hover:underline"
                    >
                        github.com/your-github-profile
                    </a>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Codeforces</p>
                    <a
                        href="https://codeforces.com/profile/your-codeforces-handle"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-700 hover:underline"
                    >
                        codeforces.com/profile/your-codeforces-handle
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Profile
