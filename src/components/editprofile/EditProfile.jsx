import React, { useEffect, useState } from 'react';
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
import { userEndpoints } from '@/services/api';

const EditProfile = ({user, setOpen}) => {
    console.log("user", user);
    const [username, setUsername] = useState("");
    const [summary, setSummary] = useState("");
    const [country, setCountry] = useState("");
    const [college, setCollege] = useState("");
    const [language, setLanguage] = useState("");
    const [linkedIn, setLinkedIn] = useState("");
    const [github, setGithub] = useState("");
    const [codeforces, setCodeforces] = useState("");


    const updateprofile = async () => {
        
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
            const token = localStorage.getItem("token");
            const response = await axios({
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
            console.log("Response......", response);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        if(user){
            setUsername(user?.username);
            setSummary(user?.summary);
            setCountry(user?.country);
            setCollege(user?.college);
            setLanguage(user?.language);
            setLinkedIn(user?.social_links[1].url);
            setGithub(user?.social_links[0].url);
            setCodeforces(user?.social_links[2].url);
        }
    },[user])

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
                        value = {username}
                        onChange={(e) => setUsername(e.target.value)}
                        id="name"
                        name="name"
                        placeholder=""
                    />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="summary">Summary</Label>
                    <Input
                        value = {summary}
                        onChange={(e) => setSummary(e.target.value)}
                        id="summary"
                        name="summary"
                        placeholder="" />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="country">Country</Label>
                    <Input
                        value = {country}
                        onChange={(e) => setCountry(e.target.value)}
                        id="country"
                        name="country"
                        placeholder="" />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="college">College</Label>
                    <Input
                        value = {college}
                        onChange={(e) => setCollege(e.target.value)}
                        id="college"
                        name="college"
                        placeholder="" />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="languages">Languages Used</Label>
                    <Input
                        value = {language}
                        onChange={(e) => setLanguage(e.target.value)}
                        id="languages"
                        name="languages"
                        placeholder="" />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                        value = {linkedIn}
                        onChange={(e) => setLinkedIn(e.target.value)}
                        id="linkedin"
                        name="linkedin"
                        placeholder=" " />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="github">GitHub</Label>
                    <Input
                        value = {github}
                        onChange={(e) => setGithub(e.target.value)}
                        id="github"
                        name="github"
                        placeholder=" " />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="codeforces">Codeforces</Label>
                    <Input
                        value = {codeforces}
                        onChange={(e) => setCodeforces(e.target.value)}
                        id="codeforces"
                        name="codeforces"
                        placeholder=" " />
                </div>
            </div>

            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit" onClick={updateprofile}>Save changes</Button>
            </DialogFooter>
        </DialogContent>
    );
};

export default EditProfile;
