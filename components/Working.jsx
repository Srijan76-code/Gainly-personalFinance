"use client";
import React from "react";

import { AnimatePresence, motion } from "motion/react";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";

export default function Working() {
    return (
        <>
            {/* Title  */}
            <div className="mt-20 flex justify-center items-center space-x-2 text-2xl  font-bold md:text-3xl mb-6 text-black dark:text-white ">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="h-8 w-8"><path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clip-rule="evenodd"></path></svg>
                <h2 className="">
                    How it works
                </h2>
            </div>

            {/* Main Content */}
            <div
                className="py-20 mb-20 flex flex-col lg:flex-row items-center justify-center bg-white dark:bg-[#07080A] max-w-6xl gap-4 mx-auto px-8" >
                <Card para="Get started in minutes with our simple and secure sign-up process" title="Create Your Account" icon={<img src="/working/a1.png" />}>
              
                    <CanvasRevealEffect animationSpeed={5.1} containerClassName="bg-emerald-900" dotSize={2} />
                </Card>
                <Card para="Automatically categorize and track your transactions in real-time" title="Track Your Spending" icon={<img src="/working/a2.png" />}>
                    <CanvasRevealEffect
                        animationSpeed={3}
                        containerClassName="bg-black"
                        colors={[
                            [236, 72, 153],
                            [232, 121, 249],
                        ]}
                        dotSize={2} />
                    {/* Radial gradient for the cute fade */}
                    <div
                        className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/50 dark:bg-black/90" />
                </Card>
                <Card para="Receive AI-powered insights and recommendations to optimize your finances" title="Get AI Insights" icon={<img src="/working/a3.png" />}>
                    <CanvasRevealEffect
                        animationSpeed={3}
                        containerClassName="bg-sky-600"
                        colors={[[125, 211, 252]]} dotSize={2}/>
                </Card>
            </div>
        </>
    );
}

const Card = ({
    title,
    icon,
    para,
    children
}) => {
    const [hovered, setHovered] = React.useState(false);
    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="border border-black/[0.2] group/canvas-card flex items-center justify-center dark:border-white/[0.2]  max-w-sm w-full mx-auto p-4 relative h-[30rem] relative">
            <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
            <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
            <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
            <Icon
                className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />
            <AnimatePresence>
                {hovered && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="h-full w-full absolute  inset-0">
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="relative z-20">
                <div
                    className="text-center group-hover/canvas-card:-translate-y-4 group-hover/canvas-card:opacity-0 transition duration-200 w-full  mx-auto flex items-center justify-center pt-25 ">
                    {icon}
                </div>
                <h2
                    className="dark:text-white  text-center text-xl opacity-0 group-hover/canvas-card:opacity-100 relative z-10 text-black mt-4  font-bold group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-55 transition duration-250">
                    {title}
                </h2>
                <p
                    className="dark:text-white  text-center font-light opacity-0 group-hover/canvas-card:opacity-100 relative z-10 text-black mt-4   group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-55 transition duration-250">
                    {para}
                </p>
            </div>
        </div>
    );
};

export const Icon = ({
    className,
    ...rest
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={className}
            {...rest}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
        </svg>
    );
};

