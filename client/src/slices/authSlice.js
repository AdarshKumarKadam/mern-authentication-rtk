import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
    isAuthenticated : false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // setIsAuthenticated : (state, action)=>{
    //   state.isAuthenticated = action.payload
    // },
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state.userInfo = null;
      state.isAuthenticated = false;
      localStorage.removeItem('userInfo');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
