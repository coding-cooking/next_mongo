import React from 'react'
import styles from './footer.module.css'
import Image from 'next/image'

const Footer = () => {
  return (
      <div className={ styles.container }>
          <div>©2023 Alias. All rights reserved.</div>
          <div className={ styles.social }>
              <Image src="/facebookLogo.png" width={ 15 } height={ 15 } className={ styles.icon } alt="Alias Dev Facebook Account" />
              <Image src="/instaLogo.png" width={ 15 } height={ 15 } className={ styles.icon } alt="Alias Dev" />
              <Image src="/twitterLogo.png" width={ 15 } height={ 15 } className={ styles.icon } alt="Alias Dev" />
              <Image src="/youtubeLogo.png" width={ 15 } height={ 15 } className={ styles.icon } alt="Alias Dev" />
          </div>
     </div>
  )
}

export default Footer
