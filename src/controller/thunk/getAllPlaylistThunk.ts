import {createAsyncThunk} from "@reduxjs/toolkit";
export const getAllPlaylistThunk = createAsyncThunk("playlist/get-all-playlists", async ({}, {getState}) => {
    // @ts-ignore
    let request = await fetch(`/api/db/playlist/getLatestPlaylists`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            limitedNumber: 100
        })
    });
    let playlists = await request.json();
    return playlists;
})