import { z } from "zod";

const WaitingListValidationSchema = z.object({
    name: z.string().min(1, {message: "Invalid name field"}),
    email: z.string().email({message: "Invalid email address"})
})

export default WaitingListValidationSchema