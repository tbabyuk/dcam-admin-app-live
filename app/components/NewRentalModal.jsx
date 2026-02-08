"use client"

import { useState } from "react";
import { FaChild } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";
import { FaTag } from "react-icons/fa";
import { CgHashtag } from "react-icons/cg";
import { IoCalendarNumber } from "react-icons/io5";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { FaDollarSign } from "react-icons/fa6";
import { adminDB } from "@/database/firebase-config";
import { collection } from "firebase/firestore"
import { addDoc, serverTimestamp } from "firebase/firestore";



const rentalsRef = collection(adminDB, "rentals");


export const NewRentalModal = ({handleCloseNewRentalModal, setNewRentalModalOpen}) => {

  const [newRentalObject, setNewRentalObject] = useState({
    student_name: "",
    parent_name: "",
    rental_item: "",
    serial_num: "",
    start_date: "",
    dcam_cost: "",
    customer_cost: "",
    billing_date: ""
  })


  console.log("Logging newRentalObject:", newRentalObject)


  const handleChange = (e) => {
    console.log("handleChange fired", e)
    setNewRentalObject(prev => ({
        ...prev,
        [e.target.name]: e.target.value
    }))
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

        console.log("logging newRentalObject", newRentalObject)
        
        try {
            await addDoc(rentalsRef, {...newRentalObject, created_at: serverTimestamp()})
            console.log("Document added successfully")
            setNewRentalModalOpen(false)
        } catch(err) {
            console.log("An error occurred:", err.message)
        }
  }


  return (
        <div className="overlay fixed z-50 top-0 left-0 w-full h-[100vh] bg-black bg-opacity-80 overflow-y-auto" onClick={(e) => handleCloseNewRentalModal(e)}>
            <span className="exit absolute cursor-pointer top-1 right-5 text-gray-100 font-semibold text-[2.5rem]">&#10005;</span>
            <form className="form-control w-[380px] max-w-[90%] mt-[70px] bg-gray-100 py-5 px-6 md:px-10 rounded-md mx-auto" onSubmit={handleSubmit}>
                <h2 className="text-lg font-semibold text-gray-600 text-center pb-6">New Rental Form</h2>
                <label className="input input-sm input-bordered flex items-center gap-4 mb-4">
                    <FaChild className="text-gray-500" size="1rem" />
                    <input 
                        type="text"
                        className="grow"
                        placeholder="student name"
                        name="student_name"
                        value={newRentalObject.student_name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label className="input input-sm input-bordered flex items-center gap-4 mb-4">
                    <FaPerson className="text-gray-500" size="1.2rem" />
                    <input 
                        type="text" 
                        className="grow" 
                        placeholder="parent name" 
                        name="parent_name"
                        value={newRentalObject.parent_name}
                        onChange={handleChange}
                        required 
                    />
                </label>
                <label className="input input-sm input-bordered flex items-center gap-4 mb-4">
                    <FaTag className="text-gray-500" size="0.8rem" />
                    <input 
                        type="text" 
                        className="grow" 
                        placeholder="rental item"
                        name="rental_item"
                        value={newRentalObject.rental_item}
                        onChange={handleChange}
                        required 
                    />
                </label>
                <label className="input input-sm input-bordered flex items-center gap-4 mb-4">
                    <CgHashtag className="text-gray-500" size="1rem" />
                    <input 
                        type="text" 
                        className="grow" 
                        placeholder="serial number"
                        name="serial_num"
                        value={newRentalObject.serial_num}
                        onChange={handleChange}
                        required 
                    />
                </label>                
                <label className="input input-sm input-bordered flex items-center gap-4 mb-4">
                    <IoCalendarNumber className="text-gray-500" />
                    <input 
                        type="date" 
                        className="grow" 
                        name="start_date"
                        value={newRentalObject.start_date}
                        onChange={handleChange}
                        required />
                </label>
                <label className="input input-sm input-bordered flex items-center gap-4 mb-4">
                    <IoCalendarNumberOutline className="text-gray-500" />
                    <input 
                        type="text" 
                        className="grow" 
                        placeholder="billing date" 
                        name="billing_date"
                        value={newRentalObject.billing_date}
                        onChange={handleChange}
                        required />
                </label>         
                <label className="input input-sm input-bordered flex items-center gap-4 mb-4">
                    <FaDollarSign className="text-gray-500" />
                    <input 
                        type="text" 
                        className="grow"
                        placeholder="our cost"
                        name="dcam_cost"
                        value={newRentalObject.dcam_cost}
                        onChange={handleChange}
                        required />
                </label>                
                <label className="input input-sm input-bordered flex items-center gap-4 mb-4">
                    <FaDollarSign className="text-gray-500" />
                    <input 
                        type="text" 
                        className="grow"
                        placeholder="customer cost"
                        name="customer_cost"
                        value={newRentalObject.customer_cost}
                        onChange={handleChange}
                        required />
                </label>                               
                <button className="btn btn-md btn-primary mt-4">Submit</button>
            </form>
        </div>
    )
}