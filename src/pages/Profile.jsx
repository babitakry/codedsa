import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import EditProfileModal from "@/components/profile/EditProfileModal";
import { userEndpoints } from "@/services/api";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { Globe, Github, Linkedin, Twitter, CheckCircle, Code2, Award, Calendar } from "lucide-react";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [open, setOpen] = useState(false);
    const { onLogout } = useAuth();

    const fetchUserProfile = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios({
                method: "GET",
                url: userEndpoints.GET_USER,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setUser(res.data.data);
        } catch (error) {
            console.log(error.response || error.message);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, [open]);

    const getSocialIcon = (platform) => {
        switch (platform?.toLowerCase()) {
            case "github":
                return <Github className="w-4 h-4 text-neutral-800 dark:text-neutral-200" />;
            case "linkedin":
                return <Linkedin className="w-4 h-4 text-[#0077b5]" />;
            case "twitter":
                return <Twitter className="w-4 h-4 text-[#1da1f2]" />;
            default:
                return <Globe className="w-4 h-4 text-neutral-500" />;
        }
    };

    return (
        <div className="max-w-5xl mx-auto my-8 px-4 sm:px-6 min-h-[80vh] text-neutral-800 dark:text-neutral-200 transition-colors font-sans">
            
            {/* Header User Card */}
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between bg-white dark:bg-[#282828] border border-neutral-200 dark:border-[#383838] rounded-lg shadow-xs p-6 gap-6 transition-colors">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-left">
                    <img
                        src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                        alt="user"
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-neutral-200 dark:border-[#383838] shadow-xs object-cover"
                    />
                    <div>
                        <h1 className="text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                            {user?.username || "Loading..."}
                        </h1>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                            {user?.summary || "No summary provided."}
                        </p>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-2">
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button className="px-3.5 py-1.5 text-xs bg-[#00b8a3] hover:bg-[#00a390] text-white cursor-pointer rounded-md font-medium shadow-none">
                                Edit Profile
                            </Button>
                        </DialogTrigger>
                        <EditProfileModal
                            user={user}
                            setOpen={setOpen}
                        />
                    </Dialog>
                    <Button
                        onClick={onLogout}
                        className="bg-neutral-100 dark:bg-[#333333] hover:bg-neutral-200 dark:hover:bg-[#3e3e3e] text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 px-3.5 py-1.5 text-xs rounded-md font-medium cursor-pointer shadow-none"
                    >
                        Logout
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                <div className="bg-white dark:bg-[#282828] rounded-lg border border-neutral-200 dark:border-[#383838] p-4 text-center shadow-xs transition-colors">
                    <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">Solved Problems</p>
                    <p className="text-2xl font-bold text-[#00b8a3] mt-1">
                        {user?.solved_no_questions || 0}
                    </p>
                </div>
                <div className="bg-white dark:bg-[#282828] rounded-lg border border-neutral-200 dark:border-[#383838] p-4 text-center shadow-xs transition-colors">
                    <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">Total Submissions</p>
                    <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mt-1">
                        {user?.total_submission || 0}
                    </p>
                </div>
                <div className="bg-white dark:bg-[#282828] rounded-lg border border-neutral-200 dark:border-[#383838] p-4 text-center shadow-xs transition-colors">
                    <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">Role</p>
                    <p className="text-2xl font-bold text-[#ffc01e] mt-1">
                        {user?.role || "USER"}
                    </p>
                </div>
                <div className="bg-white dark:bg-[#282828] rounded-lg border border-neutral-200 dark:border-[#383838] p-4 text-center shadow-xs transition-colors">
                    <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">Member Since</p>
                    <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mt-2">
                        {user ? new Date(user.createdAt).toLocaleDateString() : "-"}
                    </p>
                </div>
            </div>

            {/* Info Section */}
            <div className="bg-white dark:bg-[#282828] border border-neutral-200 dark:border-[#383838] rounded-lg shadow-xs mt-4 p-5 grid grid-cols-1 md:grid-cols-2 gap-4 transition-colors">
                <div>
                    <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">Country</p>
                    <p className="font-medium text-neutral-900 dark:text-neutral-100 mt-0.5 text-sm">
                        {user?.country || "Not Provided"}
                    </p>
                </div>
                <div>
                    <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">College</p>
                    <p className="font-medium text-neutral-900 dark:text-neutral-100 mt-0.5 text-sm">
                        {user?.college || "Not Provided"}
                    </p>
                </div>
                <div className="md:col-span-2 pt-1 border-t border-neutral-100 dark:border-[#333333]">
                    <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-2">Languages Used</p>
                    <div className="flex flex-wrap gap-1.5">
                        {user?.language_used?.length ? (
                            user.language_used.map((lang, idx) => (
                                <span
                                    key={idx}
                                    className="px-2.5 py-0.5 text-xs font-medium rounded bg-neutral-100 dark:bg-[#333333] text-neutral-700 dark:text-neutral-300"
                                >
                                    {lang}
                                </span>
                            ))
                        ) : (
                            <span className="text-neutral-400 text-xs">Not Provided</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Social Links */}
            <div className="bg-white dark:bg-[#282828] border border-neutral-200 dark:border-[#383838] rounded-lg shadow-xs mt-4 p-5 transition-colors">
                <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                    Social Links
                </h2>
                {user?.social_links?.length ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {user.social_links.map((social, idx) => (
                            <a
                                key={idx}
                                href={social?.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2.5 p-2.5 border border-neutral-200 dark:border-[#383838] bg-neutral-50/50 dark:bg-[#202020] rounded-md hover:border-[#00b8a3] transition text-xs"
                            >
                                {getSocialIcon(social?.platform)}
                                <div className="min-w-0">
                                    <p className="font-medium text-neutral-700 dark:text-neutral-300 capitalize">{social?.platform}</p>
                                    <p className="text-neutral-400 truncate max-w-[200px]">
                                        {social?.url}
                                    </p>
                                </div>
                            </a>
                        ))}
                    </div>
                ) : (
                    <p className="text-neutral-400 text-xs">No social links added.</p>
                )}
            </div>
        </div>
    );
};

export default Profile;
