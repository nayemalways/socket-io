import React, { useState } from 'react'
 import { useNavigate } from 'react-router-dom';
import API from '../utils/api';

export const Signup = () => {
const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/signup", form);
    navigate("/login");
  };
  return (
    <>
        <div className='h-screen w-full flex justify-center items-center'>
          <div className="flex flex-col max-w-[600px] p-10 items-center mt-10 border-2 border-green-400">
            <h1 className="text-2xl mb-3 underline">Signup</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-[500px]">
                <input className="border border-blue-500 py-2 px-3" placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })}/>
                <input className='border border-blue-500 py-2 px-3' placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })}/>
                <input className='border border-blue-500 py-2 px-3' placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })}/>
                <button type="submit" className="bg-green-500 text-white px-3 py-1 cursor-pointer">Create</button>
            </form>
        </div>
        </div>
    </>
  )
}
