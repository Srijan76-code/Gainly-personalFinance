"use client"

import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { data } from "@/data/features";

export function TimelineDemo() {

    return (
        <div className="relative w-full  mx-auto  overflow-clip " >
            <Timeline data={data} />
        </div>
    );
}
