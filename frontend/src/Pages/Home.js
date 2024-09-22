import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layout/Layout'
import { useAuth } from '../ContenxtApi/AuthContext'
import axios from 'axios'
import { Checkbox, Radio } from 'antd'
import { prices } from '../Components/Prices'

const Home = () => {

    const [auth, setAuth] = useAuth();
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [checked, setChecked] = useState([])
    const [radio, setRadio] = useState([])

    // handle filters

    const handleFilter = (value, id) => {
        let all = [...checked]

        if (value) {
            all.push(id)
        } else {
            all = all.filter(c => c !== id)
        }

        setChecked(all);
    }

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

    const getAllCategories = async () => {
        try {
            const { data } = await axios.get("http://localhost:9000/all-category");

            if (data.success) {
                setCategories(data.categories);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        if (!checked.length || !radio.length) getAllProducts();
        getAllCategories()
    }, []);

    const handlefilter = async () => {
        try {
            const { data } = await axios.post("http://localhost:9000/filter", { checked, radio });

            if (data.filterProducts) {
                setProducts(data.filterProducts)
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        if (checked.length || radio.length) handlefilter()
    })

    return (
        <>
            <Layout title="Ecommerce-App Shop now">
                <div class="mt-3">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-3">
                                <h4>Filter By Category</h4>

                                <div className='d-flex flex-column'>
                                    {categories.map((c) => {
                                        return <Checkbox className='mb-2' key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                                            {c.name}
                                        </Checkbox>
                                    })}
                                </div>

                                <h4 className='my-3'>Filter By Price</h4>

                                <div>
                                    <Radio.Group className='d-flex flex-column' onChange={(e) => setRadio(e.target.value)}>
                                        {prices.map((p) => {
                                            return <Radio key={p._id} value={p.array}>{p.name}</Radio>
                                        })}
                                    </Radio.Group>

                                </div>


                            </div>
                            <div class="col-md-9">
                                <h4 className='text-center '>All Products</h4>
                                <div className='my-5'>
                                    {JSON.stringify(radio, null, 20)}
                                </div>

                                <div class="row">
                                    {products.map((p) => (
                                        <div class="col-md-4">

                                            <div className="card" key={p._id}>
                                                <div className="card-img">
                                                    <img className='img img-fluid' src={`http://localhost:9000/product-photo/${p._id}`} alt="" />
                                                </div>
                                                <div className="card-body">
                                                    <h3 className="card-title product-title">{p.name}</h3>
                                                    <p className='product-description'>{p.description}</p>
                                                    <p>{p.price}</p>

                                                </div>
                                            </div>

                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>

    )
}

export default Home