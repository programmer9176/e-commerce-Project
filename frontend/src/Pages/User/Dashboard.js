import React from 'react'
import Layout from '../../Components/Layout/Layout'
import UserMenu from '../../Components/Layout/UserMenu'
import { useAuth } from '../../ContenxtApi/AuthContext'

const Dashboard = () => {

    const [auth] = useAuth();

    return (
        <Layout title="Dashboard">
            <h1 className='text-center'>User Dashboard</h1>

            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                        <UserMenu />
                    </div>
                    <div class="col-md-9">
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

export default Dashboard