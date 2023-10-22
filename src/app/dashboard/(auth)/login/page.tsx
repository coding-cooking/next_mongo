'use client'
import { signIn, useSession } from 'next-auth/react'
import styles from './page.module.css'
import React, { FormEvent } from 'react'
import { useRouter } from 'next/navigation'

const Login = () => {
  const session = useSession();
  const router = useRouter();
  
  if (session.status === 'loading') {
    return <p>Lading...</p>;
  }

  if (session.status === 'authenticated') {
    router?.push('/dashboard');
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const email = ((e.target as HTMLFormElement).elements[0] as HTMLInputElement).value;
    const password = ((e.target as HTMLFormElement).elements[1] as HTMLInputElement).value;

    signIn("credentials", {email, password});
  }
  return (
    <div className={styles.container}>
      <form onSubmit={ handleSubmit } className={ styles.form }>
        <input
          type="text"
          placeholder="Email"
          required
          className={ styles.input }
        />
        <input
          type="password"
          placeholder="Password"
          required
          className={ styles.input }
        />
        <button className={ styles.button }>Login</button>
      </form>
      
      <button onClick={() => signIn('google')}>Login with Google</button>
    </div>
  )
}

export default Login
