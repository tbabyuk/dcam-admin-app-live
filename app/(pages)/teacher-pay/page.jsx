"use client"

import { PayTableRow } from "@/app/components/PayTableRow"
import { useState, useEffect } from "react"
import { useAuthContext } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { AttendanceModal } from "@/app/components/AttendanceModal"
import { NotesModal } from "@/app/components/NotesModal"




const TeacherPayPage = () => {

  const router = useRouter()
  const {authenticatedUser} = useAuthContext()
  const [attendanceMeta, setAttendanceMeta] = useState([])
  const [attendanceModalOpen, setAttendanceModalOpen] = useState(false)
  const [notesModalOpen, setNotesModalOpen] = useState(false)
  const [currentTeacher, setCurrentTeacher] = useState("")
  const [currentWeek, setCurrentWeek] = useState("")



  const handleCloseAttendanceModal = (e) => {
    if(e.target.tagName === "DIV" || e.target.tagName === "path") {
      setAttendanceModalOpen(false)
    }
  }

  const handleCloseNotesModal = (e) => {
    if(e.target.tagName === "DIV" || e.target.tagName === "path") {
      setNotesModalOpen(false)
    }  
  }

  const handleAttendanceModal = (teacher) => {
    setCurrentTeacher(teacher)
    setAttendanceModalOpen(true)
  }

  const handleNotesModal = (teacher, week) => {
    console.log("handleNotesModal fired:", teacher, week)
    setCurrentTeacher(teacher)
    setCurrentWeek(week)
    setNotesModalOpen(true)
  }


  useEffect(() => {
    if(!authenticatedUser) {
      router.push("/")
    }
  }, [])

  
  useEffect(() => {

    const getAttendanceStatus = async () => {

      console.log("getAttendanceStatus from useEffect fired!!!!!!!!!!!!!!!!!!!!!!!!!!")

      try {

        const res = await fetch("/api/get-attendance", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({user: authenticatedUser.displayName})
        })

        const {metaArray} = await res.json()

        setAttendanceMeta(metaArray)

      } catch (error) {
          console.log("Error getting response")
      }
    }
  
    getAttendanceStatus()
  
  }, [])

  
  return (
    <div className="dcam-container">
        <div className="max-w-fit mx-auto overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr className="bg-secondary text-gray-100">
                <td className="py-[10px] px-3 sm:px-6 font-semibold text-center">Teacher</td>
                <td className="py-[10px] px-3 sm:px-6 font-semibold text-center">Status</td>
                <td className="py-[10px] px-3 sm:px-6 font-semibold text-center">Payday</td>
                {authenticatedUser?.displayName !== "Heather" && <td className="py-[10px] px-3 sm:px-6 font-semibold text-center">Pay</td>}
                {authenticatedUser?.displayName !== "Heather" && <td className="py-[10px] px-3 sm:px-6 font-semibold text-center">Attendance</td>}
                {authenticatedUser?.displayName !== "Heather" && <td className="py-[10px] px-3 sm:px-6 font-semibold text-center">Week 1 Notes</td>}
                {authenticatedUser?.displayName !== "Heather" && <td className="py-[10px] px-3 sm:px-6 font-semibold text-center">Week 2 Notes</td>}
              </tr>
            </thead>
            <tbody>
              {attendanceMeta?.map((metaDoc, index) => (
                <PayTableRow key={index} metaDoc={metaDoc} handleAttendanceModal={handleAttendanceModal} handleNotesModal={handleNotesModal} />
              ))}
            </tbody>
          </table>
          {attendanceModalOpen && 
              <AttendanceModal handleCloseAttendanceModal={handleCloseAttendanceModal} currentTeacher={currentTeacher} />
          }
          {notesModalOpen && 
              <NotesModal handleCloseNotesModal={handleCloseNotesModal} currentTeacher={currentTeacher} currentWeek={currentWeek} />
          }
        </div>
    </div>
  )
}

export default TeacherPayPage