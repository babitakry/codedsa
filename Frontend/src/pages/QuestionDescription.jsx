import { useState } from "react"
import RightSide from "../components/problem-description/RightSide"
import { LeftSide } from "../components/problem-description/LeftSide"
import { Header } from "../components/problem-description/Header"

const QuestionDescription = () => {
    const [activeTab, setActiveTab] = useState("Description")

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <Header />

            <div className="grid grid-cols-2">
                {/* Left Panel - Problem Description */}
                <LeftSide activeTab={activeTab} setActiveTab={setActiveTab} />

                {/* Right Panel - Code Editor */}
                <RightSide />
            </div>

        </div>
    )
}

export default QuestionDescription
