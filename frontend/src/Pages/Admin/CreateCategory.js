import React, { useEffect, useState } from 'react';
import AdminMenu from '../../Components/Layout/AdminMenu';
import Layout from '../../Components/Layout/Layout';
import axios from 'axios';
import toast from 'react-hot-toast';

const CreateCategory = () => {
    const [categories, setCategories] = useState([]);

    const getAllCategories = async () => {
        try {
            const { data } = await axios.get("http://localhost:9000/all-category");

            if (data.success) {
                setCategories(data.categories);
                console.log(data.categories);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        getAllCategories();
    }, []);

    return (
        <>
            <Layout title="Create Category">
                <h1 className='text-center'>Create Category</h1>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3">
                            <AdminMenu />
                        </div>
                        <div className="col-md-9">
                            <div>
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categories.map((c) => (
                                            <tr key={c._id}>
                                                <td>{c.name}</td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default CreateCategory;
