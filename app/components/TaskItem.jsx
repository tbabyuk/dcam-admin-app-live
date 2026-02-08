"use client"

import {BiEdit} from "react-icons/bi"
import {RiDeleteBin6Line} from "react-icons/ri"
import {LuArrowLeftSquare, LuArrowRightSquare} from "react-icons/lu"
import { adminDB } from "@/database/firebase-config"
import { deleteDoc, doc, setDoc } from "firebase/firestore"
import { EditTaskModal } from "./EditTaskModal"
import { useState } from "react"



export const TaskItem = ({column, priority, text, id}) => {

  const [showEditTaskModal, setShowEditTaskModal] = useState(false)


  const handleCloseEditModal = (e) => {
    console.log("logging target:", e.target.nodeName)

    if(e.target.classList.contains("modal-overlay") || e.target.nodeName === "svg" || e.target.nodeName === "path") {
      setShowEditTaskModal(false)
    }
  }

  const decidePriority = (priority) => {
    switch (priority) {
        case "low":
            return "bg-gray-200"
        case "medium":
            return "bg-orange-200"
        case "high":
            return "bg-red-200"
        default:
            return "bg-gray-200"
    }
  }

  // move todo item back in columns
  const handleMoveBack = async (id, column) => {
    const docRef = doc(adminDB, "todos", id)
    const newColumn = column === "progress" ? "tasks" : "progress"
    try {
      await setDoc(docRef, {column: newColumn}, {merge: true})
    } catch(err) {
      console.log(err.message)
    }
  }

  // edit todo item
  const handleSaveEdit = async (e, newText) => {
    e.preventDefault()
    const docRef = doc(adminDB, "todos", id)
    try {
      await setDoc(docRef, {text: newText}, {merge: true})
      setShowEditTaskModal(false)
    } catch(err) {
      console.log(err.message)
    }
  }

  // delete todo item
  const handleDelete = async (id) => {
    const docRef = doc(adminDB, "todos", id)
    try {
      await deleteDoc(docRef)
    } catch(err) {
      console.log(err.message)
    }
  }

  // move todo item forward in columns
  const handleMoveForward = async (id, column) => {
    const docRef = doc(adminDB, "todos", id)
    const newColumn = column === "tasks" ? "progress" : "completed"
    try {
      await setDoc(docRef, {column: newColumn}, {merge: true})
    } catch(err) {
      console.log(err.message)
    }
  }


  return (
    <div className={`grid border-2 border-white ${decidePriority(priority)} rounded mb-2 ps-2.5 pe-2`} style={{gridTemplateColumns: "77% 23%"}}>
        <div className={`break-words ${column === "completed" && "line-through"} py-1.5 text-sm`}>{text && text}</div>
        <div className="flex justify-evenly items-center">
            {column === "progress" || column === "completed" ? <LuArrowLeftSquare size="1.1rem" className="cursor-pointer text-gray-500 hover:rotate-12" onClick={() => handleMoveBack(id, column)} /> : ""}
            <BiEdit size="1.1rem" className="cursor-pointer text-gray-500 hover:rotate-12" onClick={() => setShowEditTaskModal(true)} />
            <RiDeleteBin6Line size="1.1rem" className="cursor-pointer text-gray-500 hover:rotate-12" onClick={() => handleDelete(id)} />
            {column === "tasks" || column === "progress" ? <LuArrowRightSquare size="1.1rem" className="cursor-pointer text-gray-500 hover:rotate-12" onClick={() => handleMoveForward(id, column)} /> : ""}
        </div>
        {showEditTaskModal && <EditTaskModal handleCloseEditModal={handleCloseEditModal} text={text} id={id} handleSaveEdit={handleSaveEdit} />}
    </div>
  )
}