import {
    ActionReducerMapBuilder,
    createSlice,
    PayloadAction
} from "@reduxjs/toolkit";
import {PlaylistForm} from "../type/Playlist";
import {getCurrentPlaylistThunk} from "../thunk/getCurrentPlaylistThunk";
import {getLatestPlaylistsThunk} from "../thunk/getLatestPlaylistsThunk";

type PlaylistState = {
    coverImage: File,
    playlistForm: PlaylistForm,
    myPlaylists: PlaylistForm[],
    latestPlaylists: PlaylistForm[],
    currentPlaylist: PlaylistForm
}


const initialState: PlaylistState = {
    coverImage: null,
    playlistForm: {
        userAddress: "",
        name: "",
        description: "",
        cover: "",
        isPaid: false,
        price: 0,
        status: 1
    },
    myPlaylists: [],
    latestPlaylists: [],
    currentPlaylist: {
        userAddress: "",
        name: "",
        description: "",
        cover: "",
        isPaid: false,
        price: 0,
        status: 1
    }
}

export const playlistSlice = createSlice({
    name: 'playlist',
    initialState,
    reducers: {
        updateFormAttribute: (state, action: PayloadAction<{att: string, value: any}> ) => {
            state.playlistForm[action.payload.att] = action.payload.value;
        },
        setCoverImage: (state, action: PayloadAction<{coverImage: File}> ) => {
            state.coverImage = action.payload.coverImage;
        },
    },
    extraReducers(builder: ActionReducerMapBuilder<any>) {
        builder.addCase(getCurrentPlaylistThunk.fulfilled, (state: PlaylistState, action) => {

            state.currentPlaylist = action.payload;

        })
        builder.addCase(getLatestPlaylistsThunk.fulfilled, (state: PlaylistState, action) => {

            state.latestPlaylists = action.payload;

        })
    }
})

export const { updateFormAttribute, setCoverImage } = playlistSlice.actions;
export default playlistSlice.reducer;