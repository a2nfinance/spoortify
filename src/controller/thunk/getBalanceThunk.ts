
import {createAsyncThunk} from "@reduxjs/toolkit";
import {getBalance} from "../core/contract";
import {AppState} from "../store";

// @ts-ignore
export const getBalanceThunk = createAsyncThunk("user/get-balance", async ({}, {getState}) => {
    // @ts-ignore
    let state: AppState = getState();
    let response = await getBalance(state.network.account);

    return response;
})