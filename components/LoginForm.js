"use client"
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
const LoginForm = () => {

  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [error,setError]=useState("")

  const router = useRouter()

  const handleSubmit = async(e) =>{
    e.preventDefault();

    if(!email || !password){
      setError("Fill the required field!")
      return;
    }
    console.log({email,password})

    try {
      const res = await signIn("credentials",{
        email,
        password,
        redirect:false
      })
      if(!res.ok){
        setError("Invalid credentials.")
        return;
      }

     router.push('/')
    } catch (error) {
      console.log(error)
    }
  } 


  return (
    <div className="text-center border-t-4 rounded-md border-green-500 p-3 w-[48rem] flex flex-col gap-4 shadow-md max-lg:m-3">
      <h1 className="text-3xl font-extrabold text-gray-800 py-3">Log in</h1>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          className="p-3 border rounded-md shadow-sm outline-emerald-400"
          type="email"
          name="email"
          id="email"
          placeholder="Enter email"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          className="p-3 border rounded-md shadow-sm outline-emerald-400"
          type="password"
          name="password"
          id="password"
          placeholder="Enter password"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="bg-green-500 font-semibold text-white py-2 text-lg rounded-md hover:opacity-90">
          Log in
        </button>
      </form>
      <hr />
      <button
          onClick={()=>signIn('google',{callbackUrl:"http://localhost:3000"})}
          type="button"
          className="font-semibold border shadow-sm py-2 text-lg rounded-md hover:opacity-90">
         <span className="flex items-center justify-center gap-3">
         <FcGoogle size={24}/>
          Google
         </span>
        </button>

        <button
          onClick={()=>signIn('github',{callbackUrl:"http://localhost:3000"})}
          type="button"
          className="font-semibold border shadow-sm py-2 text-lg rounded-md hover:opacity-90">
         <span className="flex items-center justify-center gap-3">
          <FaGithub size={24}/>
           Github
         </span>
        </button>
      
      {error && <p className="text-red-400 font-semibold">{error}</p>}
      <p className="py-3">Don't have an account ? <span className="font-bold hover:underline"><Link href={"/register"}>Register</Link></span></p>
    </div>
  );
};

export default LoginForm;
