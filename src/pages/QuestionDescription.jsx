import { useEffect, useState } from "react";
import RightSide from "../components/problem-description/RightSide";
import { LeftSide } from "../components/problem-description/LeftSide";
import { Header } from "../components/problem-description/Header";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useLocation } from "react-router";
import axios from "axios";
import TestCase from "@/components/problem-description/TestCase";
import { problemEndpoints } from "@/services/api";

const QuestionDescription = () => {
    const [activeTab, setActiveTab] = useState("Description");
    const [problem, setProblem] = useState({});
    const [size, setSize] = useState(50);
    const problemId = useLocation()?.state;

    const fetch_problem = async () => {
        try {
            const response = await axios({
                method: "GET",
                url: problemEndpoints.GET_PROBLEM_BY_ID(problemId),
            });
            setProblem(response.data.data);
        } catch (error) {
            console.error("Error fetching problem by Id:", error);
        }
    };

    useEffect(() => {
        fetch_problem();
    }, [problemId]);

    return (
        <div className="w-full h-screen border border-gray-300  p-2 bg-white">
            <Header />
            <ResizablePanelGroup
                direction="horizontal"
                className="w-full h-full mt-3 rounded-lg border border-gray-300"
            >
                <ResizablePanel defaultSize={50}>
                    <div className="h-full p-2 border-r border-gray-300 bg-gray-50 rounded-l-lg overflow-auto">
                        <LeftSide
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                            problem={problem}
                        />
                    </div>
                </ResizablePanel>

                <ResizableHandle withHandle />

                <ResizablePanel key={size} defaultSize={size}>
                    <ResizablePanelGroup direction="vertical">
                        <ResizablePanel defaultSize={75}>
                            <div className="p-2 h-full border-b border-gray-300 bg-gray-50">
                                <RightSide
                                    setSize={setSize}
                                    initialCode={problem?.boiler_plate_code}
                                />
                            </div>
                        </ResizablePanel>

                        <ResizableHandle withHandle />

                        <ResizablePanel defaultSize={25}>
                            <div className="w-full h-full p-2 bg-gray-50 border-t border-gray-300 rounded-b-lg">
                                <TestCase examples={problem.examples} />
                            </div>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
};

export default QuestionDescription;
