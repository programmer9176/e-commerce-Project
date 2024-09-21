import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import AdminMenu from './../../Components/Layout/AdminMenu';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Select } from 'antd'
import { useParams } from 'react-router-dom';
const { Option } = Select;

const UpdateProduct = () => {
    const params = useParams()
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState("")
    const [photo, setPhoto] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [shipping, setShipping] = useState("")
    const [id, setId] = useState("")

    // get single product

    const singleProduct = async () => {
        try {
            const { data } = await axios.get(`http://localhost:9000/single-product/${params.slug}`);
            if (data.success) {

                console.log(data.singleProduct);

                const product = data.singleProduct;
                setName(product.name);
                setDescription(product.description);
                setPrice(product.price);
                setQuantity(product.quantity);
                setCategory(product.category);
                setShipping(product.shipping);
                setId(product._id)
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    };


    // get all categories

    const getAllCategories = async () => {
        try {
            const { data } = await axios.get("http://localhost:9000/all-category");

            if (data.success) {
                setCategories(data.categories);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        getAllCategories();
        singleProduct()
    }, []);

    const UpdateProduct = async (e) => {
        e.preventDefault()
        try {

            const productData = new FormData()
            productData.append("name", name)
            productData.append("category", category)
            productData.append("description", description)
            productData.append("price", price)
            productData.append("quantity", quantity)
            productData.append("shipping", shipping)
            if (photo) {
                productData.append("photo", photo)
            }

            const { data } = await axios.put(`http://localhost:9000/update-product/${id}`, productData);

            if (data.success) {
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }


        } catch (error) {
            toast.error("Something went wrong")
        }
    }

    const DeleteProduct = async () => {
        try {

            const { data } = await axios.delete(`http://localhost:9000/delete-product/${id}`);

            if (data.success) {
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }


        } catch (error) {
            toast.error("Something went wrong")
        }
    }

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
                            <div className='mb-3'>
                                <Select size='large' showSearch placeholder="Select a Category" className='forrm-select w-75' value={category} onChange={(value) => setCategory(value)}>
                                    {categories.map((c) => {
                                        return <Option key={c._id} value={c._id}>{c.name}</Option>
                                    })}
                                </Select>
                            </div>

                            <div className='mb-3'>
                                <label for="photo" className='btn btn-outline-secondary w-75'>
                                    {photo ? photo.name : "Upload photo"}
                                    <input id='photo' type="file" accept='images/*' hidden onChange={(e) => setPhoto(e.target.files[0])} />
                                </label>
                            </div>

                            <div className='w-75 text-center mb-3'>
                                {photo ? <img src={URL.createObjectURL(photo)} alt={photo.name} height="200px" /> : (
                                    <>
                                        <img src={`http://localhost:9000/product-photo/${id}`} alt="" height="200px" />
                                    </>
                                )}
                            </div>

                            <div className='w-75 mb-3'>
                                <input type="text" placeholder='Product name' className='form-control' value={name} onChange={(e) => setName(e.target.value)} />
                            </div>

                            <div className='w-75 mb-3'>
                                <textarea className='form-control' value={description} onChange={(e) => setDescription(e.target.value)} rows="3" id="" placeholder='Description'></textarea>
                            </div>

                            <div className='w-75 mb-3'>
                                <input type="number" placeholder='Price' className='form-control' value={price} onChange={(e) => setPrice(e.target.value)} />
                            </div>

                            <div className='w-75 mb-3'>
                                <input type="number" placeholder='Quantity' className='form-control' value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                            </div>

                            <Select showSearch placeholder="Shipping" className='forrm-select w-75 mb-3' size='large' onChange={(value) => setShipping(value)} value={shipping ? "Yes" : "No"}>
                                <Option value="0">No</Option>
                                <Option value="1">Yes</Option>
                            </Select>

                            <div className='mb-5'>
                                <button className='btn btn-secondary mx-2' onClick={UpdateProduct}>Update Product</button>

                                <button className='btn btn-danger mx-2' onClick={DeleteProduct}>Delete Product</button>
                            </div>

                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default UpdateProduct