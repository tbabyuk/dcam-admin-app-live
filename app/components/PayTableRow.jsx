"use client"

import { MdRadioButtonUnchecked } from "react-icons/md";
import { MdRadioButtonChecked } from "react-icons/md";
import { useAuthContext } from "@/context/AuthContext";


export const PayTableRow = ({metaDoc, handleAttendanceModal, handleNotesModal}) => {
  
  const {teacher, week2Submitted, payday, totalPay} = metaDoc;
  const {authenticatedUser} = useAuthContext()


  const formatDate = () => {
    const date = new Date(payday)
    const options = { month: "short", day: "numeric", year: "numeric" };
    const formattedDate = date.toLocaleString("en-US", options);
    return formattedDate
  }
  
  

  return (
    <tr className="even:bg-gray-300">
        <td className="py-[10px] px-3 sm:px-6">{teacher[0].toUpperCase() + teacher.slice("1")}</td>

        <td className="py-[10px] px-3 sm:px-6">{!week2Submitted ? <MdRadioButtonUnchecked size="1.2rem" className="mx-auto" /> : <MdRadioButtonChecked size="1.2rem" color="green" className="mx-auto" />}</td>

        <td className="py-[10px] px-3 sm:px-6 text-nowrap">{formatDate()}</td>
        
        {authenticatedUser?.displayName !== "Heather" && <td className="py-[10px] px-3 sm:px-6">{!week2Submitted ? "n/a" : totalPay && "$" + totalPay.toFixed(2)}</td>}

        {authenticatedUser?.displayName !== "Heather" && <td className="px-3 sm:px-6 text-nowrap text-center">
            <button className="table-btn" disabled={!week2Submitted} onClick={() => handleAttendanceModal(teacher)}>view</button>
        </td>}

        {authenticatedUser?.displayName !== "Heather" && <td className="px-3 sm:px-6 text-nowrap text-center">
            <button className="table-btn" disabled={!week2Submitted} onClick={() => handleNotesModal(teacher, "week1Notes")}>view</button>
        </td>}

        {authenticatedUser?.displayName !== "Heather" && <td className="px-3 sm:px-6 text-nowrap text-center">
            <button className="table-btn" disabled={!week2Submitted} onClick={() => handleNotesModal(teacher, "week2Notes")}>view</button>
        </td>}
    </tr>
  )
}