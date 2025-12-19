import { createSlice } from '@reduxjs/toolkit';

const popupSlice = createSlice({
    name: "popup",
    initialState: {
        settingPopup: false,
        addBookPopup: false,
        readBookPopup: false,
        recordBookPopup: false,
        returnBookPopup: false,
        addNewAdminPopup: false,
    },
    reducers: {
        toggleSettingPopup(state) {
            state.settingPopup = !state.settingPopup;
        },
        toggleAddBookPopup(state) {
            state.settingPopup = !state.settingPopup;
        },
        toggleReadBookPopup(state) {
            state.settingPopup = !state.settingPopup;
        },
        toggleRecordBookPopup(state) {
            state.settingPopup = !state.settingPopup;
        },
        toggleAddNewAdminPopup(state) {
            state.settingPopup = !state.settingPopup;
        },
        toggleReturnBookPopup(state) {
            state.settingPopup = !state.settingPopup;
        },
        closeAllPopup(state) {
            state.addBookPopup = false;
            state.readBookPopup = false;
            state.returnBookPopup = false;
            state.recordBookPopup = false;
            state.addNewAdminPopup = false;
            state.settingPopup = false;
        },
    }
});

export const {
    toggleAddBookPopup,
    toggleAddNewAdminPopup,
    toggleReadBookPopup,
    toggleRecordBookPopup,
    toggleReturnBookPopup,
    toggleSettingPopup,
    closeAllPopup
} = popupSlice.actions;

export default popupSlice.reducer;