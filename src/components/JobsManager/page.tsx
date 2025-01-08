'use client'

import { useState, useEffect } from 'react'
import { collection, getDocs, addDoc, Timestamp, updateDoc, doc } from 'firebase/firestore'
import db from '../../../utils/firebase'
import CreateJob from '../CreateJob/page'
import ViewJob from '../ViewJob/page'
import { JobsProps } from '../../../utils/interfaces'

export default function JobsManager() {
    const [haveNewJob, setHaveNewJob] = useState(false);
    const [jobs, setJobs] = useState<Record<string, JobsProps[]>>({
        bruno: [], carlao: [], dani: [], juninho: [],
        leandro: [], rafaela: [], renan: [], rodolfo: [],
    })

    const getJobs = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'Jobs'))
            const jobsMap: Record<string, JobsProps[]> = Object.keys(jobs).reduce((acc, key) => {
                acc[key] = []
                return acc
            }, {} as Record<string, JobsProps[]>)

            querySnapshot.forEach((docSnapshot) => {
                const data = { ...docSnapshot.data(), id: docSnapshot.id } as JobsProps
                if (data.nome && data.responsavel) {
                    const responsavel = data.responsavel.toLowerCase()
                    if (jobsMap[responsavel]) jobsMap[responsavel].push(data)
                }
            })

            setJobs(jobsMap)
        } catch (error) {
            console.error('Erro ao buscar os Jobs: ', error)
        }
    };

    useEffect(() => {
        getJobs()
    }, [])

    const addJob = async (newJob: { nome: string; responsavel: string }) => {
        try {
            await addDoc(collection(db, 'Jobs'), {
                ...newJob,
                timeStamp: Timestamp.fromDate(new Date()),
                concluido: false,
            });
            setHaveNewJob((prev) => !prev)
        } catch (error) {
            console.error('Erro ao adicionar job: ', error)
        }
    };

    const updateJob = async (jobName: string, responsavel: string, jobId: string) => {
        try {
            const jobRef = doc(db, 'Jobs', jobId)
            await updateDoc(jobRef, { nome: jobName })
            setHaveNewJob((prev) => !prev)
        } catch (error) {
            console.error('Erro ao atualizar job: ', error);
        }
    };

    return (
        <div>
            <CreateJob addJob={addJob} onJobCreated={() => setHaveNewJob((prev) => !prev)} />
            <ViewJob jobs={jobs} updateJob={updateJob} haveNewJob={haveNewJob} />
        </div>
    );
}
