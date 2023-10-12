import styles from './page.module.css'
import Link from 'next/link'
import Image from 'next/image'

async function getData() {
  try {
    const res = await fetch('http://localhost:3000/api/posts', {
      cache: 'no-store',
    });
    return res.json()
  } catch (e) {
    console.log('getData error', e);
  }
}

const Blog = async () => {
  const data = await getData();
  
  return (
    <div className={ styles.mainContainer }>
      {
        data?.map(item => (
          <Link href={`blog/${item._id}`} className={ styles.container } key={ `${item.id}-${item.title}` }>
            <div className={ styles.imageContainer }>
              <Image
                src={item.img}
                alt=""
                width={ 400 }
                height={ 250 }
                className={ styles.image }
              />
            </div>
            <div className={ styles.content }>
              <h1 className={ styles.title }>{ item.title }</h1>
              <p className={ styles.desc }>{ item.desc }</p>
            </div>
          </Link>
        ))
      }


    </div>
  )
}

export default Blog
