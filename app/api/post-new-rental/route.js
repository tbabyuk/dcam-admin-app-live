import { NextResponse } from "next/server";
import { Rental } from "@/models/models";
import { connectToMongoDB } from "@/database/mongo-config";



export const POST = async (req) => {

    const data = await req.json()

    console.log("Logging form data from API:", data)

    try {
        await connectToMongoDB();

        await Rental.create(data);

        return NextResponse.json({message: "success"}, {status: 200})

    } catch (error) {
        return NextResponse.json({message: "Failed to post rental"}, {status: 500})
    }

}
