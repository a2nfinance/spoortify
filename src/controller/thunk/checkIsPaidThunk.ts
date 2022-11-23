
import {createAsyncThunk} from "@reduxjs/toolkit";
import {isPaid} from "../core/contract";
import {AppState} from "../store";

// @ts-ignore
export const checkIsPaidThunk = createAsyncThunk("user/check-is-paid", async ({}, {getState}) => {
    // @ts-ignore
    let state: AppState = getState();
    if (state.playlist.currentPlaylist.userAddress == state.network.account) {
        return true;
    }
    let response = await isPaid(state.playlist.currentPlaylist._id, state.network.account);
    console.log("Check Is paid response", response);
    return response;
})