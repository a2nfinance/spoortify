
import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppState} from "../store";
import {pinFileToIPFS} from "../core/ipfs";
import {errorToastContent, successToastContent} from "../core/toastContents";


// @ts-ignore
export const createProfileThunk = createAsyncThunk("artist/create-profile", async ({}, {getState}) => {
    // @ts-ignore
    let state: AppState = getState();
    try {
        // upload cover
        let response = await pinFileToIPFS(state.artist.coverImage);
        // save DB
        let formData = state.artist.artistForm;
        fetch(`/api/db/artist/save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userAddress: state.network.account,
                name: formData.name,
                description: formData.description,
                cover: response.data.Hash,
                status: 1
            })
        });
        successToastContent(
            `Create profile success`,
            ``,
        )
        return true;
    } catch (e) {
        errorToastContent(e);
        return false;
    }
})