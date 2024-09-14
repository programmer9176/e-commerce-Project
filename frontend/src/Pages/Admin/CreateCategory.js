import React, { useEffect, useState } from 'react';
import AdminMenu from '../../Components/Layout/AdminMenu';
import Layout from '../../Components/Layout/Layout';
import axios from 'axios';
import toast from 'react-hot-toast';
import CategoryForm from '../../Components/CategoryForm';
import { Modal } from 'antd';

const CreateCategory = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post("http://localhost:9000/create-category", { name });

            if (data.success) {
                toast.success(`${data.category.name} is created`);
                setName("");
                getAllCategories();

            } else {
                toast.error(data.message); // Fixed here
            }
        } catch (error) {
            console.error("Error creating category:", error);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`http://localhost:9000/update-category/${selected._id}`, { name: updatedName });

            if (data.success) {
                setSelected(null);
                setVisible(false);
                setUpdatedName("");
                getAllCategories();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error updating category:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(`http://localhost:9000/delete-category/${id}`);

            if (data.success) {
                toast.success(`${data.deleteCategory.name} is deleted`)
                getAllCategories();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error updating category:", error);
        }
    };

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

                            <div className='w-75'>
                                <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
                            </div>
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
                                                <td>
                                                    <button className='btn btn-success mx-2' onClick={() => { setVisible(true); setUpdatedName(c.name); setSelected(c); }} >Edit</button>
                                                    <button className='btn btn-danger mx-2' onClick={() => handleDelete(c._id)}>Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <Modal onCancel={() => setVisible(false)} footer={null} visible={visible}>
                                <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} />
                            </Modal>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default CreateCategory;
