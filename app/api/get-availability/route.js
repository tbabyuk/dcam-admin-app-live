import { NextResponse } from "next/server";
import { User } from "@/models/models";
import { connectToMongoDB } from "@/database/mongo-config";



export const POST = async (req) => {

    const {user, queryType} = await req.json()

    console.log("Logging user from API:", user)


    if(queryType === "getAllTeachers") {
        try {
            await connectToMongoDB()

            if (user === "Demo") {
                console.log("If block fired++++++++++++++++++++=")
                const usersArray = await User.find({$or: [{name: "Demo1"}, {name: "Demo2"}, {name: "Demo3"}]}).limit(3)
                return NextResponse.json({usersArray}, {status: 200})
            }

            const usersArray = await User.find({ name: { $nin: ["Demo1", "Demo2", "Demo3", "Demo4", "Demo5"] } });

            return NextResponse.json({success: true, usersArray}, {status: 200})

        } catch (error) {
            return NextResponse.json({success: false, error: error.message}, {status: 500})
        }
    }


    if(queryType === "getAvailability") {
        try {
            await connectToMongoDB()

            const {availability} = await User.findOne({ name: user }, { availability: 1});

            console.log("Loggin teacherAvailability from API route+++++++++++", availability, typeof availability)
            return NextResponse.json({success: true, teacherAvailability: availability}, {status: 200})

        } catch (error) {
            return NextResponse.json({success: false, error: error.message}, {status: 500})
        }
    }


}