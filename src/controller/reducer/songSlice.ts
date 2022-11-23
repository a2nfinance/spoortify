import {
    ActionReducerMapBuilder,
    createSlice,
    PayloadAction
} from "@reduxjs/toolkit";
import {SongForm} from "../type/Song";
import {getSongsByPlaylistThunk} from "../thunk/getSongsByPlaylistThunk";
import {getMySongsThunk} from "../thunk/getMySongsThunk";

type SongState = {
    openEditModal: boolean,
    coverImage: File,
    songFile: File,
    songForm: SongForm,
    mySongs: SongForm[],
    latestSongs: SongForm[],
    songsByPlaylist: SongForm[];
    audioPlayer: {
        current: number,
        count: number,
        autoPlay: boolean
    }
}


const initialState: SongState = {
    openEditModal: false,
    coverImage: null,
    songFile: null,
    songForm: {
        userAddress: "",
        name: "",
        description: "",
        cover: "",
        songURL: "",
        playlistId: "",
        status: 1
    },
    mySongs: [],
    latestSongs: [],
    songsByPlaylist: [],
    audioPlayer: {
        current: 0,
        count: 0,
        autoPlay: false
    }
}

export const songSlice = createSlice({
    name: 'playlist',
    initialState,
    reducers: {
        updateFormAttribute: (state, action: PayloadAction<{att: string, value: any}> ) => {
            state.songForm[action.payload.att] = action.payload.value;
        },
        setCoverImage: (state, action: PayloadAction<{coverImage: File}> ) => {
            state.coverImage = action.payload.coverImage;
        },
        setSong: (state, action: PayloadAction<{songFile: File}> ) => {
            state.songFile = action.payload.songFile;
        },
        setAudioPlayerAttribute: (state, action: PayloadAction<{att: string, value: any}> ) => {
            state.audioPlayer[action.payload.att] = action.payload.value;
        },
        setOpenEditModal:  (state, action: PayloadAction<{isOpen: boolean}> ) => {
            state.openEditModal = action.payload.isOpen;
        },
        setSongFormData: (state, action: PayloadAction<{songForm: SongForm}> ) => {
            state.songForm = action.payload.songForm;
        },
    },
    extraReducers(builder: ActionReducerMapBuilder<any>) {
        builder.addCase(getSongsByPlaylistThunk.fulfilled, (state: SongState, action) => {

            state.songsByPlaylist = action.payload;
            state.audioPlayer = {
                current: 0,
                count: action.payload.length,
                autoPlay: true
            }

        })
        builder.addCase(getMySongsThunk.fulfilled, (state: SongState, action) => {

            state.mySongs = action.payload

        })
    }
})

export const { updateFormAttribute, setCoverImage, setSong, setAudioPlayerAttribute, setOpenEditModal, setSongFormData } = songSlice.actions;
export default songSlice.reducer;