"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthContext } from "@/context/AuthContext"


export const LoginForm = () => {


  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  const {logIn, error} = useAuthContext()


  const handleLogin = async (e) => {
    e.preventDefault()
    logIn(email, password)
  }

  return (
        <form className="card-body mx-auto w-[330px] rounded-md bg-black bg-opacity-30 py-10" onSubmit={handleLogin}>
            <h2 className="text-xl text-gray-100 text-center mb-4">Admin Login</h2>
            <div className="form-control">
                <label htmlFor="email" className="label">
                    <span className="label-text text-gray-100">Email:</span>
                </label>
                <input 
                    type="email" 
                    id="email" 
                    placeholder="email" 
                    className="input h-[38px] input-bordered"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                    required 
                />
            </div>
            <div className="form-control">
                <label htmlFor="password" className="label">
                    <span className="label-text text-gray-100">Password:</span>
                </label>
                <input 
                    type="password" 
                    id="password" 
                    placeholder="password" 
                    className="input h-[38px] input-bordered" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                />
            </div>
            <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
            </div>
            <div className="text-red-500 text-sm mt-2 h-4">{error && error}</div>
        </form>
    )
}

        // OLD FORM
        // <form className="flex flex-col w-[330px] bg-black bg-opacity-30 text-gray-100 rounded-md mx-auto px-10 py-8" onSubmit={handleLogin}>
        //     <h2 className="text-xl text-center mt-2 mb-6">Admin Login</h2>
        //     <label>
        //         <span className="block mb-1 text-[0.9rem]">Email:</span>
        //         <input 
        //             type="email" 
        //             className="input text-gray-600 font-semibold input-bordered input-sm w-full max-w-xs mb-4"
        //             value={email}
        //             onChange={(e) => setEmail(e.target.value)}
        //             autoFocus
        //         />
        //     </label>
        //     <label>
        //         <span className="block mb-1 text-[0.9rem]">Password:</span>
        //         <input 
        //             type="password" 
        //             className="input text-gray-600 font-semibold input-bordered input-sm w-full max-w-xs mb-6"
        //             value={password}
        //             onChange={(e) => setPassword(e.target.value)} 
        //         />
        //     </label>
        //     <button className="btn btn-primary btn-md">Log In</button>
        //     <div className="text-red-500 text-sm mt-2 h-4">{error && error}</div>
        // </form>