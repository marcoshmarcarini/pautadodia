import { useEffect, useState } from "react"

export default function Dia() {
    const [data, setData] = useState('')
    useEffect(() => {
        const handleData = () => {
            const currentData = new Date().toLocaleDateString('pt-BR')
            setData(currentData)
        }
        handleData()
    }, [])

    return (
        <h1 className={`font-bold text-xl mb-[-50px] mt-[10px]`}>
            Pauta Dia: {data}
        </h1>
    )
}