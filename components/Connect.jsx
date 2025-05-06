"use client";
import React from "react";

import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

import { Label } from "./ui/label";
import Title from "./Title";


export default function Connect() {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted");
    };
    return (
        <div
            className="shadow-input pb-20 mx-auto w-full max-w-5xl rounded-none bg-white  md:rounded-2xl  dark:bg-[#050709] ">



            <Title tw="full" title=" Let's Connect" sub=" Reach out for collaborations, questions, or just a good tech chat." />



            <form className="w-2/4 mx-auto" onSubmit={handleSubmit}>
                <div
                    className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                    <LabelInputContainer>
                        <Label htmlFor="firstname">First name</Label>
                        <Input id="firstname" placeholder="Aryan" type="text" />
                    </LabelInputContainer>
                    <LabelInputContainer>
                        <Label htmlFor="lastname">Last name</Label>
                        <Input id="lastname" placeholder="Joshi" type="text" />
                    </LabelInputContainer>
                </div>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" placeholder="connect@gainly.com" type="email" />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="Collaborations / questions / issues" type="text" />
                </LabelInputContainer>
                <LabelInputContainer className="mb-8">
                    <Label htmlFor="message">Message</Label>
                    <Input id="message" placeholder="Your message..." type="text" />
                </LabelInputContainer>

                <button
                    className="group/btn cursor-pointer relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
                    type="submit">
                    Let's Connect &rarr;
                    <BottomGradient />
                </button>
  
            </form>


        </div>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span
                className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
            <span
                className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
        </>
    );
};
const LabelInputContainer = ({
    children,
    className
}) => {
    return (
        <div className={cn("flex w-full flex-col space-y-2", className)}>
            {children}
        </div>
    );
};