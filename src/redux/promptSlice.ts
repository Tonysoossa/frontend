import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PromptState {
  showPrompt: boolean;
}

const initialState: PromptState = {
  showPrompt: false,
};

const promptSlice = createSlice({
  name: 'prompt',
  initialState,
  reducers: {
    setShowPrompt(state, action: PayloadAction<boolean>) {
      state.showPrompt = action.payload;
    },
  },
});

export const { setShowPrompt } = promptSlice.actions;
export default promptSlice.reducer;
