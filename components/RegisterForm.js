"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async(e) =>{
    e.preventDefault();

    if(!name || !email ||!password){
      setError("Fill the required field!")
      return;
    }

    try {
     const resUserExist = await fetch("/api/userExist",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({email})
     })

     const {user} = await resUserExist.json();

     if(user){
     setError("This user already register.")
     return;
     }
    
    const res = await fetch('/api/register',{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({name,email,password})
      })
      if(res.ok){
        router.push('/login')
       }else{
        setError("User registration failed!")
      }
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className="text-center border p-3 w-[48rem] flex flex-col gap-4 shadow-md">
      <h1 className="text-3xl font-extrabold text-gray-800 py-3">Register</h1>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          className="p-3 border rounded-md shadow-sm outline-emerald-400"
          type="text"
          name="name"
          id="name"
          placeholder="Enter full name"
          onChange={(e)=>setName(e.target.value)}
        />
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
          className="bg-green-600 font-semibold text-white py-2 text-lg rounded-md hover:opacity-90">
          Register
        </button>
      </form>

      {error && <p className="text-red-400 font-semibold">{error}</p>}

      <p className="py-3">
        Already have an account ?{" "}
        <span className="font-bold hover:underline">
          <Link href={"/login"}>Log in</Link>
        </span>
      </p>
    </div>
  );
};

export default RegisterForm;
