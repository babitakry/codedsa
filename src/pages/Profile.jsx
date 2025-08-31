import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import EditProfile from "../components/editprofile/EditProfile";
import { userEndpoints } from "@/services/api";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { Globe, Github, Linkedin, Twitter } from "lucide-react"; // icons for socials

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

    // --- helper: detect social icon
    const getSocialIcon = (platform) => {
        switch (platform?.toLowerCase()) {
            case "github":
                return <Github className="w-5 h-5 text-gray-700" />;
            case "linkedin":
                return <Linkedin className="w-5 h-5 text-blue-700" />;
            case "twitter":
                return <Twitter className="w-5 h-5 text-sky-500" />;
            default:
                return <Globe className="w-5 h-5 text-gray-500" />;
        }
    };

    return (
        <div className="max-w-5xl mx-auto my-10 px-6 min-h-[80vh]">
            {/* --- Header Section --- */}
            <div className="flex items-center justify-between bg-white border border-gray-300 rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-6">
                    <img
                        src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                        alt="user"
                        className="w-28 h-28 rounded-full border-2 border-gray-200 shadow-sm"
                    />
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800">
                            {user?.username || "Loading..."}
                        </h1>
                        <p className="text-sm text-gray-500">
                            {user?.summary || "No Summary added"}
                        </p>
                    </div>
                </div>
                <div className="flex flex-col space-y-2">
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button>Edit Profile</Button>
                        </DialogTrigger>
                        <EditProfile
                            user={user}
                            onProfileUpdated={setUser}
                            setOpen={setOpen}
                        />
                    </Dialog>
                    <Button onClick={onLogout} className="bg-red-500">
                        Logout
                    </Button>
                </div>
            </div>

            {/* --- Stats Section --- */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="bg-white rounded-lg border p-4 text-center">
                    <p className="text-sm text-gray-500">Solved Problems</p>
                    <p className="text-xl font-semibold text-gray-800">
                        {user?.solved_no_questions || 0}
                    </p>
                </div>
                <div className="bg-white rounded-lg border p-4 text-center">
                    <p className="text-sm text-gray-500">Total Submissions</p>
                    <p className="text-xl font-semibold text-gray-800">
                        {user?.total_submission || 0}
                    </p>
                </div>
                <div className="bg-white rounded-lg border p-4 text-center">
                    <p className="text-sm text-gray-500">Role</p>
                    <p className="text-xl font-semibold text-gray-800">
                        {user?.role || "USER"}
                    </p>
                </div>
                <div className="bg-white rounded-lg border p-4 text-center">
                    <p className="text-sm text-gray-500">Joined</p>
                    <p className="text-xl font-semibold text-gray-800">
                        {user ? new Date(user.createdAt).toLocaleDateString() : ""}
                    </p>
                </div>
            </div>

            {/* --- Info Section --- */}
            <div className="bg-white border rounded-xl shadow-sm mt-6 p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <p className="text-sm text-gray-500">Country</p>
                    <p className="font-medium text-gray-700">
                        {user?.country || "Not Provided"}
                    </p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">College</p>
                    <p className="font-medium text-gray-700">
                        {user?.college || "Not Provided"}
                    </p>
                </div>
                <div>
                    <p className="text-sm text-gray-500 mb-2">Languages Used</p>
                    <div className="flex flex-wrap gap-2">
                        {user?.language_used?.length ? (
                            user.language_used.map((lang, idx) => (
                                <span
                                    key={idx}
                                    className="px-3 py-1 text-sm rounded-full bg-blue-50 text-blue-700 border border-blue-200"
                                >
                                    {lang}
                                </span>
                            ))
                        ) : (
                            <span className="text-gray-400">Not Provided</span>
                        )}
                    </div>
                </div>
            </div>

            {/* --- Social Links --- */}
            <div className="bg-white border rounded-xl shadow-sm mt-6 p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Social Links
                </h2>
                {user?.social_links?.length ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {user.social_links.map((social, idx) => (
                            <a
                                key={idx}
                                href={social?.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 p-3 border rounded-lg hover:shadow-md transition"
                            >
                                {getSocialIcon(social?.platform)}
                                <div className="min-w-0"> {/* prevents overflow */}
                                    <p className="text-sm text-gray-500">{social?.platform}</p>
                                    <p className="text-sm font-medium text-blue-600 truncate max-w-[200px] md:max-w-[250px] lg:max-w-[300px]">
                                        {social?.url}
                                    </p>
                                </div>
                            </a>

                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400">No social links added</p>
                )}
            </div>
        </div>
    );
};

export default Profile;
