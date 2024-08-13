'use client'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import LoginCard from '@/components/login/LoginCard'
import React from 'react'
import styles from './page.module.css'

const LoginPage = () => {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    console.log('Session status:', status)
    if (status === 'authenticated') {
      router.push('/')
    }
  }, [status, router])

  return (
    <article className={styles.loginbox}>
      <LoginCard />
    </article>
  )
}

export default LoginPage
