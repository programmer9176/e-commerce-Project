import React from 'react'
import Layout from '../../Components/Layout/Layout'
import AdminMenu from '../../Components/Layout/AdminMenu'

const Users = () => {
    return (
        <>
            <Layout title="All Users">
                <h1 className='text-center'>All Users</h1>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3">

                            <AdminMenu />
                        </div>
                        <div className="col-md-9">

                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Users