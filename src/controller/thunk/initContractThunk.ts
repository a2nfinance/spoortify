
import {createAsyncThunk} from "@reduxjs/toolkit";
import Contract from "../core/contract";

// @ts-ignore
export const initContractThunk = createAsyncThunk("contract/init", async ({}, {getState}) => {
    return Contract;
})