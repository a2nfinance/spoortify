
import {createAsyncThunk} from "@reduxjs/toolkit";
import {withdraw} from "../core/contract";
import {AppState} from "../store";

// @ts-ignore
export const withdrawThunk = createAsyncThunk("user/withdraw", async ({}, {getState}) => {
    // @ts-ignore
    let state: AppState = getState();
    if (state.account.withdrawAmount <= 0) {
        return {success: false};
    }
    let response = await withdraw(state.account.withdrawAmount, state.network.account);
    return response;
})