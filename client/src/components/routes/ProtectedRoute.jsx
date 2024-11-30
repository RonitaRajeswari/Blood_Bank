import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import API from '../../services/API'
import { getCurrentUser } from '../../redux/features/auth/authAction'
import {Navigate} from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    const dispatch = useDispatch()
    const [loading, setLoading] = React.useState(true);

    const getUser  = async () => {
        try {
            const {data} = await API.get('/auth/current-user');
            if(data?.success){
                dispatch(getCurrentUser (data));
            }
        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response.data);
            } else {
                console.error('Error message:', error.message);
            }
            localStorage.clear();
        } finally {
            setLoading(false); // Set loading to false whether the request succeeds or fails
        }
    };

    useEffect(() => {
        getUser()
    }, [])
if (loading) {
    return <div>Loading...</div>; // Show a loading state
}

if (localStorage.getItem('token')) {
    return children;
} else {
    return <>
    <Navigate to={'/login'}/></>
}
}

export default ProtectedRoute
