import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Question from '../components/Question/Question'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

const Problems = () => {
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetch_problem_list = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/v1/problems/getallproblem");
            console.log("response", response);
            setProblems(response.data.data); // assumes your API responds with { data: [...] }
            setLoading(false);
        } catch (error) {
            console.error("Error fetching problems:", error);
            setError(error.response?.data?.error || error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetch_problem_list();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg">Loading problems...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg text-red-500">Error: {error}</p>
            </div>
        );
    }

    return (
        <div className='max-w-6xl mx-auto min-h-screen'>
            <h2 className='text-4xl text-center font-semibold text-primary mt-10'>Problems List</h2>
            <div className='mt-4'>
                {problems.map((problem, ind) => (
                    <Question
                        index={ind}
                        key={problem._id} // prefer _id from MongoDB
                        problem={problem}
                    />
                ))}
            </div>
            <div className='mt-4'>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
};

export default Problems;
