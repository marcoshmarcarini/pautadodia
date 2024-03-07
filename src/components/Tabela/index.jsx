import styles from './Tabela.module.css'
import { useEffect, useState } from "react"
import { db } from '../../../utils/firestore'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'

export default function Tabela() {
  /* Não é necessário fazer uma tabela e sim um card. */

  const [jobs, setJobs] = useState({
    bruno: [], dani: [], juninho: [],
    leandro: [], luiz: [], rafaela: [],
    renan: [], rodolfo: [], thiago: [],
    victoria: [],
  })

  useEffect(() => {
    
    const fetchData = async () => {

      const responsaveis = Object.keys(jobs)

      const fetchPromises = responsaveis.map(async(responsavel) => {
        const responsavelQuery = query(
          collection(db, "jobs"),
          where("responsavelJob", "==", responsavel),
          orderBy('timestamp', 'desc')
        )

        const responsavelSnapshot = await getDocs(responsavelQuery)
        const responsavelData = []

        responsavelSnapshot.forEach((doc) => {
          responsavelData.push({id: doc.id, ...doc.data()})
        })

        return { responsavel, data: responsavelData}
      })

      const results = await Promise.all(fetchPromises)

      const newJobs = {}
      results.forEach(({responsavel, data}) => {
        newJobs[responsavel] = data
      })

      setJobs(newJobs)

      const bruno = query(collection(db, "jobs"), where("responsavelJob", "==", "Bruno"), orderBy('timeStamp', 'desc'))
      const dani = query(collection(db, "jobs"), where("responsavelJob", "==", "Dani"), orderBy('timeStamp', 'desc'))
      const juninho = query(collection(db, "jobs"), where("responsavelJob", "==", "Juninho"), orderBy('timeStamp', 'desc'))
      const leandro = query(collection(db, "jobs"), where("responsavelJob", "==", "Leandro"), orderBy('timeStamp', 'desc'))
      const luiz = query(collection(db, "jobs"), where("responsavelJob", "==", "Luiz"), orderBy('timeStamp', 'desc'))
      const rafaela = query(collection(db, "jobs"), where("responsavelJob", "==", "Rafaela"), orderBy('timeStamp', 'desc'))
      const renan = query(collection(db, "jobs"), where("responsavelJob", "==", "Renan Lessa"), orderBy('timeStamp', 'desc'))
      const rodolfo = query(collection(db, "jobs"), where("responsavelJob", "==", "Rodolfo"), orderBy('timeStamp', 'desc'))
      const thiago = query(collection(db, "jobs"), where("responsavelJob", "==", "Thiago"), orderBy('timeStamp', 'desc'))
      const victoria = query(collection(db, "jobs"), where("responsavelJob", "==", "Victoria" || "Victória"), orderBy('timeStamp', 'desc'))

      const brunoSnapshot = await getDocs(bruno)
      const daniSnapshot = await getDocs(dani)
      const juninhoSnapshot = await getDocs(juninho)
      const leandroSnapshot = await getDocs(leandro)
      const luizSnapshot = await getDocs(luiz)
      const rafaelaSnapshot = await getDocs(rafaela)
      const renanSnapshot = await getDocs(renan)
      const rodolfoSnapshot = await getDocs(rodolfo)
      const thiagoSnapshot = await getDocs(thiago)
      const victoriaSnapshot = await getDocs(victoria)

      const brunoData = []
      const daniData = []
      const juninhoData = []
      const leandroData = []
      const luizData = []
      const rafaelaData = []
      const renanData = []
      const rodolfoData = []
      const thiagoData = []
      const victoriaData = []

      brunoSnapshot.forEach((doc) => {
        brunoData.push({ id: doc.id, ...doc.data() })
      })
      daniSnapshot.forEach((doc) => {
        daniData.push({ id: doc.id, ...doc.data() })
      })
      juninhoSnapshot.forEach((doc) => {
        juninhoData.push({ id: doc.id, ...doc.data() })
      })
      leandroSnapshot.forEach((doc) => {
        leandroData.push({ id: doc.id, ...doc.data() })
      })
      luizSnapshot.forEach((doc) => {
        luizData.push({ id: doc.id, ...doc.data() })
      })
      rafaelaSnapshot.forEach((doc) => {
        rafaelaData.push({ id: doc.id, ...doc.data() })
      })
      renanSnapshot.forEach((doc) => {
        renanData.push({ id: doc.id, ...doc.data() })
      })
      rodolfoSnapshot.forEach((doc) => {
        rodolfoData.push({ id: doc.id, ...doc.data() })
      })
      thiagoSnapshot.forEach((doc) => {
        thiagoData.push({ id: doc.id, ...doc.data() })
      })
      victoriaSnapshot.forEach((doc) => {
        victoriaData.push({ id: doc.id, ...doc.data() })
      })

      setJobs({
        bruno: brunoData, dani: daniData, juninho: juninhoData,
        leandro: leandroData, luiz: luizData, rafaela: rafaelaData,
        renan: renanData, rodolfo: rodolfoData, thiago: thiagoData,
        victoria: victoriaData,
      })

    }
    fetchData()

    const intervalTable = setInterval(() => {
      fetchData()
    }, 300000)

    return () => clearInterval(intervalTable) 
  }, [])

  return (
    <>
      
      <div className={styles.tabelaContent}>
        <div className={styles.tCard}>
          <h3 className={styles.cardTitulo}>Bruno</h3>
          {jobs.bruno.map((job, id) => (
            <ul key={id} className={styles.cardList}>
              {job.responsavelJob === 'Bruno' ? (
                <li className={styles.cardItem}>{job.nomeDoJob}</li>
              ) : ''}
            </ul>
          ))}
        </div>
        <div className={styles.tCard}>
          <h3 className={styles.cardTitulo}>Dani</h3>
          {jobs.dani.map((job, id) => (
            <ul key={id} className={styles.cardList}>
              {job.responsavelJob === 'Dani' ? (
                <li className={styles.cardItem}>{job.nomeDoJob}</li>
              ) : ''}
            </ul>
          ))}
        </div>
        <div className={styles.tCard}>
          <h3 className={styles.cardTitulo}>Juninho</h3>
          {jobs.juninho.map((job, id) => (
            <ul key={id} className={styles.cardList}>
              {job.responsavelJob === 'Juninho' ? (
                <li className={styles.cardItem}>{job.nomeDoJob}</li>
              ) : ''}
            </ul>
          ))}
        </div>
        <div className={styles.tCard}>
          <h3 className={styles.cardTitulo}>Leandro</h3>
          {jobs.leandro.map((job, id) => (
            <ul key={id} className={styles.cardList}>
              {job.responsavelJob === 'Leandro' ? (
                <li className={styles.cardItem}>{job.nomeDoJob}</li>
              ) : ''}
            </ul>
          ))}
        </div>
        <div className={styles.tCard}>
          <h3 className={styles.cardTitulo}>Luiz</h3>
          {jobs.luiz.map((job, id) => (
            <ul key={id} className={styles.cardList}>
              {job.responsavelJob === 'Luiz' ? (
                <li className={styles.cardItem}>{job.nomeDoJob}</li>
              ) : ''}
            </ul>
          ))}
        </div>
        <div className={styles.tCard}>
          <h3 className={styles.cardTitulo}>Rafaela</h3>
          {jobs.rafaela.map((job, id) => (
            <ul key={id} className={styles.cardList}>
              {job.responsavelJob === 'Rafaela' ? (
                <li className={styles.cardItem}>{job.nomeDoJob}</li>
              ) : ''}
            </ul>
          ))}
        </div>
        <div className={styles.tCard}>
          <h3 className={styles.cardTitulo}>Renan Lessa</h3>
          {jobs.renan.map((job, id) => (
            <ul key={id} className={styles.cardList}>
              {job.responsavelJob === 'Renan Lessa' ? (
                <li className={styles.cardItem}>{job.nomeDoJob}</li>
              ) : ''}
            </ul>
          ))}
        </div>
        <div className={styles.tCard}>
          <h3 className={styles.cardTitulo}>Rodolfo</h3>
          {jobs.rodolfo.map((job, id) => (
            <ul key={id} className={styles.cardList}>
              {job.responsavelJob === 'Rodolfo' ? (
                <li className={styles.cardItem}>{job.nomeDoJob}</li>
              ) : ''}
            </ul>
          ))}
        </div>
        <div className={styles.tCard}>
          <h3 className={styles.cardTitulo}>Thiago</h3>
          {jobs.thiago.map((job, id) => (
            <ul key={id} className={styles.cardList}>
              {job.responsavelJob === 'Thiago' ? (
                <li className={styles.cardItem}>{job.nomeDoJob}</li>
              ) : ''}
            </ul>
          ))}
        </div>
        <div className={styles.tCard}>
          <h3 className={styles.cardTitulo}>Victoria</h3>
          {jobs.victoria.map((job, id) => (
            <ul key={id} className={styles.cardList}>
              {job.responsavelJob === 'Victoria' ? (
                <li className={styles.cardItem}>{job.nomeDoJob}</li>
              ) : ''}
            </ul>
          ))}
        </div>
      </div>


    </>

  )
}