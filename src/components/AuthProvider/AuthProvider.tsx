'use client'
import React from 'react'
import { SessionProvider } from "next-auth/react";

type AuthProviderProps = {
  children: React.ReactNode;
}
const AuthProvider = ({ children }: AuthProviderProps) => {
  return (
    <div>
        <SessionProvider>
            {children}
        </SessionProvider>
      
    </div>
  )
}

export default AuthProvider
