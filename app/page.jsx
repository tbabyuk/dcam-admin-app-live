"use client"

import { LoginForm } from './components/LoginForm'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuthContext } from '@/context/AuthContext'


const Home = () =>  {

  const router = useRouter()
  const {authenticatedUser} = useAuthContext()


  console.log("logging.......", authenticatedUser)


  useEffect(() => {
    if(authenticatedUser !== null) {
      router.push("/dashboard")
    }
  }, [authenticatedUser])


  return (
    <main className="flex h-screen">
      <div className="hidden md:block w-1/2 bg-[url('/admin-left.jpg')] bg-center bg-cover" />
      <div className="w-full md:w-1/2 bg-[url('/admin-right.jpg')] bg-cover">
          <img src="dcam-logo-white-long.png" width={200} className="mx-auto my-16" />
          <LoginForm />
      </div>
    </main>
  )
}

export default Home
