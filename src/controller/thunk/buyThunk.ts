
import {createAsyncThunk} from "@reduxjs/toolkit";
import {buy} from "../core/contract";
import {AppState} from "../store";

// @ts-ignore
export const buyThunk = createAsyncThunk("user/buy", async ({}, {getState}) => {
    // @ts-ignore
    let state: AppState = getState();
    let currentPlaylist = state.playlist.currentPlaylist;
    let response = await buy(currentPlaylist.userAddress, currentPlaylist._id, currentPlaylist.price, state.network.account);

    return response;
})