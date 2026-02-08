"use client"

import { useAuthContext } from "@/context/AuthContext"
import { RxHamburgerMenu } from "react-icons/rx"



export const Navbar = ({setSidebarOpen}) => {

  const {logOut, authenticatedUser} = useAuthContext()

  
  return (
    <div className="h-[50px] bg-primary text-gray-100 px-3 md:px-5 flex justify-between items-center">
        <RxHamburgerMenu size="2rem" className="md:hidden cursor-pointer" onClick={() => setSidebarOpen(true)} />
        <div className="flex ms-auto gap-4 sm:gap-6">
          {authenticatedUser && (<span className="flex items-center text-nowrap">Hello, {authenticatedUser?.displayName}</span>)}
          <img src={authenticatedUser?.displayName === "Heather" ? "/heather_profile.png" : authenticatedUser?.displayName === "Terry" ? "/terry_profile.jpg" : "/avatar1.jpg"} className="h-[34px] rounded-full" />
          {authenticatedUser && (<button className="btn btn-accent btn-outline btn-sm flex items-center text-nowrap" onClick={() => logOut()}>Log Out</button>)}
        </div>
    </div>
  )
}