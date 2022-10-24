import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
    currentUser : null,
    loading: false,
    error: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
     loginStart: (state) => {
        state.loading = true
     },
     loginSuccess: (state, action) => {
        state.loading = false;
        state.error = false;
        state.currentUser = action.payload;
        toast.success('Logged In')
     },
     loginFailed: (state, action) => {
        state.loading = false;
        state.error = true
        toast.error(action.payload)
     },
     logOut: (state) => {
        state.currentUser = null;
        state.loading = false;
        state.error = false;
     }
    },
  });

  export const {loginStart,loginSuccess,loginFailed,logOut} = userSlice.actions
  export default userSlice.reducer