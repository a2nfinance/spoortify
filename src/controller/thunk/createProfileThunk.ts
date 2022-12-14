
import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppState} from "../store";
import {pinFileToIPFS} from "../core/ipfs";
import {errorToastContent, successToastContent} from "../core/toastContents";


// @ts-ignore
export const createProfileThunk = createAsyncThunk("artist/create-profile", async ({}, {getState}) => {
    // @ts-ignore
    let state: AppState = getState();
    try {
        let formData = state.artist.artistForm;
        let cover = formData.cover;
        // upload cover
        if (state.artist.coverImage) {
            let response = await pinFileToIPFS(state.artist.coverImage);
            cover = response.data.Hash;
        }

        // save DB

        fetch(`/api/db/artist/save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                _id: formData._id,
                userAddress: state.network.account,
                name: formData.name,
                description: formData.description,
                cover: cover,
                status: formData.status
            })
        });
        successToastContent(
            `Update profile success`,
            ``,
        )
        return true;
    } catch (e) {
        errorToastContent(e);
        return false;
    }
})