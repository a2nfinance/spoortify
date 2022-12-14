import {createAsyncThunk} from "@reduxjs/toolkit";
export const getLatestArtistsThunk = createAsyncThunk("artist/get-latest", async ({}, {getState}) => {
    // @ts-ignore
    let request = await fetch(`/api/db/artist/getLatestArtists`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            limitedNumber: 5
        })
    });
    let artists = await request.json();
    return artists;
})