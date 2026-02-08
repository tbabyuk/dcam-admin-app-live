"use client"

import { PayTableRow } from "@/app/components/PayTableRow"
import { useState, useEffect, useCallback } from "react"
import { useAuthContext } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { AttendanceModal } from "@/app/components/AttendanceModal"
import { NotesModal } from "@/app/components/NotesModal"




const TeacherPayPage = () => {

  const router = useRouter()
  const {authenticatedUser} = useAuthContext()
  const [attendanceMeta, setAttendanceMeta] = useState([])
  const [paydays, setPaydays] = useState([])
  const [selectedPayday, setSelectedPayday] = useState(null)
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

  
  const fetchAttendance = useCallback(async (payday = null) => {
    if (!authenticatedUser) return
    try {
      const res = await fetch("/api/get-attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: authenticatedUser.displayName,
          ...(payday && { payday })
        })
      })
      const { metaArray, paydays: paydayList, currentPayday } = await res.json()
      setAttendanceMeta(metaArray ?? [])
      setPaydays(paydayList ?? [])
      setSelectedPayday(prev => prev ?? currentPayday ?? null)
    } catch (error) {
      console.log("Error getting response")
    }
  }, [authenticatedUser])

  useEffect(() => {
    if (authenticatedUser) fetchAttendance()
  }, [authenticatedUser, fetchAttendance])

  
  const formatPaydayOption = (dateStr) => {
    if (!dateStr) return ""
    const d = new Date(dateStr)
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  return (
    <div className="dcam-container">
        <div className="w-full max-w-7xl mx-auto overflow-x-auto">
          {paydays.length > 1 && (
            <div className="mb-4 flex items-center gap-2">
              <label htmlFor="payday-select" className="text-sm font-medium">Pay period:</label>
              <select
                id="payday-select"
                value={selectedPayday ?? ""}
                onChange={(e) => {
                const val = e.target.value || null
                setSelectedPayday(val)
                fetchAttendance(val)
              }}
                className="select select-bordered select-sm max-w-xs"
              >
                {paydays.map((p) => (
                  <option key={p} value={p}>{formatPaydayOption(p)}</option>
                ))}
              </select>
            </div>
          )}
          <table className="table table-zebra">
            <thead>
              <tr className="bg-secondary text-gray-100">
                <td className="py-[10px] px-2 sm:px-3 lg:px-6 font-semibold text-center">Teacher</td>
                <td className="py-[10px] px-2 sm:px-3 lg:px-6 font-semibold text-center">Status</td>
                <td className="py-[10px] px-2 sm:px-3 lg:px-6 font-semibold text-center">Payday</td>
                {authenticatedUser?.displayName !== "Heather" && <td className="py-[10px] px-2 sm:px-3 lg:px-6 font-semibold text-center">Wk 1</td>}
                {authenticatedUser?.displayName !== "Heather" && <td className="py-[10px] px-2 sm:px-3 lg:px-6 font-semibold text-center">Wk 2</td>}
                {authenticatedUser?.displayName !== "Heather" && <td className="py-[10px] px-2 sm:px-3 lg:px-6 font-semibold text-center">Total</td>}
                {authenticatedUser?.displayName !== "Heather" && <td className="py-[10px] px-2 sm:px-3 lg:px-6 font-semibold text-center">Attendance</td>}
                {authenticatedUser?.displayName !== "Heather" && <td className="py-[10px] px-2 sm:px-3 lg:px-6 font-semibold text-center">Notes 1</td>}
                {authenticatedUser?.displayName !== "Heather" && <td className="py-[10px] px-2 sm:px-3 lg:px-6 font-semibold text-center">Notes 2</td>}
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