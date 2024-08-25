import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Spinner = () => {

    const [count, setCount] = useState(5)
    const navigate = useNavigate()

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevValue) => --prevValue);
        }, 1000)

        count === 0 && navigate("/login")
        return () => clearInterval(interval);
    }, [count, navigate])

    return (
        <>
            <div style={{ minHeight: "100vh" }} className='text-cetner d-flex justify-content-center flex-column align-items-center'>
                <div className='text-cetner'>
                    <h1>Redirecting to you in {count} seconds</h1>
                    <div class="spinner-border text-cetner" role="status">
                        <span class="sr-only"></span>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Spinner