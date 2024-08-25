import React, { useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import toast from 'react-hot-toast';

const Signup = () => {
    const [email, setEmail] = useState("")
    const [newpassword, setNewPassword] = useState("")
    const [answer, setAnswer] = useState("")

    const navigate = useNavigate();

    const HandleSubmit = async (e) => {
        e.preventDefault()

        console.log(email, newpassword, answer);
        try {
            const resp = await axios.post("http://localhost:9000/forgot-password", {
                email, newpassword, answer
            })

            if (resp.data.success) {
                toast.success(resp.data.message)
                navigate("/login")
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
                        <h3 className='login-heading'>Reset Password</h3>

                        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} className="form-control mb-3" placeholder='Email' />

                        <input type='password' value={newpassword} onChange={(e) => setNewPassword(e.target.value)} className="form-control mb-3" placeholder='New Password' />

                        <input type='text' value={answer} onChange={(e) => setAnswer(e.target.value)} className="form-control mb-3" placeholder='Answer' />

                        <button className='btn btn-primary w-100' onClick={HandleSubmit}>Reset Password</button>

                        <div className='text-center mt-3'>
                            <p>Already have an account? <Link to="/login">Login Here</Link></p>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Signup
