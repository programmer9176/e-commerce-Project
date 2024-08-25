import { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../Components/Spinner';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../ContenxtApi/AuthContext';

const PrivateRoute = () => {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();


    useEffect(() => {
        const authCheck = async () => {
            const resp = await axios.get("http://localhost:9000/auth-user");

            if (resp.data.ok) {
                setOk(true);
            } else {
                setOk(false);
            }
        };

        if (auth?.token) authCheck();
    }, [auth?.token]);

    return ok ? <Outlet /> : <Spinner />;
};

export default PrivateRoute;
