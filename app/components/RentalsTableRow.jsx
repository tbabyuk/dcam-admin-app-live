import { RiDeleteBin6Line } from "react-icons/ri";
import { adminDB } from "@/database/firebase-config";
import { collection, doc, deleteDoc } from "firebase/firestore";


const rentalsRef = collection(adminDB, "rentals");


export const RentalsTableRow = ({item, index}) => {

    const handleDateFormat = (date) => {
        const formattedDate = new Date(date).toLocaleString("en-US", {"month": "short", "day": "numeric", "year": "numeric"})
        return formattedDate
    }

    const handleDelete = async (id) => {
    console.log("logging item from handleDelete:", id)
        const docRef = doc(rentalsRef, id)
        try {
        await deleteDoc(docRef)
        console.log("document successfully deleted!")
        } catch(err) {
        console.log(err.message)
        }
    }


    return (
        <tr className=" text-[0.85rem]">
            <td>{index + 1}</td>
            <td>{item.student_name}</td>
            <td>{item.parent_name}</td>
            <td>{item.rental_item}</td>
            <td>{item.serial_num}</td>
            <td>{handleDateFormat(item.start_date)}</td>
            <td>{item.billing_date}</td>
            <td>${item.dcam_cost}</td>
            <td>${item.customer_cost}</td>
            <td className="hover:bg-red-200 cursor-pointer" onClick={() => handleDelete(item.id)}><RiDeleteBin6Line className="mx-auto" size="1rem"  /></td>
        </tr>
    )
}