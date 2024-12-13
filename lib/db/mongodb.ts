import mongoose from "mongoose";


const connectionToDatabase = async () => {

    try{
        if(mongoose.connections[0].readyState){
            console.log("Already connection is established")
            return
        }
        else{
            mongoose.connect(process.env.MONGODB_URI!)
            console.log("Connecting to database")
        }
    }catch(error){
        console.error("Failed to connect to MongoDB", error)
    }
}

export default connectionToDatabase