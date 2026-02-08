"use client"

import { NewSubscriberModal } from "@/app/components/NewSubscriberModal"
import { useState } from "react"



const NewsletterSubscriptionsPage = () => {

    const [newSubscriberModalOpen, setNewSubscriberModalOpen] = useState(false);
    const [subscribeSuccess, setSubscribeSuccess] = useState("")
    const [subscribeError, setSubscribeError] = useState("")


    const handleOpenModal = () => {
        setSubscribeSuccess("")
        setSubscribeError("")
        setNewSubscriberModalOpen(true)
    }

    const handleCloseNewSubscriberModal = (e) => {
        if(e.target.dataset.role === "modal") {
            setNewSubscriberModalOpen(false)
        }
    }


  return (
    <div className="dcam-container text-center overflow-y-auto">
        <p className="mb-12">Use this page to add students/families to our Mailchimp Newsletter:</p>
        <button className="btn mb-3 md:mb-0 bg-green-400 rounded text-gray-50 hover:bg-green-500 text-sm" onClick={() => handleOpenModal()}>Add Subscriber</button>
        {subscribeSuccess && <p className="mt-12 text-green-500">{subscribeSuccess}</p>}
        {subscribeError && <p className="mt-12 text-red-500">{subscribeError}</p>}
        

        {newSubscriberModalOpen && 
            <NewSubscriberModal handleCloseNewSubscriberModal={handleCloseNewSubscriberModal} setNewSubscriberModalOpen={setNewSubscriberModalOpen} setSubscribeSuccess={setSubscribeSuccess} setSubscribeError={setSubscribeError} />
        }
    </div>
  )
}

export default NewsletterSubscriptionsPage