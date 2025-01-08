'use client'

import { useState } from "react"

import Time from "@/components/Time/page"
import ViewJob from "@/components/ViewJob/page"
import CreateJob from "@/components/CreateJob/page"

export default function useJobs() {
    const [haveNewJob, setHaveNewJob] = useState(false);

    return (
        <div className={`flex flex-col gap-5 justify-center items-center h-screen px-5 py-5`}>
            <Time />
            <CreateJob onJobCreated={() => setHaveNewJob((prev) => !prev)} />
            <ViewJob haveNewJob={haveNewJob} />
        </div>
    );
}