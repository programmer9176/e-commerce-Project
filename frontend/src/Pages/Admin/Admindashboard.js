import React from 'react'
import Layout from './../../Components/Layout/Layout';
import AdminMenu from './../../Components/Layout/AdminMenu';
import { useAuth } from '../../ContenxtApi/AuthContext';

const Admindashboard = () => {

    const [auth] = useAuth()

    return (
        <Layout>
            <h1 className='text-center'>Dashboard</h1>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">

                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <div classname="mb-3">
                            <h5>Name</h5>
                            <p>{auth?.user?.name}</p>
                        </div>
                        <div classname="mb-3">
                            <h5>Email</h5>
                            <p>{auth?.user?.email}</p>
                        </div>
                        <div classname="mb-3">
                            <h5>Address</h5>
                            <p>{auth?.user?.address}</p>
                        </div>
                        <div classname="mb-3">
                            <h5>Phone</h5>
                            <p>{auth?.user?.phone}</p>
                        </div>
                    </div>
                </div>
            </div>



        </Layout>
    )
}

export default Admindashboard