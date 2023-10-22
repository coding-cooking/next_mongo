'use client'
import styles from './page.module.css'
import useSWR from 'swr'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FormEvent, MutableRefObject, useRef } from 'react'
import Image from "next/image"

type PostProps = {
  title: string;
  desc: string;
  img: string;
  content: string;
  userName: string;
  _id: string;
}

const Dashboard = () => {
  const session = useSession();
  const router = useRouter();
  const formRef = useRef<MutableRefObject<HTMLFormElement>>(null);
  const fetcher = (...args: string[]) => fetch(args.join('/')).then((res) => res.json())
  const { data, mutate, error, isLoading } = useSWR(
    `/api/posts?userName=${session?.data?.user?.name}`,
    fetcher
  );

  if (session.status === 'loading') {
    return <p>Lading...</p>;
  }

  if (session.status === 'unauthenticated') {
    router?.push('dashboard/login');
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const target = e.target as (typeof e.target & {
      title: { value: string };
      desc: { value: string };
      image: { value: string };
      content: { value: string };
    });
    const title = target.title.value;
    const desc = target.desc.value;
    const img = target.image.value;
    const content = target.content.value;

    try {
      await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
          title,
          desc,
          img,
          content,
          userName: session?.data?.user?.name,
        })
      })
      mutate();
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      console.log(err)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
      mutate();
    } catch (err) {
      console.log(err)
    }
  }

  if (session.status === 'authenticated') {
    return <div className={styles.container}>
      <div className={styles.posts}>
        {isLoading
          ? "loading..."
          : data?.map((post: PostProps) => (
            <div className={styles.post} key={`${post._id}-${post.title}`} >
              <div className={styles.imgContainer}>
                <Image src={post.img} alt="" className={styles.img} width={200} height={100} />
              </div>
              <h2 className={styles.postTitle}>{post.title}</h2>
              <span
                className={styles.delete}
                onClick={() => handleDelete(post._id)}
              >
                X
              </span>
            </div>
          ))}
      </div>
      <form className={styles.new} onSubmit={handleSubmit}>
        <h1>Add New Post</h1>
        <input type="text" placeholder="Title" name="title" className={styles.input} />
        <input type="text" placeholder="Desc" name="desc" className={styles.input} />
        <input type="text" placeholder="Image" name="image" className={styles.input} />
        <textarea
          placeholder="Content"
          className={styles.textArea}
          cols={30}
          rows={10}
          name="content"
        ></textarea>
        <button className={styles.button}>Send</button>
      </form>
    </div>
  }
}

export default Dashboard
