'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { collection, updateDoc, doc, deleteDoc, onSnapshot, query, orderBy } from 'firebase/firestore'
import { ConstructioGrotesk, RocGrotesk } from '../Fonts/page'
import { JobsProps, ViewJobProps } from '../../../utils/interfaces'
import db from '../../../utils/firebase'
import styles from './ViewJob.module.css'

export default function ViewJob({ jobs, updateJob, haveNewJob }: ViewJobProps) {
    const [job, setJob] = useState<Record<string, JobsProps[]>>(jobs)
    const [inputValues, setInputValues] = useState<Record<string, string>>({})

    useEffect(() => {
        const q = query(collection(db, 'Jobs'), orderBy('timeStamp', 'desc'))
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const jobsMap: Record<string, JobsProps[]> = Object.keys(jobs).reduce((acc, key) => {
                acc[key] = []
                return acc
            }, {} as Record<string, JobsProps[]>)

            querySnapshot.forEach((doc) => {
                const data = { ...doc.data(), id: doc.id } as JobsProps
                if (data.nome && data.responsavel) {
                    const responsavel = data.responsavel.toLowerCase()
                    if (jobsMap[responsavel]) jobsMap[responsavel].push(data)
                }
            });

            setJob(jobsMap)
        })

        return () => unsubscribe()
    }, [haveNewJob])

    const checkJob = async (responsavel: string, jobId: string) => {
        try {
            const jobRef = doc(db, 'Jobs', jobId)
            await updateDoc(jobRef, { concluido: true })

            setJob((prev) => ({
                ...prev,
                [responsavel]: prev[responsavel].map((item) =>
                    item.id === jobId ? { ...item, concluido: true } : item
                ),
            }))
        } catch (error) {
            console.error('Erro ao atualizar job: ', error)
        }
    }

    const deleteJob = async (responsavel: string, jobId: string) => {
        try {
            const jobRef = doc(db, 'Jobs', jobId)
            await deleteDoc(jobRef)

            setJob((prev) => ({
                ...prev,
                [responsavel]: prev[responsavel].filter((item) => item.id !== jobId),
            }))
        } catch (error) {
            console.error('Erro ao deletar job: ', error)
        }
    }

    return (
        <div className={styles.jobContainer}>
            {Object.keys(job).map((responsavel) => (
                <div key={responsavel} className={styles.jobCard}>
                    <h3 className={`${styles.responsavel} ${ConstructioGrotesk.className}`}>
                        {responsavel === 'carlao' ? 'CARLÃO' : responsavel.toUpperCase()}
                    </h3>
                    <ul className={`${styles.jobList} ${RocGrotesk.className}`}>
                        {job[responsavel].map((jobObj) => (
                            <li key={jobObj.id} className={styles.jobItem}>
                                <form className={styles.jobForm}>
                                    <input
                                        type="text"
                                        placeholder={jobObj.nome}
                                        className={styles.jobInput}
                                        value={inputValues[`${responsavel}-${jobObj.id}`] ?? jobObj.nome}
                                        onChange={(e) =>
                                            setInputValues((prev) => ({
                                                ...prev,
                                                [`${responsavel}-${jobObj.id}`]: e.target.value,
                                            }))
                                        }
                                        style={{
                                            textDecoration: jobObj.concluido ? 'line-through' : 'none',
                                            color: jobObj.concluido ? 'var(--purple-1)' : 'var(--foreground)',
                                            fontWeight: jobObj.concluido ? 'bold' : 'normal',
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            updateJob(
                                                inputValues[`${responsavel}-${jobObj.id}`] ?? jobObj.nome,
                                                responsavel,
                                                jobObj.id
                                            )
                                        }
                                        className={styles.atualizarButton}
                                    >
                                        <Image
                                            src="https://img.icons8.com/ios-filled/50/ffffff/synchronize.png"
                                            width={30}
                                            height={30}
                                            alt="Atualizar"
                                        />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => checkJob(responsavel, jobObj.id)}
                                        className={styles.concluirButton}
                                    >
                                        <Image
                                            src="https://img.icons8.com/ios-filled/50/ffffff/checkmark--v1.png"
                                            width={30}
                                            height={30}
                                            alt="Concluído"
                                        />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => deleteJob(responsavel, jobObj.id)}
                                        className={styles.deletarButton}
                                    >
                                        <Image
                                            src="https://img.icons8.com/ios-glyphs/30/ffffff/multiply.png"
                                            width={30}
                                            height={30}
                                            alt="Delete"
                                        />
                                    </button>
                                </form>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}
