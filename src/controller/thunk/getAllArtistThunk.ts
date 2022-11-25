import {createAsyncThunk} from "@reduxjs/toolkit";
export const getAllArtistThunk = createAsyncThunk("artist/get-all", async ({}, {getState}) => {
    // @ts-ignore
    let request = await fetch(`/api/db/artist/getLatestArtists`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            limitedNumber: 100
        })
    });
    let artists = await request.json();
    return artists;
})