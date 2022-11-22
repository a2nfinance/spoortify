
import {createAsyncThunk} from "@reduxjs/toolkit";
import {deposit} from "../core/contract";
import {AppState} from "../store";

// @ts-ignore
export const depositThunk = createAsyncThunk("user/deposit", async ({}, {getState}) => {
    // @ts-ignore
    let state: AppState = getState();
    if (state.account.depositAmount <= 0) {
        return {success: false};
    }
    let response = await deposit(state.account.depositAmount, state.network.account);

    return response;
})