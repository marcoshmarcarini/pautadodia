'use client'
import styles from './Pauta.module.css'
import { useEffect, useState } from "react"
import { db } from "../../../utils/firestore"
import { collection, query, where, getDocs } from "firebase/firestore"

export default function Pauta() {
    const [jobs, setJobs] = useState([])
    const q = query(collection(db, 'jobs'))

    useEffect(() => {
        const handleExibirJobs = async () => {
            const querySnapshot = await getDocs(q)
            const snapData = []
            querySnapshot.forEach((doc) => {
                snapData.push({ id: doc.id, ...doc.data() })
            })
            setJobs(snapData)
        }
        handleExibirJobs()
    }, [])


    return (
        <div className={styles.pautaContent}>
            {jobs.map((job, id) => (
                job.responsavelJob === 'Bruno' ? (
                    <div key={id} className={styles.pautaCard}>
                        <h3>Bruno</h3>
                        <ul key={id}>
                            {job.nomeDoJob !== '' ? (
                                jobs.map((job, id) => (
                                    <li key={id}>
                                        <p>Job:{job.nomeDoJob}</p>
                                    </li>
                                ))
                            ) : ''}
                        </ul>
                    </div>
                ) :
                    job.responsavelJob === 'Dani' ? (
                        <div key={id} className={styles.pautaCard}>
                            <h3>Bruno</h3>
                            <ul key={id}>
                                {job.nomeDoJob !== '' ? (
                                    jobs.map((job, id) => (
                                        <li key={id}>
                                            <p>Job:{job.nomeDoJob}</p>
                                        </li>
                                    ))
                                ) : ''}
                            </ul>
                        </div>
                    ) :

                        job.responsavelJob === 'Juninho' ? (
                            <div key={id} className={styles.pautaCard}>
                                <h3>Bruno</h3>
                                <ul key={id}>
                                    {job.nomeDoJob !== '' ? (
                                        jobs.map((job, id) => (
                                            <li key={id}>
                                                <p>Job:{job.nomeDoJob}</p>
                                            </li>
                                        ))
                                    ) : ''}
                                </ul>
                            </div>
                        ) :

                            job.responsavelJob === 'Leandro' ? (
                                <div key={id} className={styles.pautaCard}>
                                    <h3>Bruno</h3>
                                    <ul key={id}>
                                        {job.nomeDoJob !== '' ? (
                                            jobs.map((job, id) => (
                                                <li key={id}>
                                                    <p>Job:{job.nomeDoJob}</p>
                                                </li>
                                            ))
                                        ) : ''}
                                    </ul>
                                </div>
                            ) :
                                job.responsavelJob === 'Luiz' ? (
                                    <div key={id} className={styles.pautaCard}>
                                        <h3>Bruno</h3>
                                        <ul key={id}>
                                            {job.nomeDoJob !== '' ? (
                                                jobs.map((job, id) => (
                                                    <li key={id}>
                                                        <p>Job:{job.nomeDoJob}</p>
                                                    </li>
                                                ))
                                            ) : ''}
                                        </ul>
                                    </div>
                                ) :
                                    job.responsavelJob === 'Rafaela' ? (
                                        <div key={id} className={styles.pautaCard}>
                                            <h3>Bruno</h3>
                                            <ul key={id}>
                                                {job.nomeDoJob !== '' ? (
                                                    jobs.map((job, id) => (
                                                        <li key={id}>
                                                            <p>Job:{job.nomeDoJob}</p>
                                                        </li>
                                                    ))
                                                ) : ''}
                                            </ul>
                                        </div>
                                    ) :
                                        job.responsavelJob === 'Renan Lessa' ? (
                                            <div key={id} className={styles.pautaCard}>
                                                <h3>Bruno</h3>
                                                <ul key={id}>
                                                    {job.nomeDoJob !== '' ? (
                                                        jobs.map((job, id) => (
                                                            <li key={id}>
                                                                <p>Job:{job.nomeDoJob}</p>
                                                            </li>
                                                        ))
                                                    ) : ''}
                                                </ul>
                                            </div>
                                        ) :
                                            job.responsavelJob === 'Rodolfo' ? (
                                                <div key={id} className={styles.pautaCard}>
                                                    <h3>Bruno</h3>
                                                    <ul key={id}>
                                                        {job.nomeDoJob !== '' ? (
                                                            jobs.map((job, id) => (
                                                                <li key={id}>
                                                                    <p>Job:{job.nomeDoJob}</p>
                                                                </li>
                                                            ))
                                                        ) : ''}
                                                    </ul>
                                                </div>
                                            ) :
                                                job.responsavelJob === 'Thiago' ? (
                                                    <div key={id} className={styles.pautaCard}>
                                                        <h3>Bruno</h3>
                                                        <ul key={id}>
                                                            {job.nomeDoJob !== '' ? (
                                                                jobs.map((job, id) => (
                                                                    <li key={id}>
                                                                        <p>Job:{job.nomeDoJob}</p>
                                                                    </li>
                                                                ))
                                                            ) : ''}
                                                        </ul>
                                                    </div>
                                                ) :
                                                    job.responsavelJob === 'Victória' ? (
                                                        <div key={id} className={styles.pautaCard}>
                                                            <h3>Bruno</h3>
                                                            <ul key={id}>
                                                                {job.nomeDoJob !== '' ? (
                                                                    jobs.map((job, id) => (
                                                                        <li key={id}>
                                                                            <p>Job:{job.nomeDoJob}</p>
                                                                        </li>
                                                                    ))
                                                                ) : ''}
                                                            </ul>
                                                        </div>
                                                    ) : ''
                    ))}
        </div >
    )
}