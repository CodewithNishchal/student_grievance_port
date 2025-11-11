import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    user: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
            // Store in localStorage for persistence
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            // Clear localStorage
            localStorage.removeItem('user');
        },
        loadUserFromStorage: (state) => {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                state.isAuthenticated = true;
                state.user = JSON.parse(storedUser);
            }
        }
    }
})

export const { login, logout, loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;