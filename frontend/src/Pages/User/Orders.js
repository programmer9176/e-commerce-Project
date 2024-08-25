import React from 'react'
import Layout from '../../Components/Layout/Layout'
import UserMenu from '../../Components/Layout/UserMenu'

const Orders = () => {
    return (
        <Layout title="Orders">
            <h1 className='text-center'>Orders</h1>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">

                        <UserMenu />
                    </div>
                    <div className="col-md-9">

                    </div>
                </div>
            </div>

        </Layout>
    )
}

export default Orders