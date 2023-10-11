'use client'

import { useContext } from 'react'
import styles from './DarkModeToggle.module.css'
import Image from 'next/image'
import { ThemeContext } from '../../context/ThemeContext'

const DarkModeToggle = () => {
    const { toggle, mode } = useContext(ThemeContext);

    return (
        <div className={ styles.container } onClick={ toggle }>
            <Image src="/darkmode.svg" alt='' width={ 14 } height={ 14 } className={ styles.icon } />
            <Image src="/lightmode.svg" alt='' width={ 14 } height={ 14 } className={ styles.icon } />
            <div className={ styles.ball } style={ mode === 'light' ? { left: '2px' } : { right: '2px' } }></div>
        </div>
    )
}

export default DarkModeToggle
