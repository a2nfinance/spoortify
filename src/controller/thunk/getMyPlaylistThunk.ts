import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppState} from "../store";
export const getMyPlaylistThunk = createAsyncThunk("playlist/get-my-playlists", async ({}, {getState}) => {
    // @ts-ignore
    let state: AppState = getState();
    let request = await fetch(`/api/db/playlist/getMyPlaylist`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userAddress: state.network.account
        })
    });
    let playlists = await request.json();
    return playlists;
})