import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  generatedResume: null,
  isSubmitting: false,
  error: null,
};

const resumeSlice = createSlice({
  name: "resume",

  initialState,

  reducers: {
    setResumeResult: (state, action) => {
      state.generatedResume = action.payload;
      state.error = null;
    },

    updateResume: (state, action) => {
      state.generatedResume = {
        ...state.generatedResume,
        ...action.payload,
      };
    },

    updateResumeField: (state, action) => {
      const { field, value } = action.payload;

      if (state.generatedResume) {
        state.generatedResume[field] = value;
      }
    },

    clearResumeResult: (state) => {
      state.generatedResume = null;
      state.error = null;
    },

    setSubmitting: (state, action) => {
      state.isSubmitting = action.payload;
    },

    setResumeError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setResumeResult,
  updateResume,
  updateResumeField,
  clearResumeResult,
  setSubmitting,
  setResumeError,
} = resumeSlice.actions;

export default resumeSlice.reducer;