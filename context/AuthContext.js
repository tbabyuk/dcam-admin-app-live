"use client"

import { createContext, useContext, useState, useEffect } from "react";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from "firebase/auth";
import { adminAuth } from "@/database/firebase-config";
import { useRouter } from "next/navigation";


export const AuthContext = createContext()


export const AuthContextProvider = ({children}) => {

    const [authenticatedUser, setAuthenticatedUser] = useState(null)
    const [error, setError] = useState(null)
    const router = useRouter()
    const [authIsReady, setAuthIsReady] = useState(false)


    const logIn = async (email, password) => {
        try {
            setError(null)
            await signInWithEmailAndPassword(adminAuth, email, password)
            router.push("/dashboard")
        } catch (error) {
            setError(error.message)
            console.log("error while signing in:", error.message)
        }
    }


    const logOut = async () => {
        try {
            await signOut(adminAuth)
            router.push("/")
        } catch (error) {
            console.log("Something went wrong while signing out:", error.message)
        }
    }


    useEffect(() => {
        const unsub = onAuthStateChanged(adminAuth, (user) => {
            console.log("useEffect ran")

            setAuthenticatedUser(user)
            setAuthIsReady(true)

            // updateProfile(adminAuth.currentUser, {
            //     displayName: "Heather"
            // })
            console.log("loggin user from onAuthStateChanged:", user)
        })
        return () => {
            unsub()
          }
    }, [])



    return (
        <AuthContext.Provider value={{authenticatedUser, logIn, logOut, error, authIsReady}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)