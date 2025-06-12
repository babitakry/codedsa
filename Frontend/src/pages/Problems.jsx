import React from 'react'
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
    const problem_list = [
        {
            Q_no: 1,
            Q_name: 'Add Two Numbers',
            Q_level: 'Med',
            topic: 'Linked List'
        },
        {
            Q_no: 2,
            Q_name: 'Two Sum',
            Q_level: 'Easy',
            topic: 'Array'
        },
        {
            Q_no: 3,
            Q_name: 'Longest Substring Without Repeating Characters',
            Q_level: 'Med', topic: 'Sliding Window'
        },
        {
            Q_no: 4,
            Q_name: 'Median of Two Sorted Arrays',
            Q_level: 'Hard', topic: 'Binary Search'
        },
        {
            Q_no: 5,
            Q_name: 'Longest Palindromic Substring',
            Q_level: 'Med',
            topic: 'Dynamic Programming'
        },
        {
            Q_no: 6,
            Q_name: 'Reverse Integer',
            Q_level: 'Med',
            topic: 'Math'
        },
    ];


    return (
        <div className='max-w-6xl mx-auto min-h-screen'>
            <h2 className='text-4xl text-center font-semibold text-indigo-600 mt-10 '>Problems List</h2>
            <div className='mt-4'>
                {problem_list.map((problem, ind) => (
                    <Question
                        index={ind}
                        key={problem.Q_no}
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
