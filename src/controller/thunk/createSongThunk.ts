
import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppState} from "../store";
import {pinFileToIPFS} from "../core/ipfs";
import {errorToastContent, successToastContent} from "../core/toastContents";


// @ts-ignore
export const createSongThunk = createAsyncThunk("user/create-song", async ({}, {getState}) => {
    // @ts-ignore
    let state: AppState = getState();
    try {
        // upload cover
        let uploadCoverResponse = await pinFileToIPFS(state.song.coverImage);
        // upload Song
        let uploadSongResponse = await pinFileToIPFS(state.song.songFile);
        // save DB
        let formData = state.song.songForm;
        fetch(`/api/db/song/save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userAddress: state.network.account,
                name: formData.name,
                playlistId: formData.playlistId,
                cover: uploadCoverResponse.data.Hash,
                songURL: uploadSongResponse.data.Hash,
                status: 1
            })
        });
        successToastContent(
            `Create song success`,
            ``,
        )
        return true;
    } catch (e) {
        errorToastContent(e);
        return false;
    }
})