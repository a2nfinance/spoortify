import {
    ActionReducerMapBuilder,
    createSlice,
    PayloadAction
} from "@reduxjs/toolkit";
import {SongForm} from "../type/Song";
import {getSongsByPlaylistThunk} from "../thunk/getSongsByPlaylistThunk";

type SongState = {
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
    coverImage: null,
    songFile: null,
    songForm: {
        userAddress: "",
        name: "",
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
    }
})

export const { updateFormAttribute, setCoverImage, setSong, setAudioPlayerAttribute } = songSlice.actions;
export default songSlice.reducer;