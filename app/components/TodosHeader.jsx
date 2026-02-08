"use client"

import { adminDB } from "@/database/firebase-config"
import { useState } from "react"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"


const todosRef = collection(adminDB, "todos")


export const TodosHeader = () => {


  const [taskText, setTaskText] = useState("")
  const [priority, setPriority] = useState("low")


  const handleSubmit = async (e) => {
    e.preventDefault()

    // console.log("taskText:", taskText, "priority:", priority)
    
    try {
        await addDoc(todosRef, {
            text: taskText, 
            priority: priority,
            column: "tasks",
            created_at: serverTimestamp()
        })
        setTaskText("")
    } catch(err) {
        console.log(err.message)
    }
  }

  
  return (
    <form className="grid grid-rows-3 md:grid-rows-none md:grid-cols-3" onSubmit={handleSubmit}>
        <input 
            className="ps-2 h-9 mb-3 md:mb-0 border-2 border-gray-200 rounded text-sm" 
            type="text" 
            placeholder="new todo item"
            value={taskText} 
            onChange={(e) => setTaskText(e.target.value)}
        />

        <div className="mb-3 md:mb-0 flex justify-evenly text-sm">
            <label className="flex items-center">
                <input 
                    className="mb-0 me-2" 
                    type="radio"
                    name="priority" 
                    value="low"
                    checked={priority === "low"}
                    onChange={() => setPriority("low")}
                />
                <span>Low</span>
            </label>
            <label className="flex items-center">
                <input 
                    className="mb-0 me-2" 
                    type="radio" 
                    name="priority" 
                    value="medium"
                    checked={priority === "medium"}
                    onChange={() => setPriority("medium")}
                />
                Medium
            </label>
            <label className="flex items-center">
                <input 
                    className="mb-0 me-2" 
                    type="radio" 
                    name="priority" 
                    value="high"
                    checked={priority === "high"}
                    onChange={() => setPriority("high")}
                />
                High
            </label>
        </div>
        <button className="mb-3 md:mb-0 bg-green-400 rounded text-gray-50 hover:bg-green-500 text-sm">Add Item</button>
    </form>
  )

}