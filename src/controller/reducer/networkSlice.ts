import {ActionReducerMapBuilder, createSlice} from '@reduxjs/toolkit';
import {initContractThunk} from "../thunk/initContractThunk";
export const networkSlice = createSlice({
    name: 'network',
    initialState: {
        isAle: false,
        hasAle: false,
        isAleEnabled: false,
        networkId: 3,
        account: "",
        isConnected: false,
        contract: null
    },
    reducers: {
        M_SET_DAPP_NETWORK: (state, networkId) => {
            state.networkId = networkId.payload;
        },
        M_SET_DAPP_CONNECT: (state, connect) => {
            state.isConnected = connect.payload;
        },
        M_SET_DAPP_ENABLE: (state, isAleEnabled) => {
            state.isAleEnabled = isAleEnabled.payload;
        },
        M_SET_DAPP_ACCOUNT: (state, dappAccount) => {
            state.account = dappAccount.payload;
        },
        IS_ALE: (state, isAle) => {
            state.isAle = isAle.payload;
        },
        HAS_ALE: (state, hasAle) => {
            state.hasAle = hasAle.payload;
        },
        IS_ALE_ENABLED: (state, isEnabled) => {
            state.isAleEnabled = isEnabled.payload;
        },
    },
    extraReducers(builder: ActionReducerMapBuilder<any>) {
        builder.addCase(initContractThunk.fulfilled, (state, action) => {
            console.log("complete init contract");
            state.contract = action.payload;
        })

    }
})

export const { M_SET_DAPP_NETWORK, M_SET_DAPP_CONNECT, M_SET_DAPP_ENABLE, M_SET_DAPP_ACCOUNT, IS_ALE, HAS_ALE, IS_ALE_ENABLED } = networkSlice.actions;

export default networkSlice.reducer;