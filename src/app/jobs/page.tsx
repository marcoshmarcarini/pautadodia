'use client'

import Time from '@/components/Time/page'
import JobsView from '@/components/Jobs/page'

export default function Jobs() {
    
    return (
        <div className="flex flex-col gap-5 justify-center items-center h-screen px-5 py-5">
            <Time />
            <JobsView />
        </div>
    )
}
