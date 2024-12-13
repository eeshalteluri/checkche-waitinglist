import { z } from "zod";
import WaitingListValidationSchema from "@/lib/schemas/waitingListValidation";

export type WaitinglistType = z.infer<typeof WaitingListValidationSchema>