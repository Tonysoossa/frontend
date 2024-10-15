const API_ENDPOINT = "http://localhost:3001/api/v1";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface AuthState {
  token: string | null;
  vibrate: boolean;
  error: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  userName: string | null;
}

const initialState: AuthState = {
  token: sessionStorage.getItem("authToken"),
  error: null,
  email: null,
  firstName: null,
  lastName: null,
  userName: null,
  vibrate: false,
};

// NOTE Thunk pour le login
export const loginUser = createAsyncThunk<
  string,
  { email: string; password: string }
>("auth/loginUser", async ({ email, password }, { rejectWithValue }) => {
  const response = await fetch(`${API_ENDPOINT}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    return rejectWithValue(errorData.message || "Failed to login");
  }

  const data = await response.json();
  return data.body.token;
});

// NOTE Thunk pour récupérer toutes les infos du profil utilisateur
export const fetchUserProfile = createAsyncThunk<
  { email: string; firstName: string; lastName: string; userName: string },
  void,
  { state: RootState }
>("auth/fetchUserProfile", async (_, { getState }) => {
  const state = getState();
  const token = state.auth.token;

  if (!token) throw new Error("No token found");

  const response = await fetch(`${API_ENDPOINT}/user/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user profile");
  }

  const data = await response.json();
  return data.body;
});

// NOTE Thunk pour mettre à jour le profil utilisateur
export const updateUserName = createAsyncThunk<
  { userName: string }, // NOTE Données recu en reponse de l'api
  { userName: string }, // NOTE Arguments envoyé a l'api
  { state: RootState } // NOTE Type du state
>(
  "auth/updateUserName",
  async ({ userName }, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.token;

    if (!token) return rejectWithValue("No token available");

    const response = await fetch(`${API_ENDPOINT}/user/profile`, {
      method: "PUT", // NOTE Utilisation de PUT ou PATCH selon ton API
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userName }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(errorData.message || "Failed to update userName");
    }

    const data = await response.json();
    return data.body; // NOTE Retourne les données mises à jour
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.email = null;
      state.firstName = null;
      state.lastName = null;
      state.userName = null;
      sessionStorage.removeItem("authToken");
    },
    resetVibrate: (state) => {
      state.vibrate = false;
    },
    resetError: (state) => {  // <-- AJOUTER CETTE ACTION
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // NOTENOTENOTENOTE LOGINUSER NOTENOTENOTENOTENOTE

      .addCase(loginUser.pending, (state) => {
        state.error = null;
        state.vibrate = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload;
        sessionStorage.setItem("authToken", action.payload);
        state.vibrate = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message || "Login failed";
        state.vibrate = true;
      })

      // NOTENOTENOTENOTE FETCHUSERPROFILE NOTENOTENOTENOTENOTE

      // NOTE Pour gérer les infos du profil utilisateur, on ne peut pas reassigner state directement alors on utilise Object.assign pour mettre a jours plusieur champs
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        Object.assign(state, action.payload); // Mise à jour des propriétés
        console.log(action.payload);
      })

      // NOTENOTENOTENOTE UPDATEUSERNAME NOTENOTENOTENOTENOTE

      // NOTE Gestion de la mise à jour du userName
      .addCase(updateUserName.fulfilled, (state, action) => {
        state.userName = action.payload.userName; // NOTE Mise à jour du userName dans le state
      })
      .addCase(updateUserName.rejected, (state, action) => {
        state.error = action.payload as string; // NOTE Gère l'erreur si la mise à jour échoue
        console.error("Failed to update username:", action.payload);
      });
  },
});

export const { logout, resetVibrate, resetError } = authSlice.actions;
export const authReducer = authSlice.reducer;
