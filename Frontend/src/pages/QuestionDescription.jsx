import { useEffect, useState } from "react"
import RightSide from "../components/problem-description/RightSide"
import { LeftSide } from "../components/problem-description/LeftSide"
import { Header } from "../components/problem-description/Header"
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { useLocation} from "react-router"
import axios from "axios"

const QuestionDescription = () => {
    const [activeTab, setActiveTab] = useState("Description");
    const [problem, setProblem] = useState({});
    const problemId = useLocation()?.state;
    console.log("prolem id", problemId);


    const fetch_problem = async() => {
        try{
            const response = await axios.get(`http://localhost:3000/api/v1/problems/getproblem/${problemId}`);
            console.log("Response", response);
            setProblem(response.data.data);
            console.log("Problems in QuestionDesc", response.data.data);
        }
        catch(error){
            console.error("Error fetching problem by Id:", error);
        }
    }

    useEffect(() => {
        fetch_problem();
    }, [problemId]);

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
                        <LeftSide activeTab={activeTab} setActiveTab={setActiveTab} problem={problem} />
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
