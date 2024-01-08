"use client"
import LogOutBtn from "@/components/LogOutBtn";
import { useSession } from "next-auth/react";

export default function Home() {

  const {data:session}=useSession()

  return (
   <main className=" flex justify-center items-center min-h-screen">
   <div className="border p-3 rounded-md w-fit flex flex-col gap-3">
    <p className="font-bold text-xl">{session?.user?.name}</p>
    <p className="font-bold text-xl">{session?.user?.email}</p>
    <LogOutBtn/>
   </div>
   </main>
  )
}
