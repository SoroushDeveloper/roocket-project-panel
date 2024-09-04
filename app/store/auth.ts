import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "@/app/store/index";

interface AuthState {
    verifyToken?: string
    user?: string
}

const initialState: AuthState = {
    verifyToken: undefined,
    user: undefined,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateVerifyToken: (state, action: PayloadAction<string | undefined>) => {
            state.verifyToken = action.payload;
        },
        updateUser: (state, action: PayloadAction<string>|undefined) => {
            state.user = action?.payload ?? undefined
        }
    }
})

export const {updateVerifyToken, updateUser} = authSlice.actions

export const selectVerifyToken = (state: RootState) => state.auth.verifyToken
export const selectUser = (state: RootState) => state.auth.user

export default authSlice.reducer