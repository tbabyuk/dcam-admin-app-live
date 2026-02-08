import { NextResponse } from "next/server"
import { connectToMongoDB } from "@/database/mongo-config"
import { Rental } from "@/models/models"



export const POST = async (req) => {

    const secret = await req.json();

    console.log("Logging secret from API:", secret)

    try {
        await connectToMongoDB()

        const activeRentals = await Rental.find()

        return NextResponse.json({activeRentals})

    } catch (error) {
        
        return NextResponse.json({message: error.message})
    }

}