
import {createAsyncThunk} from "@reduxjs/toolkit";
import {withdraw} from "../core/contract";
import {AppState} from "../store";

// @ts-ignore
export const withdrawThunk = createAsyncThunk("user/withdraw", async (amount: number, {getState}) => {
    // @ts-ignore
    let state: AppState = getState();
    let response = await withdraw(amount, state.network.account);

    return response;
})