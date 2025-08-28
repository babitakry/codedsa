import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import EditProfile from "../components/editprofile/EditProfile";
import { userEndpoints } from "@/services/api";
import axios from "axios";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [open, setOpen] = useState(false);

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
    }, []);

    return (
        <div className="max-w-5xl mx-auto my-10 px-6">
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
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button>Edit Profile</Button>
                    </DialogTrigger>
                    <EditProfile user={user} onProfileUpdated={setUser} setOpen={setOpen} />
                </Dialog>


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
            <div className="bg-white border rounded-xl shadow-sm mt-6 p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <p className="text-sm text-gray-500">Country</p>
                    <p className="font-medium text-gray-700">{user?.country || "Not Provided"}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">College</p>
                    <p className="font-medium text-gray-700">{user?.college || "Not Provided"}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Languages Used</p>
                    <p className="font-medium text-gray-700">
                        {user?.language_used?.length ? user.language_used.map((lang) => {
                            return <span>{lang}</span>
                        }) : "Not Provided"}
                    </p>
                </div>
            </div>

            {/* --- Social Links --- */}
            <div className="bg-white border rounded-xl shadow-sm mt-6 p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Social Links</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {
                        user?.social_links?.map((social) => {
                            return (
                                <div>
                                    <p className="text-sm text-gray-500">{social?.platform}</p>
        
                                        <a
                                            href={social?.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-800 hover:underline"
                                        >
                                            {social?.url}
                                        </a>
    
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default Profile;
