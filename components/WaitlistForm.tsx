"use client"
import {
    Form,
    FormField,
  } from "@/components/ui/form"
  import { Input } from "@/components/ui/input";
  import { Button } from "@/components/ui/button";

  import { IoMdCheckboxOutline } from "react-icons/io";
  
  import { useForm, SubmitHandler } from "react-hook-form"
  import { zodResolver } from "@hookform/resolvers/zod";
  import WaitingListValidationSchema from "@/lib/schemas/waitingListValidation";
  import { WaitinglistType } from "@/types/WaitingList";

  import toast from "react-hot-toast";

  //when the "fetch" returns a promise, why should I add ".then" method to it to use it in toast.promise() method?
    /* because the fetch function itself does not directly throw an error for HTTP responses with error statuses (like 4xx or 5xx).
      Instead, it always resolves its promise with a Response object, even if the response status indicates a failure.
      This behavior requires you to manually check the response.ok property and throw an error if necessary. 
      That’s why you need to add the .then() method */

  type ApiResponse = {
    message: string;
    status: string; // e.g., 'success' or 'error'
    data?: {
      userId: string;
      email: string;
    }
  }
      

const WaitlistForm = () => {

    const form = useForm<WaitinglistType>({ resolver: zodResolver( WaitingListValidationSchema ) })
    
    const waitingListFormHandler: SubmitHandler<WaitinglistType> = async(data) => {
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

    return (
      <div className="max-w-[1400px] h-screen m-auto flex flex-col justify-center items-center gap-6">
        <div className="text-center flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold break-words">No more <span className="bg-red-300 py-1 px-2 rounded line-through block sm:inline">Cheating</span> on your <span className="bg-green-300 py-1 px-2 rounded block sm:inline"><IoMdCheckboxOutline className="inline"/> Checklist</span></h1>
          <p className="mt-8 mx-4 w-fit font-normal">Complete your tasks, and stay productive.</p>
          <p className="mx-4 w-fit">Stay on track with <span className="underline">accountability</span><span className="block sm:inline"></span>(leave that to us).</p>
        </div>
    
        <div className="text-center">
          <p className="mx-4 w-fit">Join the waiting list below, and be the first one to get notified.</p>
        </div>
    
        <div className="w-[80%] sm:max-w-[400px] flex flex-col justify-center gap-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(waitingListFormHandler)} className="flex flex-col gap-2">
              <FormField
                name="name"
                render={() => (
                  <>
                  <Input {
                    ...form.register("name")} 
                    type="text" 
                    placeholder="Your Name" 
                    className={`${form.formState.errors.name ? "border-red-400":""}`}/>
                  </>
                )}
              />
              <FormField
                name="email"
                render={() => (
                  <>
                  <Input {
                    ...form.register("email")} 
                    type="email" 
                    placeholder="email@example.com"
                    className={`${form.formState.errors.email ? "border-red-400":""}`}
                    />
                  </>
                )}
              />
              <Button className="mt-2 w-full" type="submit">Join the Waitlist</Button>
            </form>
          </Form>
        </div>
      </div>
    );
   
}

export default WaitlistForm