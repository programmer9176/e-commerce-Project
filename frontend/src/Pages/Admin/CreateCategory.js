import React from 'react'
import AdminMenu from '../../Components/Layout/AdminMenu'
import Layout from '../../Components/Layout/Layout'

const CreateCategory = () => {
    return (
        <>
            <Layout title="Cretae Category">
                <h1 className='text-center'>Create Category</h1>
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

export default CreateCategory