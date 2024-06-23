import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import authService from '../appwrite/auth';
import { login } from '../store/authSlice';
import { Button, Input } from './master.js';
import '../css/signUp.css'; // Import the CSS file

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Sign Up</h2>
        <p>
          Already have an account?&nbsp;
          <Link to="/login">Sign In</Link>
        </p>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit(create)}>
          <div className='space-y-5'>
            <Input
              label=""
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label=""
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
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
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup;


/*
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

import authService from '../appwrite/auth'
import { login } from '../store/authSlice'
import { Button, Input} from './master.js'


function Signup() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();

    const create = async (data) => {
        setError("");
        try {
            const userData = await authService.createAccount(data);
            if (userData) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(login(userData));
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className="text-center rounded bg-white shadow overflow-y-hidden" style={{ position: 'absolute', top: '50%', left: '50%', width: '400px', transform: 'translate(-50%, -50%)' }}>
            <div className={`mx-auto w-100 bg-light rounded-xl p-4 border`}>
                <h2 className="bg-dark text-white py-3">Sign Up</h2>
                <p className="mt-2 text-center text-base text-black-60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="alert text-danger mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>
                        <Input
                            label=""
                            placeholder="Enter your full name"
                            {...register("name", {
                                required: true,
                            })}
                        />
                        <Input
                            label=""
                            placeholder="Enter your email"
                            type="email"
                            className="m-2"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
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
                        <Button type="submit" className="btn bg-dark text-white shadow-none text mt-4">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Signup
*/