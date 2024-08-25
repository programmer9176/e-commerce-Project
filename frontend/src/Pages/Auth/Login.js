import React, { useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import toast from 'react-hot-toast';
import { useAuth } from '../../ContenxtApi/AuthContext';

const Signup = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    const HandleSubmit = async (e) => {
        e.preventDefault()

        console.log(email, password);

        try {
            const resp = await axios.post("http://localhost:9000/login", {
                email, password
            })

            if (resp.data.success) {

                setAuth({
                    ...auth,
                    user: resp.data.user,
                    token: resp.data.token
                })
                localStorage.setItem('auth', JSON.stringify(resp.data))
                navigate("/")
                toast.success(resp.data.message);

            } else {
                toast.error(resp.data.message)
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.")
            console.error("Signup error:", error)
        }
    }

    return (
        <>
            <Layout title="SignUp">
                <div className='login-form'>
                    <div className='form-box'>
                        <h3 className='login-heading'>Signin here</h3>

                        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} className="form-control mb-3" placeholder='Email' />

                        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} className="form-control mb-3" placeholder='Password' />

                        <button className='btn btn-primary w-100' onClick={HandleSubmit}>Login Here</button>

                        <Link className='btn btn-primary w-100 my-3' to="/forgot-password">FORGOT PASSWORD</Link>

                        <div className='text-center mt-3'>
                            <p>Already have an account? <Link to="/signup">SignUp Here Here</Link></p>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Signup
