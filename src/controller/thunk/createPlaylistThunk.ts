
import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppState} from "../store";
import {pinFileToIPFS} from "../core/ipfs";
import {errorToastContent, successToastContent} from "../core/toastContents";


// @ts-ignore
export const createPlaylistThunk = createAsyncThunk("user/create-playlist", async ({}, {getState}) => {
    // @ts-ignore
    let state: AppState = getState();
    // let response = await deposit(amount, state.network.account);
    try {
        // upload cover
        let response = await pinFileToIPFS(state.playlist.coverImage);
        console.log("Upload result:", response);
        // save DB
        let formData = state.playlist.playlistForm;
        fetch(`/api/db/playlist/save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userAddress: state.network.account,
                name: formData.name,
                description: formData.description,
                isPaid: formData.isPaid,
                price: formData.price,
                cover: response.data.Hash,
                status: 1
            })
        });
        successToastContent(
            `Create playlist success`,
            ``,
        )
        return true;
    } catch (e) {
        errorToastContent(e);
        return false;
    }
})