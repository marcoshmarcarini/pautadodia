import React, {useState} from 'react'

export default function Form({onSubmit}){
    const [name, setName] = useState('')
    const [job, setJob] = useState('')
    
    const handleSubmit = () => {
        e.preventDefault()
        onSubmit({name, job})
        setName('')
        setJob('')
    }

    return(
        <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
            <input type="text" value={job} onChange={(e) => setJob(e.target.value)}/>
            <button type="submit">Adicionar</button>
        </form>
    )
}