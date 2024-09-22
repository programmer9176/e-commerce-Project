import React, { useEffect, useState } from 'react';
import AdminMenu from './../../Components/Layout/AdminMenu';
import Layout from '../../Components/Layout/Layout';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);

    const getAllProducts = async () => {
        try {
            const { data } = await axios.get("http://localhost:9000/get-product");
            if (data.products) {
                setProducts(data.products);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <Layout>
            <h1 className='text-center my-4'>All Product list</h1>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-3">
                        <AdminMenu />
                    </div>
                    <div className="col-lg-9">
                        <div class="row">
                            {products.map((p) => (
                                <div class="col-md-4 mb-4">
                                    <Link className='card-box' to={`/dashboard/admin/update-product/${p.slug}`}>
                                        <div className="card" key={p._id}>
                                            <div className="card-img">
                                                <img className='img img-fluid' src={`http://localhost:9000/product-photo/${p._id}`} alt="" />
                                            </div>
                                            <div className="card-body">
                                                <h3 className="card-title product-title">{p.name}</h3>
                                                <p className='product-description'>{p.description}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Products;
