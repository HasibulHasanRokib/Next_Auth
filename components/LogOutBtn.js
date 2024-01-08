"use client";
import { signOut } from "next-auth/react";
const LogOutBtn = () => {
  return (
    <button onClick={()=>signOut()} type="button" className="bg-red-500 p-2 rounded-md text-white font-semibold">
    Log Out
  </button>
  )
}

export default LogOutBtn
