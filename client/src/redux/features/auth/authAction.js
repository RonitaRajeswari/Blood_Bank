import API from '../../../services/API';
import { toast } from 'react-toastify';
import { loginStart, loginSuccess, loginFailure, registerFailure, registerStart, registerSuccess, setUser,   } from './authSlice';


//login

export const userLogin = ({ role, email, password }) => async (dispatch) => {
    try {
        dispatch(loginStart()); // Start the login process

        const { data } = await API.post('/auth/login', { role, email, password });

        if (data.success) {
            localStorage.setItem('token', data.token); // Store the token
            toast.success(data.message);
            dispatch(loginSuccess({ user: data.user, token: data.token })); // Dispatch success
            window.location.replace('/')
        } else {
            throw new Error(data.message || 'Login failed');
        }
    } catch (error) {
        const errorMessage =
            error.response?.data?.message || error.message || 'Something went wrong';
        toast.error(errorMessage);
        dispatch(loginFailure(errorMessage)); // Dispatch failure
    }
};


//register

export const userRegister = ({
    name,
    role,
    email,
    password,
    organisationName,
    hospitalName,
    website,
    address,
    phone,
}) => async (dispatch) => {
    try {
        dispatch(registerStart()); // Start the registration process

        const { data } = await API.post('/auth/register', {
            name,
            role,
            email,
            password,
            organisationName,
            hospitalName,
            website,
            address,
            phone,
        });

        if (data.success) {
            toast.success(data.message || 'Registration successful!');
            dispatch(registerSuccess({ user: data.user })); // Dispatch success

            // Return data for feedback
            return { success: true, user: data.user };
        } else {
            throw new Error(data.message || 'Registration failed');
        }
    } catch (error) {
        const errorMessage =
            error.response?.data?.message || error.message || 'Something went wrong';
        toast.error(errorMessage);
        dispatch(registerFailure(errorMessage)); // Dispatch failure

        // Throw error for feedback
        throw new Error(errorMessage);
    }
};

//current user

export const getCurrentUser  = () => async (dispatch) => {
    try {
        const res = await API.get('/auth/current-user');
        if (res.data.success) {
            dispatch(setUser (res.data.user)); // Set the user directly
        } else {
            throw new Error(res.data.message || 'Failed to fetch current user');
        }
    } catch (error) {
        toast.error(error.message || 'Something went wrong');
    }
};
