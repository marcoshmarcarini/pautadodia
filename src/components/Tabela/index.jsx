import styles from './Tabela.module.css'
import { useEffect, useState } from "react"
import { db } from '../../../utils/firestore'
import { arrayUnion, collection, doc, deleteDoc, getDoc, getDocs, orderBy, query, updateDoc, where, setDoc } from 'firebase/firestore'
import Image from 'next/image'
import useSWR, { mutate } from 'swr'



const fetcher = async (url) => {
  const response = await fetch(url)
  return response.json()
}

export default function Tabela() {
  /* Não é necessário fazer uma tabela e sim um card. */
  const { data: jobsData, mutate } = useSWR('/api/jobs', fetcher)
  const [jobs = jobsData, setJobs] = useState({
    bruno: [], dani: [], juninho: [],
    leandro: [], luiz: [], rafaela: [],
    renan: [], rodolfo: [], thiago: [],
    victoria: [],
  })

  const [editingJob, setEditingJob] = useState(null)


  const [editingFields, setEditingFields] = useState({
    nomeDoJob: "",
    responsavelJob: "",
  })
  const fetchData = async () => {

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

    mutate()

  }

  useEffect(() => {
    fetchData()

    const intervalTable = setInterval(() => {
      fetchData()
    }, 60000)

    return () => clearInterval(intervalTable)
  }, [])


  const handleEdit = async (newData) => {
    try {
      const newData = {
        id: editingJob.id,
        nomeDoJob: editingFields.nomeDoJob,
        responsavelJob: editingFields.responsavelJob,
      };

      const jobDocRef = doc(db, 'jobs', newData.id);
      await updateDoc(jobDocRef, {
        nomeDoJob: newData.nomeDoJob,
        responsavelJob: newData.responsavelJob,
      });

      fetchData();
      setEditingJob(null);
      setEditingFields({
        nomeDoJob: "",
        responsavelJob: "",
      });
    } catch (error) {
      console.error('Erro ao editar o job:', error);
    }
  }

  const handleClickEdit = (e, job) => {

    setEditingFields({
      nomeDoJob: job.nomeDoJob,
      responsavelJob: job.responsavelJob,
    })

    setEditingJob(job)

  }

  const handleCancelEdit = () => {
    setEditingJob(null)
  }

  const handleConcluirJob = async (job) => {
    try {
      const currentDate = new Date();
      const day = currentDate.getDate().toString().padStart(2, '0');
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      const year = currentDate.getFullYear();
      const historicoDate = `${day}-${month}-${year}`;

      const historicoDocRef = doc(db, 'historico', historicoDate);
      const jobDocRef = doc(db, 'jobs', job.id);

      // Adiciona o job ao histórico
      const historicoDoc = await getDoc(historicoDocRef);
      if (historicoDoc.exists()) {
        await updateDoc(historicoDocRef, {
          jobs: arrayUnion({ ...job, timeStampHistorico: new Date() })
        });
      } else {
        await setDoc(historicoDocRef, {
          jobs: [{ ...job, timeStampHistorico: new Date() }]
        });
      }

      // Remove o job da lista original
      await deleteDoc(jobDocRef);

      // Atualiza a tabela
      fetchData();

      // Recarrega a tabela
      mutate();
    } catch (error) {
      console.error('Erro ao concluir o job:', error);
    }
  }

  const handleDeleteJob = async (job) => {
    try {
      const jobDeleteRef = doc(db, 'jobs', job.id)
      await deleteDoc(jobDeleteRef)
      // Atualiza a tabela
      fetchData();

      // Recarrega a tabela
      mutate();
    } catch (error) {
      console.error('Erro ao excluir o job:', error);
    }

  }


  return (
    <>
      <div className={styles.tabelaContent}>
        <div className={styles.tCard}>
          <h3 className={styles.cardTitulo}>Bruno</h3>
          {jobs.bruno.map((job, id) => (
            <ul key={id} className={styles.cardList}>
              {job.responsavelJob === 'Bruno' ? (
                <li className={styles.cardItem}>
                  {editingJob === job ? (
                    <>
                      <div className={styles.cardEdit}>
                        <div className={styles.cardEditInputs}>
                          <input type="text" value={editingFields.nomeDoJob} onChange={(e) => setEditingFields({ ...editingFields, nomeDoJob: e.target.value })} />
                          <input type="text" value={editingFields.responsavelJob} onChange={(e) => setEditingFields({ ...editingFields, responsavelJob: e.target.value })} />
                        </div>
                        <div className={styles.cardEditButtons}>
                          <button onClick={() => handleEdit(editingJob)}>Salvar</button>
                          <button onClick={handleCancelEdit}>Cancelar</button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {job.nomeDoJob}
                      <div className={styles.tIcons}>
                        <Image
                          width="30"
                          height="30"
                          src="https://img.icons8.com/fluency-systems-filled/30/c2410c/create-new.png"
                          alt="create-new"
                          onClick={(e) => handleClickEdit(e, job)}
                        />
                        <Image
                          width="25"
                          height="25"
                          src="https://img.icons8.com/ios-filled/25/c2410c/checked-checkbox.png"
                          alt="checked-checkbox"
                          onClick={() => handleConcluirJob(job)}
                        />
                        <Image
                          width="30"
                          height="30"
                          src="https://img.icons8.com/ios-glyphs/30/c2410c/filled-trash.png"
                          alt="filled-trash"
                          onClick={(e) => handleDeleteJob(job)}
                        />
                      </div>
                    </>
                  )}
                </li>
              ) : ''}
            </ul>
          ))}
        </div>
        <div className={styles.tCard}>
          <h3 className={styles.cardTitulo}>Dani</h3>
          {jobs.dani.map((job, id) => (
            <ul key={id} className={styles.cardList}>
              {job.responsavelJob === 'Dani' ? (
                <li className={styles.cardItem}>
                  {editingJob === job ? (
                    <>
                      <div className={styles.cardEdit}>
                        <div className={styles.cardEditInputs}>
                          <input type="text" value={editingFields.nomeDoJob} onChange={(e) => setEditingFields({ ...editingFields, nomeDoJob: e.target.value })} />
                          <input type="text" value={editingFields.responsavelJob} onChange={(e) => setEditingFields({ ...editingFields, responsavelJob: e.target.value })} />
                        </div>
                        <div className={styles.cardEditButtons}>
                          <button onClick={() => handleEdit(editingJob)}>Salvar</button>
                          <button onClick={handleCancelEdit}>Cancelar</button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {job.nomeDoJob}
                      <div className={styles.tIcons}>
                        <Image
                          width="30"
                          height="30"
                          src="https://img.icons8.com/fluency-systems-filled/30/c2410c/create-new.png"
                          alt="create-new"
                          onClick={(e) => handleClickEdit(e, job)}
                        />
                        <Image
                          width="25"
                          height="25"
                          src="https://img.icons8.com/ios-filled/25/c2410c/checked-checkbox.png"
                          alt="checked-checkbox"
                          onClick={() => handleConcluirJob(job)}
                        />
                        <Image
                          width="30"
                          height="30"
                          src="https://img.icons8.com/ios-glyphs/30/c2410c/filled-trash.png"
                          alt="filled-trash"
                          onClick={(e) => handleDeleteJob(job)}
                        />
                      </div>
                    </>
                  )}
                </li>
              ) : ''}
            </ul>
          ))}
        </div>
        <div className={styles.tCard}>
          <h3 className={styles.cardTitulo}>Juninho</h3>
          {jobs.juninho.map((job, id) => (
            <ul key={id} className={styles.cardList}>
              {job.responsavelJob === 'Juninho' ? (
                <li className={styles.cardItem}>
                  {editingJob === job ? (
                    <>
                      <div className={styles.cardEdit}>
                        <div className={styles.cardEditInputs}>
                          <input type="text" value={editingFields.nomeDoJob} onChange={(e) => setEditingFields({ ...editingFields, nomeDoJob: e.target.value })} />
                          <input type="text" value={editingFields.responsavelJob} onChange={(e) => setEditingFields({ ...editingFields, responsavelJob: e.target.value })} />
                        </div>
                        <div className={styles.cardEditButtons}>
                          <button onClick={() => handleEdit(editingJob)}>Salvar</button>
                          <button onClick={handleCancelEdit}>Cancelar</button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {job.nomeDoJob}
                      <div className={styles.tIcons}>
                        <Image
                          width="30"
                          height="30"
                          src="https://img.icons8.com/fluency-systems-filled/30/c2410c/create-new.png"
                          alt="create-new"
                          onClick={(e) => handleClickEdit(e, job)}
                        />
                        <Image
                          width="25"
                          height="25"
                          src="https://img.icons8.com/ios-filled/25/c2410c/checked-checkbox.png"
                          alt="checked-checkbox"
                          onClick={() => handleConcluirJob(job)}
                        />
                        <Image
                          width="30"
                          height="30"
                          src="https://img.icons8.com/ios-glyphs/30/c2410c/filled-trash.png"
                          alt="filled-trash"
                          onClick={(e) => handleDeleteJob(job)}
                        />
                      </div>
                    </>
                  )}
                </li>
              ) : ''}
            </ul>
          ))}
        </div>
        <div className={styles.tCard}>
          <h3 className={styles.cardTitulo}>Leandro</h3>
          {jobs.leandro.map((job, id) => (
            <ul key={id} className={styles.cardList}>
              {job.responsavelJob === 'Leandro' ? (
                <li className={styles.cardItem}>
                  {editingJob === job ? (
                    <>
                      <div className={styles.cardEdit}>
                        <div className={styles.cardEditInputs}>
                          <input type="text" value={editingFields.nomeDoJob} onChange={(e) => setEditingFields({ ...editingFields, nomeDoJob: e.target.value })} />
                          <input type="text" value={editingFields.responsavelJob} onChange={(e) => setEditingFields({ ...editingFields, responsavelJob: e.target.value })} />
                        </div>
                        <div className={styles.cardEditButtons}>
                          <button onClick={() => handleEdit(editingJob)}>Salvar</button>
                          <button onClick={handleCancelEdit}>Cancelar</button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {job.nomeDoJob}
                      <div className={styles.tIcons}>
                        <Image
                          width="30"
                          height="30"
                          src="https://img.icons8.com/fluency-systems-filled/30/c2410c/create-new.png"
                          alt="create-new"
                          onClick={(e) => handleClickEdit(e, job)}
                        />
                        <Image
                          width="25"
                          height="25"
                          src="https://img.icons8.com/ios-filled/25/c2410c/checked-checkbox.png"
                          alt="checked-checkbox"
                          onClick={() => handleConcluirJob(job)}
                        />
                        <Image
                          width="30"
                          height="30"
                          src="https://img.icons8.com/ios-glyphs/30/c2410c/filled-trash.png"
                          alt="filled-trash"
                          onClick={(e) => handleDeleteJob(job)}
                        />
                      </div>
                    </>
                  )}
                </li>
              ) : ''}
            </ul>
          ))}
        </div>
        <div className={styles.tCard}>
          <h3 className={styles.cardTitulo}>Luiz</h3>
          {jobs.luiz.map((job, id) => (
            <ul key={id} className={styles.cardList}>
              {job.responsavelJob === 'Luiz' ? (
                <li className={styles.cardItem}>
                  {editingJob === job ? (
                    <>
                      <div className={styles.cardEdit}>
                        <div className={styles.cardEditInputs}>
                          <input type="text" value={editingFields.nomeDoJob} onChange={(e) => setEditingFields({ ...editingFields, nomeDoJob: e.target.value })} />
                          <input type="text" value={editingFields.responsavelJob} onChange={(e) => setEditingFields({ ...editingFields, responsavelJob: e.target.value })} />
                        </div>
                        <div className={styles.cardEditButtons}>
                          <button onClick={() => handleEdit(editingJob)}>Salvar</button>
                          <button onClick={handleCancelEdit}>Cancelar</button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {job.nomeDoJob}
                      <div className={styles.tIcons}>
                        <Image
                          width="30"
                          height="30"
                          src="https://img.icons8.com/fluency-systems-filled/30/c2410c/create-new.png"
                          alt="create-new"
                          onClick={(e) => handleClickEdit(e, job)}
                        />
                        <Image
                          width="25"
                          height="25"
                          src="https://img.icons8.com/ios-filled/25/c2410c/checked-checkbox.png"
                          alt="checked-checkbox"
                          onClick={() => handleConcluirJob(job)}
                        />
                        <Image
                          width="30"
                          height="30"
                          src="https://img.icons8.com/ios-glyphs/30/c2410c/filled-trash.png"
                          alt="filled-trash"
                          onClick={(e) => handleDeleteJob(job)}
                        />
                      </div>
                    </>
                  )}
                </li>
              ) : ''}
            </ul>
          ))}
        </div>
        <div className={styles.tCard}>
          <h3 className={styles.cardTitulo}>Rafaela</h3>
          {jobs.rafaela.map((job, id) => (
            <ul key={id} className={styles.cardList}>
              {job.responsavelJob === 'Rafaela' ? (
                <li className={styles.cardItem}>
                  {editingJob === job ? (
                    <>
                      <div className={styles.cardEdit}>
                        <div className={styles.cardEditInputs}>
                          <input type="text" value={editingFields.nomeDoJob} onChange={(e) => setEditingFields({ ...editingFields, nomeDoJob: e.target.value })} />
                          <input type="text" value={editingFields.responsavelJob} onChange={(e) => setEditingFields({ ...editingFields, responsavelJob: e.target.value })} />
                        </div>
                        <div className={styles.cardEditButtons}>
                          <button onClick={() => handleEdit(editingJob)}>Salvar</button>
                          <button onClick={handleCancelEdit}>Cancelar</button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {job.nomeDoJob}
                      <div className={styles.tIcons}>
                        <Image
                          width="30"
                          height="30"
                          src="https://img.icons8.com/fluency-systems-filled/30/c2410c/create-new.png"
                          alt="create-new"
                          onClick={(e) => handleClickEdit(e, job)}
                        />
                        <Image
                          width="25"
                          height="25"
                          src="https://img.icons8.com/ios-filled/25/c2410c/checked-checkbox.png"
                          alt="checked-checkbox"
                          onClick={() => handleConcluirJob(job)}
                        />
                        <Image
                          width="30"
                          height="30"
                          src="https://img.icons8.com/ios-glyphs/30/c2410c/filled-trash.png"
                          alt="filled-trash"
                          onClick={(e) => handleDeleteJob(job)}
                        />
                      </div>
                    </>
                  )}
                </li>
              ) : ''}
            </ul>
          ))}
        </div>
        <div className={styles.tCard}>
          <h3 className={styles.cardTitulo}>Renan Lessa</h3>
          {jobs.renan.map((job, id) => (
            <ul key={id} className={styles.cardList}>
              {job.responsavelJob === 'Renan Lessa' ? (
                <li className={styles.cardItem}>
                  {editingJob === job ? (
                    <>
                      <div className={styles.cardEdit}>
                        <div className={styles.cardEditInputs}>
                          <input type="text" value={editingFields.nomeDoJob} onChange={(e) => setEditingFields({ ...editingFields, nomeDoJob: e.target.value })} />
                          <input type="text" value={editingFields.responsavelJob} onChange={(e) => setEditingFields({ ...editingFields, responsavelJob: e.target.value })} />
                        </div>
                        <div className={styles.cardEditButtons}>
                          <button onClick={() => handleEdit(editingJob)}>Salvar</button>
                          <button onClick={handleCancelEdit}>Cancelar</button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {job.nomeDoJob}
                      <div className={styles.tIcons}>
                        <Image
                          width="30"
                          height="30"
                          src="https://img.icons8.com/fluency-systems-filled/30/c2410c/create-new.png"
                          alt="create-new"
                          onClick={(e) => handleClickEdit(e, job)}
                        />
                        <Image
                          width="25"
                          height="25"
                          src="https://img.icons8.com/ios-filled/25/c2410c/checked-checkbox.png"
                          alt="checked-checkbox"
                          onClick={() => handleConcluirJob(job)}
                        />
                        <Image
                          width="30"
                          height="30"
                          src="https://img.icons8.com/ios-glyphs/30/c2410c/filled-trash.png"
                          alt="filled-trash"
                          onClick={(e) => handleDeleteJob(job)}
                        />
                      </div>
                    </>
                  )}
                </li>
              ) : ''}
            </ul>
          ))}
        </div>
        <div className={styles.tCard}>
          <h3 className={styles.cardTitulo}>Rodolfo</h3>
          {jobs.rodolfo.map((job, id) => (
            <ul key={id} className={styles.cardList}>
              {job.responsavelJob === 'Rodolfo' ? (
                <li className={styles.cardItem}>
                  {editingJob === job ? (
                    <>
                      <div className={styles.cardEdit}>
                        <div className={styles.cardEditInputs}>
                          <input type="text" value={editingFields.nomeDoJob} onChange={(e) => setEditingFields({ ...editingFields, nomeDoJob: e.target.value })} />
                          <input type="text" value={editingFields.responsavelJob} onChange={(e) => setEditingFields({ ...editingFields, responsavelJob: e.target.value })} />
                        </div>
                        <div className={styles.cardEditButtons}>
                          <button onClick={() => handleEdit(editingJob)}>Salvar</button>
                          <button onClick={handleCancelEdit}>Cancelar</button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {job.nomeDoJob}
                      <div className={styles.tIcons}>
                        <Image
                          width="30"
                          height="30"
                          src="https://img.icons8.com/fluency-systems-filled/30/c2410c/create-new.png"
                          alt="create-new"
                          onClick={(e) => handleClickEdit(e, job)}
                        />
                        <Image
                          width="25"
                          height="25"
                          src="https://img.icons8.com/ios-filled/25/c2410c/checked-checkbox.png"
                          alt="checked-checkbox"
                          onClick={() => handleConcluirJob(job)}
                        />
                        <Image
                          width="30"
                          height="30"
                          src="https://img.icons8.com/ios-glyphs/30/c2410c/filled-trash.png"
                          alt="filled-trash"
                          onClick={(e) => handleDeleteJob(job)}
                        />
                      </div>
                    </>
                  )}
                </li>
              ) : ''}
            </ul>
          ))}
        </div>
        <div className={styles.tCard}>
          <h3 className={styles.cardTitulo}>Thiago</h3>
          {jobs.thiago.map((job, id) => (
            <ul key={id} className={styles.cardList}>
              {job.responsavelJob === 'Thiago' ? (
                <li className={styles.cardItem}>
                  {editingJob === job ? (
                    <>
                      <div className={styles.cardEdit}>
                        <div className={styles.cardEditInputs}>
                          <input type="text" value={editingFields.nomeDoJob} onChange={(e) => setEditingFields({ ...editingFields, nomeDoJob: e.target.value })} />
                          <input type="text" value={editingFields.responsavelJob} onChange={(e) => setEditingFields({ ...editingFields, responsavelJob: e.target.value })} />
                        </div>
                        <div className={styles.cardEditButtons}>
                          <button onClick={() => handleEdit(editingJob)}>Salvar</button>
                          <button onClick={handleCancelEdit}>Cancelar</button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {job.nomeDoJob}
                      <div className={styles.tIcons}>
                        <Image
                          width="30"
                          height="30"
                          src="https://img.icons8.com/fluency-systems-filled/30/c2410c/create-new.png"
                          alt="create-new"
                          onClick={(e) => handleClickEdit(e, job)}
                        />
                        <Image
                          width="25"
                          height="25"
                          src="https://img.icons8.com/ios-filled/25/c2410c/checked-checkbox.png"
                          alt="checked-checkbox"
                          onClick={() => handleConcluirJob(job)}
                        />
                        <Image
                          width="30"
                          height="30"
                          src="https://img.icons8.com/ios-glyphs/30/c2410c/filled-trash.png"
                          alt="filled-trash"
                          onClick={(e) => handleDeleteJob(job)}
                        />
                      </div>
                    </>
                  )}
                </li>
              ) : ''}
            </ul>
          ))}
        </div>
        <div className={styles.tCard}>
          <h3 className={styles.cardTitulo}>Victoria</h3>
          {jobs.victoria.map((job, id) => (
            <ul key={id} className={styles.cardList}>
              {job.responsavelJob === 'Victoria' ? (
                <li className={styles.cardItem}>
                  {editingJob === job ? (
                    <>
                      <div className={styles.cardEdit}>
                        <div className={styles.cardEditInputs}>
                          <input type="text" value={editingFields.nomeDoJob} onChange={(e) => setEditingFields({ ...editingFields, nomeDoJob: e.target.value })} />
                          <input type="text" value={editingFields.responsavelJob} onChange={(e) => setEditingFields({ ...editingFields, responsavelJob: e.target.value })} />
                        </div>
                        <div className={styles.cardEditButtons}>
                          <button onClick={() => handleEdit(editingJob)}>Salvar</button>
                          <button onClick={handleCancelEdit}>Cancelar</button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {job.nomeDoJob}
                      <div className={styles.tIcons}>
                        <Image
                          width="30"
                          height="30"
                          src="https://img.icons8.com/fluency-systems-filled/30/c2410c/create-new.png"
                          alt="create-new"
                          onClick={(e) => handleClickEdit(e, job)}
                        />
                        <Image
                          width="25"
                          height="25"
                          src="https://img.icons8.com/ios-filled/25/c2410c/checked-checkbox.png"
                          alt="checked-checkbox"
                          onClick={() => handleConcluirJob(job)}
                        />
                        <Image
                          width="30"
                          height="30"
                          src="https://img.icons8.com/ios-glyphs/30/c2410c/filled-trash.png"
                          alt="filled-trash"
                          onClick={(e) => handleDeleteJob(job)}
                        />
                      </div>
                    </>
                  )}
                </li>
              ) : ''}
            </ul>
          ))}
        </div>
      </div>
    </>

  )
}