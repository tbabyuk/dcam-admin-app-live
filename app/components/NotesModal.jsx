"use client"

import { MdClose } from "react-icons/md";
import { useState, useEffect } from "react";



export const NotesModal = ({handleCloseNotesModal, currentTeacher, currentWeek}) => {

  console.log("logging current teacher from AttendanceModal:", currentTeacher)

  const [teacherNotes, setTeacherNotes] = useState("")



  useEffect(() => {

    const getTeacherNotes = async () => {

        try {
            const res = await fetch("/api/get-teacher-notes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({currentTeacher, currentWeek})
            })
    
            const {teacherNotes} = await res.json()

            if(currentWeek === "week1Notes") {
                setTeacherNotes(teacherNotes[0].week1Notes)
            } else {
                setTeacherNotes(teacherNotes[0].week2Notes)
            }
    
        } catch (error) {
            console.log("Something went wrong while fetching teacher attendance:", error.message)
        }
    }

    getTeacherNotes()


  }, [])

  return (
        <div className="fixed z-50 top-0 left-0 w-full h-[100vh] bg-black bg-opacity-80 overflow-y-auto" onClick={(e) => handleCloseNotesModal(e)}>
            <MdClose size="4rem" color="white" className="absolute cursor-pointer top-3 right-3" />
            {teacherNotes && (
                <div className="my-28 p-10 mx-auto bg-gray-200 w-[600px]">{teacherNotes ? teacherNotes : "no notes"}</div>
            )}
        </div>
    )
}