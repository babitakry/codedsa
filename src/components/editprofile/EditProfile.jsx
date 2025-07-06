import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from 'axios';

const EditProfile = () => {
    const [username, setUsername] = useState("");
    const [summary, setSummary] = useState("");
    const [country, setCountry] = useState("");
    const [college, setCollege] = useState("");
    const [language, setLanguage] = useState("");
    const [linkedIn, setLinkedIn] = useState("");
    const [github, setGithub] = useState("");
    const [codeforces, setCodeforces] = useState("");


    const updateprofile = async () => {
        console.log("Username:", username);
        console.log("Summary:", summary);
        console.log("Country:", country);
        console.log("College:", college);
        console.log("Language:", language);
        console.log("LinkedIn:", linkedIn);
        console.log("GitHub:", github);
        console.log("Codeforces:", codeforces);

        const social_links = [
            {
                platform:"github",
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
        ]

        try {
            const response = await axios({
                method: "PUT",
                url: "http://localhost:3000/api/v1/user/updateuser/6864dcad9636afa49f9a3a25",
                data: {
                    username: username,
                    summary: summary,
                    country: country,
                    college: college,
                    language_used: language_used,
                    social_links: social_links,
                }
            });
            console.log("Response......", response);
        }
        catch (error) {
            console.log(error.response);
        }
    }

    return (
        <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
                <DialogTitle className="text-center">Edit profile</DialogTitle>
                <DialogDescription className="text-center">
                    Make changes to your profile here. Click save when you&apos;re
                    done.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
                <div className="grid gap-3">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        onChange={(e) => setUsername(e.target.value)}
                        id="name"
                        name="name"
                        placeholder="Enter your name"
                    />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="summary">Summary</Label>
                    <Input
                        onChange={(e) => setSummary(e.target.value)}
                        id="summary"
                        name="summary"
                        placeholder="Frontend Developer" />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="country">Country</Label>
                    <Input
                        onChange={(e) => setCountry(e.target.value)}
                        id="country"
                        name="country"
                        placeholder="India" />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="college">College</Label>
                    <Input
                        onChange={(e) => setCollege(e.target.value)}
                        id="college"
                        name="college"
                        placeholder="XYZ College of Engineering" />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="languages">Languages Used</Label>
                    <Input
                        onChange={(e) => setLanguage(e.target.value)}
                        id="languages"
                        name="languages"
                        placeholder="C++, Python, JavaScript" />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                        onChange={(e) => setLinkedIn(e.target.value)}
                        id="linkedin"
                        name="linkedin"
                        placeholder="https://www.linkedin.com/in/your-profile" />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="github">GitHub</Label>
                    <Input
                        onChange={(e) => setGithub(e.target.value)}
                        id="github"
                        name="github"
                        placeholder="https://github.com/your-profile" />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="codeforces">Codeforces</Label>
                    <Input
                        onChange={(e) => setCodeforces(e.target.value)}
                        id="codeforces"
                        name="codeforces"
                        placeholder="https://codeforces.com/profile/your-handle" />
                </div>
            </div>

            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Save changes</Button>
            </DialogFooter>
        </DialogContent>
    );
};

export default EditProfile;
