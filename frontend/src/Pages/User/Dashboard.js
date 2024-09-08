import React from 'react'
import Layout from '../../Components/Layout/Layout'
import UserMenu from '../../Components/Layout/UserMenu'
import { useAuth } from '../../ContenxtApi/AuthContext'

const Dashboard = () => {

    const [auth] = useAuth();

    return (
        <Layout title="Dashboard">
            <h1 className='text-center'>User Dashboard</h1>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="mb-3">
                            <h5>Name</h5>
                            <p>{auth?.user?.name}</p>
                        </div>
                        <div className="mb-3">
                            <h5>Email</h5>
                            <p>{auth?.user?.email}</p>
                        </div>
                        <div className="mb-3">
                            <h5>Address</h5>
                            <p>{auth?.user?.address}</p>
                        </div>
                        <div className="mb-3">
                            <h5>Phone</h5>
                            <p>{auth?.user?.phone}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard