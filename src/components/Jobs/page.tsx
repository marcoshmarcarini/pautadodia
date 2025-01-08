'use client';

import { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { ConstructioGrotesk, RocGrotesk } from '../Fonts/page';
import { JobsProps } from '../../../utils/interfaces';
import db from '../../../utils/firebase';
import styles from './Jobs.module.css';

export default function JobsView() {
    const [jobs, setJobs] = useState<Record<string, JobsProps[]>>({
        bruno: [], carlao: [], dani: [], juninho: [],
        leandro: [], rafaela: [], renan: [], rodolfo: []
    });

    // Função para verificar se a data é de hoje
    const isToday = (timeStamp: string | Date | { toDate: () => Date }) => {
        const jobDate =
            typeof timeStamp === 'object' && 'toDate' in timeStamp
                ? timeStamp.toDate()
                : new Date(timeStamp);

        const today = new Date();
        return (
            jobDate.getDate() === today.getDate() &&
            jobDate.getMonth() === today.getMonth() &&
            jobDate.getFullYear() === today.getFullYear()
        );
    };

    const getJobs = async () => {
        try {
            const q = query(collection(db, 'Jobs'), orderBy('timeStamp', 'desc'));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const jobsMap: Record<string, JobsProps[]> = Object.keys(jobs).reduce((acc, key) => {
                    acc[key] = [];
                    return acc;
                }, {} as Record<string, JobsProps[]>);

                querySnapshot.forEach((doc) => {
                    const data = { ...doc.data(), id: doc.id } as JobsProps;
                    if (data.nome && data.responsavel && data.timeStamp) {
                        const responsavel = data.responsavel.toLowerCase();

                        // Lógica para manter os jobs concluídos do dia atual
                        if (
                            !data.concluido || // Sempre mantém os não concluídos
                            (data.concluido && isToday(data.timeStamp)) // Mantém os concluídos do dia atual
                        ) {
                            if (jobsMap[responsavel]) {
                                jobsMap[responsavel].push(data);
                            }
                        }
                    }
                });

                setJobs(jobsMap);
            });
            return () => unsubscribe();
        } catch (error) {
            console.error('Erro ao buscar os jobs:', error);
        }
    };

    useEffect(() => {
        getJobs();
    }, []);

    return (
        <div className={styles.jobContainer}>
            {Object.keys(jobs).map((responsavel) => (
                <div key={responsavel} className={styles.jobCard}>
                    <h3 className={`${styles.responsavel} ${ConstructioGrotesk.className}`}>
                        {responsavel === 'carlao' ? 'CARLÃO' : responsavel.toUpperCase()}
                    </h3>
                    <ul className={`${styles.jobList} ${RocGrotesk.className}`}>
                        {jobs[responsavel].map((jobObj) => (
                            <li key={jobObj.id} className={styles.jobItem}>
                                <p
                                    className={styles.jobInput}
                                    style={{
                                        textDecoration: jobObj.concluido ? 'line-through' : 'none',
                                        color: jobObj.concluido ? 'var(--purple-1)' : 'var(--foreground)',
                                        fontWeight: jobObj.concluido ? 'bold' : 'normal',
                                    }}
                                >
                                    {jobObj.nome}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}
