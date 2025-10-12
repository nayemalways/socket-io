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
        <div className="flex flex-col items-center mt-10">
            <h1 className="text-2xl mb-3">Signup</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })}/>
                <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })}/>
                <input placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })}/>
                <button type="submit" className="bg-blue-500 text-white px-3 py-1">Create</button>
            </form>
        </div>
    </>
  )
}
