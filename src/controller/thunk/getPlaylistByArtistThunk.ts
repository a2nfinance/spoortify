import {createAsyncThunk} from "@reduxjs/toolkit";
export const getPlaylistByArtistThunk = createAsyncThunk("artist/get-playlist-by-artist", async (artistId: string, {getState}) => {
    let request = await fetch(`/api/db/playlist/getPlaylistsByArtist`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: artistId
        })
    });
    let playlists = await request.json();
    return playlists;
})