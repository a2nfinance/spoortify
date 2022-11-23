import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppState} from "../store";
export const getMyProfileThunk = createAsyncThunk("user/get-my-profile", async ({}, {getState}) => {
    // @ts-ignore
    let state: AppState = getState();
    let request = await fetch(`/api/db/artist/getMyProfile`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userAddress: state.network.account
        })
    });
    let user = await request.json();
    return user;
})