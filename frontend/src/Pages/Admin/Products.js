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
            <h1 className='text-center'>All Product list</h1>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-3">
                        <AdminMenu />
                    </div>
                    <div className="col-lg-9">
                        {products.map((p) => (
                            <Link to={`/dashboard/admin/update-product/${p.slug}`}>
                                <div className="card" key={p._id} style={{ width: "18rem" }}>
                                    <div className="card-img">
                                        <img src={`http://localhost:9000/product-photo/${p._id}`} alt="" />
                                    </div>
                                    <div className="card-body">
                                        <h3 className="card-title">{p.name}</h3>
                                        <p>{p.description}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Products;
