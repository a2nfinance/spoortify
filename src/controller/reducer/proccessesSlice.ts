import {
    ActionReducerMapBuilder,
    createSlice,
    PayloadAction
} from "@reduxjs/toolkit";
import {Processes} from "../type/Process";
import {depositThunk} from "../thunk/depositThunk";
import {withdrawThunk} from "../thunk/withdrawThunk";
import {buyThunk} from "../thunk/buyThunk";
import {createSongThunk} from "../thunk/createSongThunk";
import {updateSongThunk} from "../thunk/updateSongThunk";
import {createPlaylistThunk} from "../thunk/createPlaylistThunk";
import {updatePlaylistThunk} from "../thunk/updatePlaylistThunk";
import {createProfileThunk} from "../thunk/createProfileThunk";
// import {router} from "next/client";

export const actionNames = {
    deposit: "deposit",
    withdraw: "withdraw",
    buy: "buy",
    createSong: "createSong",
    createPlaylist: "createPlaylist",
    updateSong: "updateSong",
    updatePlaylist: "updatePlaylist",
    updateProfile: "updateProfile"
}

export const processKeys = {
    started: "started",
    pending: "pending",
    processing: "processing",
    ended: "ended",
    error: "error",
}

const initialState: Processes = {
    deposit: {
        processing: false
    },
    withdraw: {
        processing: false
    },
    buy: {
        processing: false
    },
    createSong: {
        processing: false
    },
    createPlaylist: {
        processing: false
    },
    updateSong: {
        processing: false
    },
    updatePlaylist: {
        processing: false
    },
    updateProfile: {
        processing: false
    }
}

export const processesSlice = createSlice({
    name: 'processes',
    initialState,
    reducers: {
        updateProcessStatus: (state, action: PayloadAction<{actionName: string, att: string, value: boolean}> ) => {
            state[action.payload.actionName][action.payload.att] = action.payload.value;
        },
    },
    extraReducers(builder: ActionReducerMapBuilder<any>) {
        builder.addCase(depositThunk.fulfilled, (state: Processes, action) => {
            console.log("Deposit result:", action.payload)
            state.deposit.processing = false;
        })

        builder.addCase(withdrawThunk.fulfilled, (state: Processes, action) => {
            console.log("Withdraw result:", action.payload)
            state.withdraw.processing = false;
        })

        builder.addCase(buyThunk.fulfilled, (state: Processes, action) => {
            console.log("Buy result:", action.payload)
            state.buy.processing = false;
        })

        builder.addCase(createSongThunk.fulfilled, (state: Processes, action) => {
            console.log("Create song result:", action.payload)
            state.createSong.processing = false;
        })

        builder.addCase(updateSongThunk.fulfilled, (state: Processes, action) => {
            console.log("Update song result:", action.payload)
            state.updateSong.processing = false;
        })

        builder.addCase(createPlaylistThunk.fulfilled, (state: Processes, action) => {
            console.log("Create playlist result:", action.payload)
            state.createPlaylist.processing = false;
        })

        builder.addCase(updatePlaylistThunk.fulfilled, (state: Processes, action) => {
            console.log("Update playlist result:", action.payload)
            state.updatePlaylist.processing = false;
        })

        builder.addCase(createProfileThunk.fulfilled, (state: Processes, action) => {
            console.log("Update profile result:", action.payload)
            state.updateProfile.processing = false;
        })

    }
})

export const { updateProcessStatus } = processesSlice.actions;
export default processesSlice.reducer;