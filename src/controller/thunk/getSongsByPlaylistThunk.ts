import {createAsyncThunk} from "@reduxjs/toolkit";
export const getSongsByPlaylistThunk = createAsyncThunk("user/get-songs-by-playlist", async (playlistId: string, {getState}) => {
    let request = await fetch(`/api/db/song/getSongsByPlaylist`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            playlistId: playlistId
        })
    });
    let songs = await request.json();
    return songs;
})