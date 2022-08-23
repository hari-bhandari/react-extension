// ** Redux Imports
import {createSlice} from "@reduxjs/toolkit"
import axios from "axios"

export const authSlice = createSlice({
    name: "authentication",
    initialState: {
        token: null,
        isAuthenticated: true,
        user: null
    },

    reducers: {
        handleLogin: (state, action) => {
            axios.defaults.headers.common['Authorization'] = `Bearer ${action.payload.token}`
            state.token = action.payload.token
            state.isAuthenticated = true
            state.user = action.payload.user
        },
        handleLogout: (state, action) => {
            state.skin = action.payload
            window.localStorage.setItem("skin", JSON.stringify(action.payload))
        },
        handleLoadUser: (state, action) => {
            state.token = action.payload.token
            state.isAuthenticated = true
            state.user = action.payload.user
        }
    }
})

export const {
    handleLogin,
    handleLoadUser,
    handleLogout
} = authSlice.actions

export default authSlice.reducer
