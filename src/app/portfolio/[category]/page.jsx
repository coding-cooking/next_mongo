import React from 'react'
import styles from './page.module.css'
import Button from '@/components/Button/button'
import Image from 'next/image'
import { items } from './data'
import { notFound } from 'next/navigation'

const getData = (cat) => {
  const data = items[cat];
  console.log(data);
  if(data) {
    console.log('111',data);
    return data;
  }
  return notFound();
}

const Category = ({ params }) => {
  const data = getData(params.categoty);

  return (
    <div className={styles.container}>
      <h1 className={ styles.catTitle }>{params.categoty}</h1>

      {data.map(item => (
        <div className={ styles.item } key={item.id}>
          <div className={ styles.content }>
            <h1 className={ styles.title }>1111</h1>
            <p className={ styles.desc }>2222</p>
            <Button text='See More' url="#" />
          </div>
          <div className={ styles.imgContainer }>
            <Image
              className={ styles.img }
              fill={ true }
              src={item.image}
              alt="" />
          </div>
        </div> 
        
      ))}
      
      
    </div>
  )
}

export default Category
