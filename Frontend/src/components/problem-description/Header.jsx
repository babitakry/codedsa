import React from 'react'
import {
    ChevronLeft,
    ChevronRight,
    List,
    User,
} from "lucide-react"

export const Header = () => {
    return (
        <header className="border-b border-gray-200 px-4 py-2">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <button className="p-1 hover:bg-gray-100 rounded">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button className="flex items-center space-x-2 px-3 py-1 hover:bg-gray-100 rounded">
                        <List className="w-4 h-4" />
                        <span className="text-sm font-medium">Problem List</span>
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex items-center space-x-4">

                    <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded text-sm font-medium">
                        Submit
                    </button>

                    <button className="p-1 hover:bg-gray-100 rounded">
                        <User className="w-5 h-5" />
                    </button>
                    <span className="text-sm text-gray-600">Register</span>
                    <span className="text-sm text-gray-400">or</span>
                    <span className="text-sm text-gray-600">Sign in</span>
                </div>
            </div>
        </header>
    )
}
