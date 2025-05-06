import { community } from "@/data/community";
import React from "react";
import * as Icons from "lucide-react";
import Title from "./Title";
const Community = () => {
    return (
        <div className="max-w-screen m-20">
            <Title title="Join Our Community" sub=" Stay connected across platforms, get the latest updates, and join the conversation.
   "/>
            <div className="space-y-4 w-2/4 mx-auto grid grid-cols-1 sm:grid-cols-3 ">
                {community.map((link) => {
                    const LucideIcon = Icons[link.icon] || Icons.Link;
                    return (
                        <a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-[rgb(22,20,41)] transition-colors"
                        >

                            <div>
                                <div className=" flex items-center space-x-2 text-2xl text-white">
                                    <LucideIcon className="w-12 h-12 rounded-2xl p-3 bg-[#171b25]" />
                                    <div className="font-bold"> {link.name}</div>
                                </div>
                                <div className="pl-14 font-light text-gray-400">{link.description}</div>
                            </div>
                        </a>
                    );
                })}
            </div>
        </div>
    );
};

export default Community;