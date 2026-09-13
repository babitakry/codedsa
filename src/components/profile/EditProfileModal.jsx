import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from 'axios';
import { userEndpoints } from '@/services/api';

const EditProfileModal = ({ user, setOpen }) => {
    const [username, setUsername] = useState("");
    const [summary, setSummary] = useState("");
    const [country, setCountry] = useState("");
    const [college, setCollege] = useState("");
    const [language, setLanguage] = useState("");
    const [linkedIn, setLinkedIn] = useState("");
    const [github, setGithub] = useState("");
    const [codeforces, setCodeforces] = useState("");

    const updateProfile = async () => {
        const social_links = [
            {
                platform: "github",
                url: github
            },
            {
                platform: "linkedIn",
                url: linkedIn
            },
            {
                platform: "codeforces",
                url: codeforces 
            }
        ];

        try {
            const token = localStorage.getItem("token");
            await axios({
                method: "PUT",
                url: userEndpoints.UPDATE_USER,
                data: {
                    username: username,
                    summary: summary,
                    country: country,
                    college: college,
                    language_used: [language],
                    social_links: social_links,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setOpen(false);
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    useEffect(() => {
        if (user) {
            setUsername(user?.username || "");
            setSummary(user?.summary || "");
            setCountry(user?.country || "");
            setCollege(user?.college || "");
            setLanguage(user?.language || "");
            setLinkedIn(user?.social_links?.[1]?.url || "");
            setGithub(user?.social_links?.[0]?.url || "");
            setCodeforces(user?.social_links?.[2]?.url || "");
        }
    }, [user]);

    return (
        <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
                <DialogTitle className="text-center">Edit Profile</DialogTitle>
                <DialogDescription className="text-center">
                    Make changes to your profile here. Click save when you're done.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-2">
                <div className="grid gap-2">
                    <Label htmlFor="name">Username</Label>
                    <Input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        id="name"
                        name="name"
                        placeholder="Your username"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="summary">Summary</Label>
                    <Input
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        id="summary"
                        name="summary"
                        placeholder="Brief bio or headline"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        id="country"
                        name="country"
                        placeholder="Your country"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="college">College / University</Label>
                    <Input
                        value={college}
                        onChange={(e) => setCollege(e.target.value)}
                        id="college"
                        name="college"
                        placeholder="Your institution"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="languages">Preferred Language</Label>
                    <Input
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        id="languages"
                        name="languages"
                        placeholder="e.g. C++, Java, Python, JavaScript"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="linkedin">LinkedIn URL</Label>
                    <Input
                        value={linkedIn}
                        onChange={(e) => setLinkedIn(e.target.value)}
                        id="linkedin"
                        name="linkedin"
                        placeholder="https://linkedin.com/in/username"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="github">GitHub URL</Label>
                    <Input
                        value={github}
                        onChange={(e) => setGithub(e.target.value)}
                        id="github"
                        name="github"
                        placeholder="https://github.com/username"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="codeforces">Codeforces URL</Label>
                    <Input
                        value={codeforces}
                        onChange={(e) => setCodeforces(e.target.value)}
                        id="codeforces"
                        name="codeforces"
                        placeholder="https://codeforces.com/profile/username"
                    />
                </div>
            </div>

            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit" onClick={updateProfile}>Save Changes</Button>
            </DialogFooter>
        </DialogContent>
    );
};

export default EditProfileModal;
