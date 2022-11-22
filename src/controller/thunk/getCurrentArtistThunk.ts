import {createAsyncThunk} from "@reduxjs/toolkit";
export const getCurrentArtistThunk = createAsyncThunk("user/get-current-playlist", async (userId: string, {getState}) => {
    // @ts-ignore
    let request = await fetch(`/api/db/artist/getCurrentArtist`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: userId
        })
    });
    let currentArtist = await request.json();
    return currentArtist;
})