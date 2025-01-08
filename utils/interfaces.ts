export interface JobsProps {
    nome: string
    responsavel: string
    concluido: boolean
    id: string
    timeStamp: string
}

export interface CreateJobProps{
    onJobCreated: (newJob: boolean) => void
    addJob: (newJob: { nome: string, responsavel: string }) => Promise<void>
}

export interface ViewJobProps {
    jobs: Record<string, JobsProps[]>
    updateJob: (jobName: string, responsavel: string, jobId: string) => Promise<void>
    haveNewJob: boolean
}

