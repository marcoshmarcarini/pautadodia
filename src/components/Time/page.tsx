'use client'
import { useEffect, useState } from "react"
import { Zamora } from "../Fonts/page"
import styles from "./Time.module.css"

export default function Time() {
    const [time, setTime] = useState('')

    useEffect(() => {
        setInterval(() => {
            setTime(new Date().toLocaleTimeString()) 
        }, 1000)
    }, [time])

    return (
        <>
            <p className={`${Zamora.className} ${styles.time}`}>{time}</p>
        </>
    )
}