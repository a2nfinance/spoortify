import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppState} from "../store";
export const getMySongsThunk = createAsyncThunk("user/get-my-songs", async ({}, {getState}) => {
    // @ts-ignore
    let state: AppState = getState();
    let request = await fetch(`/api/db/song/getMySongs`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userAddress: state.network.account
        })
    });
    let songs = await request.json();
    return songs;
})