import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppState} from "../store";
export const getMyHistoryThunk = createAsyncThunk("history/get-my-history", async ({}, {getState}) => {
    // @ts-ignore
    let state: AppState = getState();
    let request = await fetch(`/api/db/history/getMyHistory`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userAddress: state.network.account
        })
    });
    let transactions = await request.json();
    return transactions;
})