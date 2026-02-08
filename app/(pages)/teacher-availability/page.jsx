"use client"

import { useState, useEffect } from "react"
import { useAuthContext } from "@/context/AuthContext";
import { AvailabilityTable } from "./AvailabilityTable";


const TeacherAvailabilityPage = () => {

    const {authenticatedUser} = useAuthContext()
    const [selectedTeacher, setSelectedTeacher] = useState("choose teacher") 
    const [teachersList, setTeachersList] = useState([])
    const [availability, setAvailability] = useState([])


    
    const getTeacherAvailability = async (teacher) => {
        try {
            const res = await fetch("/api/get-availability", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({user: teacher, queryType: "getAvailability"})
            })
            const {teacherAvailability} = await res.json()
            setAvailability(teacherAvailability)
    
          } catch (error) {
              console.log("Error getting response")
          }
    }


    const getTeachersList = async () => {
        try {
            const res = await fetch("/api/get-availability", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({user: authenticatedUser.displayName, queryType: "getAllTeachers"})
            })
            const {usersArray} = await res.json()
            const teachers = usersArray.map(user => user.name)
            setTeachersList(teachers)    
          } catch (error) {
              console.log("Error getting response")
          }
    }

    useEffect(() => {
        getTeachersList()
    }, [])


  return (
    <div className="dcam-container text-center overflow-y-auto">
        <p className="mb-4">Select teacher to see their weekly availability:</p>
        <select 
            className="select w-full max-w-[280px] ps-2 h-9 mb-9 border-2 border-gray-200 rounded text-sm"
            value={selectedTeacher}
            onChange={(e) => {
              setSelectedTeacher(e.target.value)
              getTeacherAvailability(e.target.value)
            }}
        >
            <option value="choose teacher" disabled>Choose Teacher</option>
            {teachersList && teachersList.map(teacher => (
                <option key={teacher} value={teacher}>{teacher}</option>
            )) 
        }
        </select>
        <div className="overflow-x-auto">
          {availability.length > 0 && <AvailabilityTable availability={availability} />}
        </div>
    </div>
  )
}

export default TeacherAvailabilityPage