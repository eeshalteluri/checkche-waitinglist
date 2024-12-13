import connectionToDatabase from "@/lib/db/mongodb"
import { Users } from "@/lib/db/schemas/waitingListSchema"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
        try{
            console.log(req)

            const body = await req.json()
            const { name, email } = body

            await connectionToDatabase()

            const isAlreadyOnWaitingList = await Users.findOne({email})

            if( isAlreadyOnWaitingList ){
                return NextResponse.json(
                    { success: false, message: "You are already on waiting list :) " },
                    { status: 400 }
                  )
            }
            
            const newUser = new Users({
                name: name,
                email: email
            })

            await newUser.save()

            return NextResponse.json(
                { success: true, data: newUser, message: "Successfully added" },
                { status: 200 }
              )
        }catch(error){
            console.error('Error saving data:', error);
            return NextResponse.json(
                { success: false, data:null, message: "Unable to add, try later!" },
                { status: 500 }
              ) 

    }
}