import {
    ActionReducerMapBuilder,
    createSlice,
    PayloadAction
} from "@reduxjs/toolkit";
import {Account} from "src/controller/type/Account";
import {getBalance} from "../core/contract";
import {getBalanceThunk} from "../thunk/getBalanceThunk";
// import {connectEVMNetworkThunk} from "../thunk/connectEVMNetworkThunk";



const initialState: Account = {
    networkName: "huygendev",
    balance: "",
    symbol: "",
    address: "",
    shortAddress: "",
    chainId: 0
}

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        updateAttribute: (state, action: PayloadAction<{key: string, value: any}> ) => {
            state[action.payload.key] = action.payload.value;
        },
        disconnectAccount: (state, action: PayloadAction<{}> ) => {
            state.balance = "";
            state.symbol = "";
            state.address = "";
            state.shortAddress = "";
        }

    },
    extraReducers(builder: ActionReducerMapBuilder<any>) {
        builder.addCase(getBalanceThunk.fulfilled, (state: Account, action) => {

            state.balance = action.payload.toString();

        })
    }
})

export const { updateAttribute, disconnectAccount } = accountSlice.actions;
export default accountSlice.reducer;