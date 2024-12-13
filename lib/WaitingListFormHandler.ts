import { SubmitHandler } from "react-hook-form";
import { WaitinglistType } from "@/types/WaitingList";
import toast from "react-hot-toast";

type ApiResponse = {
    message: string;
    status: string; // e.g., 'success' or 'error'
    data?: {
      userId: string;
      email: string;
    }
  }
  
export const waitingListFormHandler: SubmitHandler<WaitinglistType> = async(data) => {
    toast.promise(
      // Ensure fetch returns a Promise that resolves with parsed JSON data
      fetch('/api/submit', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      }).then( async (response) => {
          if (!response.ok) {
            const errorData = await response.json()
              throw new Error(errorData.message || 'Failed to add to waiting list');
            }
            return response.json() // Parse response as JSON
          }),
      {
        loading: "Adding to waiting list",
        success: (result: ApiResponse) => result.message,
        error: (err: Error) => err.message || "Something went wrong, try again later!",
      })
  }