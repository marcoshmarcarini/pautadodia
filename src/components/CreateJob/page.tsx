'use client'

import { collection, addDoc, Timestamp, getDocs } from "firebase/firestore"
import { FormEvent, useState } from "react"
import { RocGrotesk, Zamora } from "../Fonts/page"
import { JobsProps, CreateJobProps } from "../../../utils/interfaces"

import db from "../../../utils/firebase"
import styles from './CreateJob.module.css'

export default function CreateJob({ onJobCreated, addJob }: CreateJobProps) {
    console.log(addJob)

    const [job, setJob] = useState({
        nome: "",
        responsavel: "",
    })

    const [jobs, setJobs] = useState<Record<string, JobsProps[]>>({
        bruno: [], carlao: [], dani: [], juninho: [],
        leandro: [], rafaela: [], renan: [], rodolfo: [],
    })

    console.log(jobs)


    const getJobs = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'Jobs'));
            const jobsMap: Record<string, JobsProps[]> = {
                bruno: [], carlao: [], dani: [], juninho: [],
                leandro: [], rafaela: [], renan: [], rodolfo: [],
            }

            querySnapshot.forEach((docSnapshot) => {
                const data = { ...docSnapshot.data(), id: docSnapshot.id } as JobsProps
                if (data.nome && data.responsavel) {
                    const responsavel = data.responsavel.toLowerCase()
                    if (jobsMap[responsavel]) {
                        jobsMap[responsavel].push(data)
                    }
                }
            })

            setJobs(jobsMap)
        } catch (error) {
            console.error(`Erro ao buscar os Jobs: ${error}`)
        }
    }

    const handleForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const jobRef = await addDoc(collection(db, "Jobs"), {
                nome: job.nome,
                responsavel: job.responsavel,
                timeStamp: Timestamp.fromDate(new Date()),
                concluido: false,
            });
    
            console.log("Job Cadastrado: ", jobRef.id);
    
            // Limpa o estado do formulário
            setJob({
                nome: '',
                responsavel: '',
            });
    
            // Atualiza a lista de jobs
            await getJobs();
    
            // Notifica o componente pai
            onJobCreated(true);
        } catch (error) {
            console.error("Erro ao cadastrar o job: ", error);
            onJobCreated(false);
        }

    }

    return (
        <div className={styles.formContent}>
            <form onSubmit={handleForm}>
                <div className={styles.formControl}>
                    <div>
                        <label htmlFor="nome_job" className={styles.dNone}>
                            Nome do Job
                        </label>
                        <input
                            type="text"
                            placeholder="Nome Do Job"
                            id="nome_job"
                            onChange={(e) => setJob({ ...job, nome: e.target.value })}
                            className={`${styles.input} ${RocGrotesk.className}`}
                        />
                    </div>
                    <div>
                        <label htmlFor="responsavel" className={styles.dNone}>Responsável</label>
                        <select
                            name="Responsável"
                            id="responsavel"
                            onChange={(e) => setJob({ ...job, responsavel: e.target.value })}
                            value={job.responsavel}
                            className={`${styles.input} ${RocGrotesk.className}`}
                        >
                            <option value="" disabled className={styles.options}>Selecione um responsável</option>
                            <option value="Bruno" className={styles.options}>Bruno</option>
                            <option value="Carlao" className={styles.options}>Carlão</option>
                            <option value="Dani" className={styles.options}>Dani</option>
                            <option value="Juninho" className={styles.options}>Juninho</option>
                            <option value="Leandro" className={styles.options}>Leandro</option>
                            <option value="Rafaela" className={styles.options}>Rafaela</option>
                            <option value="Renan" className={styles.options}>Renan</option>
                            <option value="Rodolfo" className={styles.options}>Rodolfo</option>
                        </select>
                    </div>
                </div>
                <button
                    className={`${styles.button} ${Zamora.className}`}
                    type="submit"
                >
                    Cadastrar
                </button>
            </form>
        </div>
    )
}