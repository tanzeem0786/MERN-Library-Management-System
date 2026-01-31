import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
import { toggleAddBookPopup } from "./popupSlice";
import { api } from "../baseURL.js";


const bookSlice = createSlice({
    name: "book",
    initialState: {
        loading: false,
        error: null,
        message: null,
        books: [],
    },
    reducers: {
        fetchBooksRequest(state) {
            state.error = null;
            state.loading = true;
        },
        fetchBooksSuccess(state, action) {
            state.loading = false;
            state.books = action.payload;
        },
        fetchBooksFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },
        addBooksRequest(state) {
            state.error = null;
            state.loading = true;
            state.message = null;
        },
        addBooksSuccess(state, action) {
            state.loading = false;
            state.message = action.payload
        },
        addBooksFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        resetBookSlice(state) {
            state.error = null;
            state.loading = false;
            state.message = null;
        },
    }
});

export const fetchAllBooks = () => async (dispatch) => {
    dispatch(bookSlice.actions.fetchBooksRequest());
    await api.get('/api/v1/book/all').then((res) => {
        dispatch(bookSlice.actions.fetchBooksSuccess(res.data.books));
    }).catch((error) => {
        dispatch(bookSlice.actions.fetchBooksFailed(error.response.data.message))
    })
};

export const addBook = (data) => async (dispatch) => {
    dispatch(bookSlice.actions.addBooksRequest());
    await api.post('/api/v1/book/admin/add', data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    }).then((res) => {
        dispatch(bookSlice.actions.addBooksSuccess(res.data.message));
        dispatch(toggleAddBookPopup());
    }).catch((error) => {
        dispatch(bookSlice.actions.addBooksFailed(error.response.data.message));
    })
};

export const resetBookSlice = () => async (dispatch) => {
    dispatch(bookSlice.actions.resetBookSlice());
};

export default bookSlice.reducer;