
import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppState} from "../store";
import {pinFileToIPFS} from "../core/ipfs";
import {errorToastContent, successToastContent} from "../core/toastContents";


// @ts-ignore
export const updatePlaylistThunk = createAsyncThunk("user/update-playlist", async ({}, {getState}) => {
    // @ts-ignore
    let state: AppState = getState();
    try {
        let formData = state.playlist.playlistForm;
        let cover = formData.cover;
        // upload cover
        if (state.playlist.coverImage) {
            let response = await pinFileToIPFS(state.playlist.coverImage);
            cover = response.data.Hash;
        }

        // save DB

        fetch(`/api/db/playlist/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                _id: formData._id,
                userAddress: formData.userAddress,
                name: formData.name,
                description: formData.description,
                isPaid: formData.isPaid,
                price: formData.price,
                cover: cover,
                status: formData.status
            })
        });
        successToastContent(
            `Update playlist success`,
            ``,
        )
        return true;
    } catch (e) {
        errorToastContent(e);
        return false;
    }
})