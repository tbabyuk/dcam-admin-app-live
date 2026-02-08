import mongoose, {connect} from "mongoose";


let mongoDBConnected = false;



export const connectToMongoDB = async () => {
    mongoose.set("strictQuery", true);

    if(mongoDBConnected) {
        console.log("MongoDB is already connected")
        return
    }

    try {
        await connect(process.env.MONGODB_URI);
        mongoDBConnected = true;
        console.log("Connection established to dcam_admin collection")
    } catch (error) {
        console.log("Problem connecting to mongoDB:", error.message)
    }
}