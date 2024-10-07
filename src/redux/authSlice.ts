const API_ENDPOINT = "http://localhost:3001/api/v1";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: sessionStorage.getItem("authToken"), // Retrieve token if present
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk<
  string,
  { email: string; password: string }
>("auth/loginUser", async ({ email, password }) => {
  const response = await fetch(`${API_ENDPOINT}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Failed to login");
  }

  const data = await response.json();
  return data.body.token;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      sessionStorage.removeItem("authToken"); // Clear the token
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        sessionStorage.setItem("authToken", action.payload);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Login failed";
      });
  },
});

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
