import { useRouter } from 'next/router'
import styles from './Menu.module.css'

export default function MainMenu() {
    const router = useRouter()



    return (
        <div className={styles.menuContent}>
            <nav className={styles.navContent}>
                <ul className={styles.navList}>
                    <li className={styles.navItem}>
                        <a
                            href={'/'}
                            className={`${styles.navLink} text-orange-800 hover:text-orange-400`}
                            onClick={() => router.push('/')}
                        >
                            Cadastrar Job
                        </a>
                    </li>
                    <li className={styles.navItem}>
                        <a
                            href={'/pauta'}
                            className={`${styles.navLink} text-orange-800 hover:text-orange-400`}
                            onClick={() => router.push('/pauta')}
                        >
                            Pauta do dia
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}