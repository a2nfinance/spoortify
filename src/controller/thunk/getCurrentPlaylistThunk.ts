import {createAsyncThunk} from "@reduxjs/toolkit";
export const getCurrentPlaylistThunk = createAsyncThunk("user/get-current-playlist", async (playlistId: string, {getState}) => {
    // @ts-ignore
    let request = await fetch(`/api/db/playlist/getPlaylistById`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: playlistId
        })
    });
    let currentPlaylist = await request.json();
    return currentPlaylist;
})