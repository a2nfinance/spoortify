
import {createAsyncThunk} from "@reduxjs/toolkit";
import {buy} from "../core/contract";
import {AppState} from "../store";
import {successToastContent} from "../core/toastContents";

// @ts-ignore
export const buyThunk = createAsyncThunk("user/buy", async ({}, {getState}) => {
    // @ts-ignore
    let state: AppState = getState();
    let currentPlaylist = state.playlist.currentPlaylist;
    let response = await buy(currentPlaylist.userAddress, currentPlaylist._id, currentPlaylist.price, state.network.account);
    if (response.success) {
        fetch(`/api/db/history/save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fromAddress:  state.network.account,
                toAddress: currentPlaylist.userAddress,
                transactionType: "Buy",
                transactionHash: response.msg,
                description: `Playlist: ${currentPlaylist.name}`,
                amount: currentPlaylist.price
            })
        });
        successToastContent(
            `Buy success`,
            `Transaction: ${response.msg}`,
        )
    } else {
        successToastContent(
            `Buy fail`,
            ``,
        )
    }
    return response;
})