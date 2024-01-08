"use client"
import LogOutBtn from "@/components/LogOutBtn";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {

  const {data:session}=useSession()

  console.log(session)

  return (
   <main className=" flex justify-center items-center min-h-screen">
   <div className="border p-3 rounded-md w-fit flex flex-col gap-3">
    <Image src={session?.user?.image} alt="profile" width={200} height={200}/>
    <p className="font-bold text-xl">{session?.user?.name}</p>
    <p className="font-bold text-xl">{session?.user?.email}</p>
    <LogOutBtn/>
   </div>
   </main>
  )
}
