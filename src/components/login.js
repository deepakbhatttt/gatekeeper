import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { login as authLogin } from '../store/authSlice';
import { Button, Input } from "./master";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import '../css/login.css';

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <p>
          Don't have an account?&nbsp;
          <Link to="/signup">Sign Up</Link>
        </p>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit(login)}>
          <Input
            label=""
            placeholder="Enter your email"
            type="email"
            {...register("email", {
              required: true,
              validate: {
                matchPatern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              }
            })}
          />
          <Input
            label=""
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: true,
            })}
          />
          <Button
            type="submit"
            className="btn"
          >
            LOGIN
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;


/*
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"

import { login as authLogin } from '../store/authSlice'
import { Button, Input} from "./master"
import { useDispatch } from "react-redux"
import authService from "../appwrite/auth"

export const Login = ()=> {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");

    const login = async (data) => {
        setError("");
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(authLogin(userData));
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className="text-center rounded bg-white shadow overflow-y-hidden" style={{ position: 'absolute', top: '50%', left: '50%', width: '400px', transform: 'translate(-50%, -50%)' }}>
            <div className={`mx-auto w-100 bg-light rounded-xl p-4 border`}>
                <h2 className="bg-dark text-white py-3">Login</h2>
                <p className="mt-2 text-center text-base text-black-60">
                    Don&apos;t have any account?&nbsp;
                    <Link to="/signup" className="font-medium text-primary ">Sign Up</Link>
                </p>
                {error && <p className="text-danger mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input label="" placeholder="Enter your email" type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input label=""
                            type="password"
                            placeholder="Enter your password"
                            className="mt-2"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <Button
                            type="submit"
                            className="btn bg-dark text-white shadow-none text mt-4"
                        >LOGIN</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
*/