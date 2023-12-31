import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'
// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isValidToken: user ? true : false,
    generalInfo: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',

}

// Register user
export const register = createAsyncThunk(
    'auth/register',
    async (user, thunkAPI) => {
        try {
            return await authService.register(user)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        return await authService.login(user)
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout()
})

// Profile
export const generalInfo = createAsyncThunk('auth/profile', async (user, thunkAPI) => {
    try {
        return await authService.generalInfo(user)
    } catch (error) {
        const message = error.response.status
        return thunkAPI.rejectWithValue(message)
    }
})



export const validateToken = createAsyncThunk('auth/validateToken', async (thunkAPI) => {
    try {
        return await authService.validateToken(user.token)
    } catch (error) {
        const message = error.response.status
        console.log("Error message from validtoken slice:", message); // Log the message here
        return thunkAPI.rejectWithValue({ payload: 23 });
    }
})


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
                state.isValidToken = true;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
                state.isValidToken = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
                state.isValidToken = false
            })
            .addCase(generalInfo.fulfilled, (state, action) => {
                state.generalInfo = action.payload.message
                console.log("success from genrealinfo")
            }).addCase(generalInfo.rejected, (state, action) => {
            }).addCase(validateToken.rejected, (state, action) => {
                if (action.payload === undefined) {
                    state.isValidToken = false;
                    state.user = null
                }
            });
    },

})

export const { reset } = authSlice.actions
export default authSlice.reducer