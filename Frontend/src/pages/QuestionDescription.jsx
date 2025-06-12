import { useState } from "react"
import RightSide from "../components/problem-description/RightSide"
import { LeftSide } from "../components/problem-description/LeftSide"
import { Header } from "../components/problem-description/Header"
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"

const QuestionDescription = () => {
    const [activeTab, setActiveTab] = useState("Description")

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <Header />

            <ResizablePanelGroup
                direction="horizontal"
                className="w-full h-screen rounded-lg border md:min-w-[450px]"
            >
                <ResizablePanel defaultSize={50}>
                    <div className="flex  items-center justify-center">
                        {/* Left Panel - Problem Description */}
                        <LeftSide activeTab={activeTab} setActiveTab={setActiveTab} />
                    </div>
                </ResizablePanel>
                <ResizableHandle withHandle/>
                <ResizablePanel defaultSize={50}>
                    <ResizablePanelGroup direction="vertical">
                        <ResizablePanel defaultSize={75}>
                            <div className="flex h-full w-full items-center justify-center">
                                {/* Right Panel - Code Editor */}
                                <RightSide />
                            </div>
                        </ResizablePanel>
                        <ResizableHandle withHandle/>
                        <ResizablePanel defaultSize={25}>
                            <div className="flex h-full items-center justify-center">
                                <span className="font-semibold">Three</span>
                            </div>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </ResizablePanel>
            </ResizablePanelGroup>


        </div>
    )
}

export default QuestionDescription
