import { useEffect, useState } from "react"
import RightSide from "../components/problem-description/RightSide"
import { LeftSide } from "../components/problem-description/LeftSide"
import { Header } from "../components/problem-description/Header"
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { useLocation } from "react-router"
import axios from "axios"
import TestCase from "@/components/problem-description/TestCase"
import { problemEndpoints } from "@/services/api"

const QuestionDescription = () => {
    const [activeTab, setActiveTab] = useState("Description");
    const [problem, setProblem] = useState({});
    const [size, setSize] = useState(50);
    const problemId = useLocation()?.state;
    // console.log("prolem id", problemId);

    console.log("Size", size);

    const fetch_problem = async () => {
        try {
            const response = await axios({
                method: "GET",
                url: problemEndpoints.GET_PROBLEM_BY_ID(problemId)
            });
            setProblem(response.data.data);
            // console.log("Problems in QuestionDesc", response.data.data);
        }
        catch (error) {
            console.error("Error fetching problem by Id:", error);
        }
    }

    useEffect(() => {
        fetch_problem();
    }, [problemId]);


    useEffect(() => {
        console.log("Size",);
    }, [size])

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
                <ResizableHandle withHandle />
                <ResizablePanel key={size} defaultSize={size}>
                    <ResizablePanelGroup direction="vertical">
                        <ResizablePanel defaultSize={75}>
                            <div className="flex h-full w-full items-center justify-center">
                                <RightSide setSize={setSize} initialCode={problem?.boiler_plate_code} />
                            </div>
                        </ResizablePanel>
                        <ResizableHandle withHandle />
                        <ResizablePanel defaultSize={25}>
                            <div className="w-full p-4 h-full">
                                <TestCase examples={problem.examples} />
                            </div>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </ResizablePanel>

            </ResizablePanelGroup>


        </div>
    )
}

export default QuestionDescription
