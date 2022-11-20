
import {createAsyncThunk} from "@reduxjs/toolkit";
import {deposit} from "../core/contract";
import {AppState} from "../store";

// @ts-ignore
export const depositThunk = createAsyncThunk("user/deposit", async (amount: number, {getState}) => {
    // @ts-ignore
    let state: AppState = getState();
    let response = await deposit(amount, state.network.account);

    return response;
})