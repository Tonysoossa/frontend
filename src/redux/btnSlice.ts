import { createSlice } from "@reduxjs/toolkit";


interface EditState {
  editFormVisible: boolean;
  cancelFormBtn: boolean;
  saveBtn: boolean;
}

const initialState: EditState = {
  editFormVisible: false,
  cancelFormBtn: false,
  saveBtn: false,
};

const editButtonSlice = createSlice({
  name: "editButton",
  initialState,
  reducers: {
    toggleForm: (state) => {
      state.editFormVisible = true; // Inverse la visibilité du formulaire
    },
    closeForm: (state) => {
      state.editFormVisible = false; // Ferme le formulaire
    },
    openForm: (state) => {
      state.editFormVisible = true; // Ouvre le formulaire
    },
  },
});

export const { toggleForm, closeForm, openForm } = editButtonSlice.actions;

export const editButtonReducer = editButtonSlice.reducer;
