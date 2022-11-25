
import {createAsyncThunk} from "@reduxjs/toolkit";
import {deposit} from "../core/contract";
import {AppState} from "../store";
import {successToastContent} from "../core/toastContents";

// @ts-ignore
export const depositThunk = createAsyncThunk("user/deposit", async ({}, {getState}) => {
    // @ts-ignore
    let state: AppState = getState();
    if (state.account.depositAmount <= 0) {
        return {success: false};
    }
    let response = await deposit(state.account.depositAmount, state.network.account);
    // save DB
    if (response.success) {
        fetch(`/api/db/history/save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fromAddress: state.network.account,
                toAddress: process.env.contractAddress,
                transactionType: "Deposit",
                transactionHash: response.msg,
                description: "Deposit to smart contract",
                amount: state.account.depositAmount
            })
        });
        successToastContent(
            `Deposit success`,
            `Transaction: ${response.msg}`,
        )
    } else {
        successToastContent(
            `Deposit fail`,
            ``,
        )
    }

    return response;
})