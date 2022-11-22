import {createAsyncThunk} from "@reduxjs/toolkit";
export const getLatestPlaylistsThunk = createAsyncThunk("playlist/get-latest-playlists", async ({}, {getState}) => {
    // @ts-ignore
    let request = await fetch(`/api/db/playlist/getLatestPlaylists`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            limitedNumber: 5
        })
    });
    let playlists = await request.json();
    return playlists;
})