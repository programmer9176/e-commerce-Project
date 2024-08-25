import React from 'react'
import Layout from '../Components/Layout/Layout'
import { useAuth } from '../ContenxtApi/AuthContext'

const Home = () => {

    const [auth, setAuth] = useAuth();


    return (
        <>
            <Layout title="Ecommerce-App Shop now">
                <h1>Home Page</h1>
                <pre>{JSON.stringify(auth, null, 4)}</pre>
            </Layout>
        </>

    )
}

export default Home