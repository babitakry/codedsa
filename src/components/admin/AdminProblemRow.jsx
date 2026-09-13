import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { problemEndpoints } from '@/services/api';
import axios from 'axios';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { DialogClose } from '@radix-ui/react-dialog';
import { Edit3, Trash2, Tag } from 'lucide-react';

const AdminProblemRow = ({ index, problem, setRefreshProblem }) => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const deleteProblem = async (id) => {
        try {
            setLoading(true);
            await axios.delete(problemEndpoints.DELETE_PROBLEM(id));
            setRefreshProblem((prev) => !prev);
            setOpen(false);
        } catch (err) {
            console.error("Error deleting problem:", err);
        } finally {
            setLoading(false);
        }
    };

    const getDifficultyBadge = (difficulty) => {
        switch (difficulty?.toLowerCase()) {
            case 'easy':
                return 'text-[#00b8a3] bg-[#00b8a3]/10 border-[#00b8a3]/20';
            case 'medium':
                return 'text-[#ffc01e] bg-[#ffc01e]/10 border-[#ffc01e]/20';
            case 'hard':
                return 'text-[#ff375f] bg-[#ff375f]/10 border-[#ff375f]/20';
            default:
                return 'text-neutral-500 bg-neutral-100 dark:bg-[#333333] border-neutral-200';
        }
    };

    return (
        <tr className="hover:bg-neutral-50/80 dark:hover:bg-[#232323] transition-colors">
            {/* Index / Serial */}
            <td className="px-5 py-3.5 text-xs font-semibold text-neutral-400 dark:text-neutral-500">
                {problem.sno || index + 1}
            </td>

            {/* Problem Title */}
            <td className="px-4 py-3.5">
                <div className="min-w-0">
                    <p className="font-semibold text-neutral-900 dark:text-neutral-100 text-xs sm:text-sm hover:text-[#00b8a3] transition cursor-pointer"
                       onClick={() => navigate(`/problems/${problem.title}`, { state: problem._id })}>
                        {problem.title}
                    </p>
                    {problem.description && (
                        <p className="text-xs text-neutral-400 dark:text-neutral-500 truncate max-w-md hidden sm:block mt-0.5">
                            {problem.description}
                        </p>
                    )}
                </div>
            </td>

            {/* Topic Badge */}
            <td className="px-4 py-3.5">
                {problem.topic ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 dark:bg-[#333333] text-neutral-600 dark:text-neutral-300">
                        <Tag size={11} className="text-neutral-400" />
                        {problem.topic}
                    </span>
                ) : (
                    <span className="text-neutral-400 text-xs">—</span>
                )}
            </td>

            {/* Difficulty Badge */}
            <td className="px-4 py-3.5">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getDifficultyBadge(problem.difficulty)}`}>
                    {problem.difficulty || 'Easy'}
                </span>
            </td>

            {/* Action Buttons */}
            <td className="px-5 py-3.5 text-right">
                <div className="flex items-center justify-end gap-1.5">
                    {/* Edit Button */}
                    <button
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md border border-neutral-200 dark:border-[#383838] bg-white dark:bg-[#282828] hover:bg-neutral-100 dark:hover:bg-[#333333] text-neutral-700 dark:text-neutral-300 transition cursor-pointer shadow-xs"
                        onClick={() => navigate(`/admin/problems/update/${problem._id}`, { state: problem })}
                        title="Edit Problem"
                    >
                        <Edit3 className="w-3.5 h-3.5 text-amber-500" />
                        <span className="hidden sm:inline">Edit</span>
                    </button>

                    {/* Delete Dialog */}
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <button
                                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md border border-red-200 dark:border-red-950/40 bg-red-50 dark:bg-red-950/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 transition cursor-pointer shadow-xs"
                                title="Delete Problem"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">Delete</span>
                            </button>
                        </DialogTrigger>
                        <DialogContent className="bg-white dark:bg-[#282828] border border-neutral-200 dark:border-[#383838] text-neutral-900 dark:text-neutral-100">
                            <DialogHeader>
                                <DialogTitle className="text-center font-bold text-base sm:text-lg">
                                    Delete Problem?
                                </DialogTitle>
                                <DialogDescription className="text-center text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-2">
                                    Are you sure you want to permanently delete <strong className="text-neutral-900 dark:text-white">"{problem.title}"</strong>? This action cannot be undone.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="flex justify-center gap-3 mt-5">
                                <DialogClose asChild>
                                    <Button variant="outline" className="border-neutral-200 dark:border-[#383838] cursor-pointer">
                                        Cancel
                                    </Button>
                                </DialogClose>
                                <Button
                                    type="button"
                                    disabled={loading}
                                    onClick={() => deleteProblem(problem._id)}
                                    className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                                >
                                    {loading ? "Deleting..." : "Yes, Delete"}
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </td>
        </tr>
    );
};

export default AdminProblemRow;
