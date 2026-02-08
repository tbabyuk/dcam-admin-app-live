"use client"

import { useEffect } from "react"
import { useAuthContext } from "@/context/AuthContext"
import { useRouter } from "next/navigation"


const Dashboard = () => {

  const {authenticatedUser} = useAuthContext()
  const router = useRouter()

  console.log("the authenticated user is:", authenticatedUser)
  
  const dateString = "2024-03-01T05:00:00.000Z"


  const date = new Date(dateString)

  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
  const formattedDate = date.toLocaleString('en-US', options);

  console.log(date, formattedDate)


  useEffect(() => {
    if(!authenticatedUser) {
      router.push("/")
    }
  }, [])


  return (
    <div className="dcam-container">
        <div className="mx-auto">
          <h2 className="text-2xl font-semibold text-center mb-12 text-gray-700">
            Our Mission Statement
          </h2>
          <h4 className="text-xl mb-3">
            1. To enrich the lives of our students through music
          </h4>
          <p className="mb-12 font-light">
            We strongly believe that playing a musical instrument makes life
            richer, more interesting and more colourful. We are proud to be able
            to impart this skill to our students.
          </p>
          <h4 className="text-xl mb-3">
            2. To provide quality music education tailored to our students&apos; goals,
            abilities, and interests
          </h4>
          <p className="mb-12 font-light">
            We listen to our students and parents carefully and do our best to
            tailor their lessons in a way that would best meet their individual
            goals, abilities, and interests.
          </p>
          <h4 className="text-xl mb-3">
            3. To create a fun, safe, friendly, and inclusive environment for both
            students and teachers
          </h4>
          <p className="font-light">
            We are convinced that people learn and work best in an environment
            that is fun, safe, friendly, and inclusive. Maintaining such an
            environment is one of our top priorities.
          </p>
        </div>
    </div>
  )
}

export default Dashboard