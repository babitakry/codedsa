import React from 'react';
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

const EditProfile = () => {
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
                    <Input id="name" name="name" defaultValue="Pedro Duarte" placeholder="Enter your name" />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="summary">Summary</Label>
                    <Input id="summary" name="summary" placeholder="Frontend Developer" />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" name="country" placeholder="India" />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="college">College</Label>
                    <Input id="college" name="college" placeholder="XYZ College of Engineering" />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="languages">Languages Used</Label>
                    <Input id="languages" name="languages" placeholder="C++, Python, JavaScript" />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input id="linkedin" name="linkedin" placeholder="https://www.linkedin.com/in/your-profile" />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="github">GitHub</Label>
                    <Input id="github" name="github" placeholder="https://github.com/your-profile" />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="codeforces">Codeforces</Label>
                    <Input id="codeforces" name="codeforces" placeholder="https://codeforces.com/profile/your-handle" />
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
