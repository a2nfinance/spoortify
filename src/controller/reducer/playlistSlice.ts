import {
    ActionReducerMapBuilder,
    createSlice,
    PayloadAction
} from "@reduxjs/toolkit";
import {PlaylistForm} from "../type/Playlist";
import {getCurrentPlaylistThunk} from "../thunk/getCurrentPlaylistThunk";
import {getLatestPlaylistsThunk} from "../thunk/getLatestPlaylistsThunk";
import {getMyPlaylistThunk} from "../thunk/getMyPlaylistThunk";
import {getAllPlaylistThunk} from "../thunk/getAllPlaylistThunk";
import {checkIsPaidThunk} from "../thunk/checkIsPaidThunk";

type PlaylistState = {
    openEditModal: boolean,
    coverImage: File,
    playlistForm: PlaylistForm,
    myPlaylists: PlaylistForm[],
    latestPlaylists: PlaylistForm[],
    currentPlaylist: PlaylistForm,
    isPaidByUser: boolean
}


const initialState: PlaylistState = {
    openEditModal: false,
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
    },
    isPaidByUser: false
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
        setOpenEditModal:  (state, action: PayloadAction<{isOpen: boolean}> ) => {
            state.openEditModal = action.payload.isOpen;
        },
        setPlaylistFormData: (state, action: PayloadAction<{playlistForm: PlaylistForm}> ) => {
            state.playlistForm = action.payload.playlistForm;
        },
        resetPlaylistFormData: (state, action: PayloadAction ) => {
            state.playlistForm = {
                userAddress: "",
                name: "",
                description: "",
                cover: "",
                isPaid: false,
                price: 0,
                status: 1
            };
        },
    },
    extraReducers(builder: ActionReducerMapBuilder<any>) {
        builder.addCase(getCurrentPlaylistThunk.fulfilled, (state: PlaylistState, action) => {

            state.currentPlaylist = action.payload;

        })
        builder.addCase(getLatestPlaylistsThunk.fulfilled, (state: PlaylistState, action) => {

            state.latestPlaylists = action.payload;

        })
        builder.addCase(getMyPlaylistThunk.fulfilled, (state: PlaylistState, action) => {

            state.myPlaylists = action.payload;

        })
        builder.addCase(getAllPlaylistThunk.fulfilled, (state: PlaylistState, action) => {

            state.latestPlaylists = action.payload;

        })

        builder.addCase(checkIsPaidThunk.fulfilled, (state: PlaylistState, action) => {

            state.isPaidByUser = action.payload;

        })
    }
})

export const { updateFormAttribute, setCoverImage, setOpenEditModal, setPlaylistFormData, resetPlaylistFormData } = playlistSlice.actions;
export default playlistSlice.reducer;