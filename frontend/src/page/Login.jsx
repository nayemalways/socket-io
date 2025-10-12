import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';

export const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await API.post("/login", form);

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        navigate("/chat");
    };
  return (
    <>
         <div className="flex flex-col items-center mt-10">
            <h1 className="text-2xl mb-3">Login</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })}/>
                <input placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })}/>
                <button type="submit" className="bg-green-500 text-white px-3 py-1">Login</button>
            </form>
            </div>
    </>
  )
}
