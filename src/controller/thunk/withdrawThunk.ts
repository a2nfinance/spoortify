
import {createAsyncThunk} from "@reduxjs/toolkit";
import {withdraw} from "../core/contract";
import {AppState} from "../store";
import {successToastContent} from "../core/toastContents";

// @ts-ignore
export const withdrawThunk = createAsyncThunk("user/withdraw", async ({}, {getState}) => {
    // @ts-ignore
    let state: AppState = getState();
    if (state.account.withdrawAmount <= 0) {
        return {success: false};
    }
    let response = await withdraw(state.account.withdrawAmount, state.network.account);
    if (response.success) {
        fetch(`/api/db/history/save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fromAddress: process.env.contractAddress,
                toAddress: state.network.account,
                transactionType: "Withdraw",
                transactionHash: response.msg,
                description: "Withdraw to ALE wallet",
                amount: state.account.withdrawAmount
            })
        });
        successToastContent(
            `Withdraw success`,
            `Transaction: ${response.msg}`,
        )
    } else {
        successToastContent(
            `Withdraw fail`,
            ``,
        )
    }
    return response;
})