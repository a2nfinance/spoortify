
import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppState} from "../store";
import {pinFileToIPFS} from "../core/ipfs";
import {errorToastContent, successToastContent} from "../core/toastContents";


// @ts-ignore
export const updateSongThunk = createAsyncThunk("user/update-song", async ({}, {getState}) => {
    // @ts-ignore
    let state: AppState = getState();
    try {
        let formData = state.song.songForm;
        let cover = formData.cover;
        let songURL = formData.songURL;
        // upload cover
        if (state.song.coverImage) {
            let uploadCoverResponse = await pinFileToIPFS(state.song.coverImage);
            cover = uploadCoverResponse.data.Hash;
        }
        // upload Song
        if (state.song.songFile) {
            let uploadSongResponse = await pinFileToIPFS(state.song.songFile);
            songURL = uploadSongResponse.data.Hash;
        }

        // save DB
        fetch(`/api/db/song/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                _id: formData._id,
                userAddress: formData.userAddress,
                name: formData.name,
                playlistId: formData.playlistId,
                cover: cover,
                songURL: songURL,
                status: formData.status,
                description: formData.description
            })
        });
        successToastContent(
            `Update song success`,
            ``,
        )
        return true;
    } catch (e) {
        errorToastContent(e);
        return false;
    }
})