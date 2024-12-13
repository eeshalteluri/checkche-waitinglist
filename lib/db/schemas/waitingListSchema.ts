import mongoose, { Schema } from "mongoose"

const WaitingListSchema: Schema = new mongoose.Schema({
    name: {type: String, require: true },
    email: {type: String, require: true, unique: true },
    createdAt: { type: Date, default: Date.now}
})

export const Users = mongoose.models.user || mongoose.model('user', WaitingListSchema)