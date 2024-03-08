'use client'
import { useState } from "react"
import { db } from "../../utils/firestore"
import { addDoc, collection } from "firebase/firestore"
import Tabela from "@/components/Tabela"
import useSWR from "swr"
import Dia from "@/components/Dia"

const fetcher = async (url) => {
  const response = await fetch(url)
  return response.json()
}

export default function Home() {
  const { mutate } = useSWR('/api/jobs', fetcher)
  const [nomeJob, setNomeJob] = useState({
    nomeDoJob: '',
    responsavelJob: '',
    timeStamp: null,
  })

  const [reloadTable, setReloadTable] = useState(false)

  const handleJob = async (e) => {
    e.preventDefault()

    await addDoc(collection(db, 'jobs'), {
      nomeDoJob: nomeJob.nomeDoJob,
      responsavelJob: nomeJob.responsavelJob,
      timeStamp: new Date()
    })

    setNomeJob({
      nomeDoJob: '',
      responsavelJob: '',
    })

    mutate()
    setReloadTable(true)
  }


  return (
    <>
      <div className={`flex flex-col justify-center items-center  gap-5 text-center`}>
        <form className={`flex justify-center items-center gap-5 fixed-top bg-orange-500 w-full h-10 px-5`}>
          <input
            type="text"
            name="nomeJob"
            placeholder="Nome do Job"
            value={nomeJob.nomeDoJob}
            onChange={(e) => setNomeJob({ ...nomeJob, nomeDoJob: e.target.value })}
            className={`max-w-96 w-full text-center text-orange-400 antialiased placeholder:text-orange-300`}
          />
          <input
            type="text"
            name="responsaveljob"
            placeholder="Responsável"
            value={nomeJob.responsavelJob}
            onChange={(e) => setNomeJob({ ...nomeJob, responsavelJob: e.target.value })}
            className={`max-w-96 w-full text-center text-orange-400 antialiased placeholder:text-orange-300 cursor-pointer`}
          />
          <input
            type="submit"
            onClick={handleJob}
            value={`Enviar`}
            className={`text-center bg-orange-400 text-white  px-5 cursor-pointer hover:bg-orange-600 transition`}
          />
        </form>
        <div>
          <Dia />
        </div>
        <Tabela key={reloadTable ? 'reload' : 'no-reload'} />
      </div>
    </>
  )
}