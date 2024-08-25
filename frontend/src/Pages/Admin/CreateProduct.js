import React from 'react'
import Layout from '../../Components/Layout/Layout'
import AdminMenu from './../../Components/Layout/AdminMenu';

const CreateProduct = () => {
    return (
        <>
            <Layout title="Create Product">
                <h1 className='text-center'>Create Product</h1>
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

export default CreateProduct