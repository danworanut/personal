import styles from "@/styles/Sidebar.module.css";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";


export default function Sidebar() {

    const [isNavbarOpen, setIsNavbarOpen] = useState(true);

    return (
        <>
            <header className={styles.header}>
                <div className={styles.hamburger} onClick={() => setIsNavbarOpen(!isNavbarOpen)}>Menu</div>

                <nav className={`${styles.sidebar} ${isNavbarOpen ? "" : styles.hidden}`}>


                    <div>
                        <Link href="/" className={styles.logo}>
                            Personal App

                        </Link>

                    </div>



                    <div className={styles.profile}>
                        <div className={styles.avatar}><img src="https://i.pinimg.com/736x/e2/f8/ca/e2f8ca1ecacc075553f0174b48c2f24c.jpg" alt="Your Image" /></div>
                        <div className={styles.name_user}>Moamoa</div>
                    </div>

                    <ul className={styles.menu}>
                        <li className={styles.menu_list}>

                            <Link href="/" className={styles.menu_content}>
                                {/* <box-icon color="white" type='solid' name='dashboard'></box-icon> */}
                                Dashboard
                            </Link>
                        </li>

                        <li className={styles.menu_list}>
                            <Link href="/calendar" className={styles.menu_content}>
                                {/* <box-icon color="white" name='calendar-heart' type='solid' ></box-icon>  */}
                                Calendar</Link>
                        </li>

                        <li className={styles.menu_list}>
                            <Link href="/todolist" className={styles.menu_content}>
                                {/* <box-icon color="white" name='list-check' ></box-icon> */}
                                To-do List</Link>
                        </li>

                        <li className={styles.menu_list}>
                            <Link href="/jounals" className={styles.menu_content}>
                                {/* <box-icon color="white" name='book-heart' type='solid' ></box-icon>  */}
                                Jounals</Link>
                        </li>

                    </ul>

                    <div className={styles.btn_logout}>
                        <li className={styles.menu_list}>

                            <div className={styles.menu_content}>
                                {/* <box-icon color="white" name='log-out-circle'></box-icon>  */}
                                Log out</div>
                        </li>
                    </div>
                </nav>
            </header>
        </>
    )
}
