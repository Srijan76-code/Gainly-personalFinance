"use client";

import { people } from "@/data/cta";
import { AnimatedTooltip } from "./ui/animated-tooltip";
import Button from "./styleComponent/Button";

export default function Cta() {
    return (
        <div className="  space-y-3 md:space-y-9 max-w-4xl mx-auto flex flex-col text-center items-center justify-center p-10 sm:p-20 md:p-24 bg-[#07080A] bg-no-repeat bg-cover" style={{ backgroundImage: "url('./hero/bg-lines.png')" }} >

            <div className="space-y-5 pb-4  space-x-2 " >
                <p className="text-2xl md:text-4xl font-bold  " >Take Control with Gainly</p>
                <p className=" font-light ">Your financial wellness is just a message away.</p>
            </div>

            <Button   >{`Talk to us`}</Button>

            <div className="flex  flex-wrap">
                <AnimatedTooltip items={people} />
            </div>
        </div>
    );
}
