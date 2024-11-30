import { createSlice } from '@reduxjs/toolkit';
 
const token = localStorage.getItem('token')? localStorage.getItem('token'): null;

const initialState = {
    loading: false,
    user: null,
    token,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        //login
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        //register
        registerStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        registerSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
        },
        registerFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        //getcurrentuser
        setUser: (state,action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        clearUser:  (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        },
    },
});

export const { loginStart, loginSuccess, loginFailure,registerStart, registerFailure, registerSuccess, setUser, clearUser, logout } = authSlice.actions;
export default authSlice.reducer;
