import React, { useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import toast from 'react-hot-toast';

const Signup = () => {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [answer, setAnswer] = useState("")
    const navigate = useNavigate();

    const handleSubmit = async (e) => { // Renamed here
        e.preventDefault()

        console.log(name, password, email, phone, address, answer);
        try {
            const resp = await axios.post("http://localhost:9000/signup", {
                name, password, email, phone, address, answer
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
                        <h3 className='login-heading'>Signup here</h3>
                        <input type='text' value={name} onChange={(e) => setName(e.target.value)} className="form-control mb-3" placeholder='Name' />

                        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} className="form-control mb-3" placeholder='Password' />

                        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} className="form-control mb-3" placeholder='Email' />

                        <input type='number' value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control mb-3" placeholder='Phone' />

                        <input type='text' value={address} onChange={(e) => setAddress(e.target.value)} className="form-control mb-3" placeholder='Address' />

                        <input type='text' value={answer} onChange={(e) => setAnswer(e.target.value)} className="form-control mb-3" placeholder='Answer' />

                        <button className='btn btn-primary w-100' onClick={handleSubmit}>Sign Up</button> {/* Updated here as well */}

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
