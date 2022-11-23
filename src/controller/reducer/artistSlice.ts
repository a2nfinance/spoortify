import {
    ActionReducerMapBuilder,
    createSlice,
    PayloadAction
} from "@reduxjs/toolkit";
import {getLatestArtistsThunk} from "../thunk/getLatestArtistsThunk";
import {Artist} from "../type/Artist";
import {getAllArtistThunk} from "../thunk/getAllArtistThunk";
import {getCurrentArtistThunk} from "../thunk/getCurrentArtistThunk";
import {PlaylistForm} from "../type/Playlist";
import {getPlaylistByArtistThunk} from "../thunk/getPlaylistByArtistThunk";
import {getMyProfileThunk} from "../thunk/getMyProfileThunk";

type ArtistState = {
    coverImage: File,
    artistForm: Artist,
    newArtists: Artist[],
    allArtists: Artist[],
    currentArtist: Artist,
    myPlaylists: PlaylistForm[]
}


const initialState: ArtistState = {
    coverImage: null,
    artistForm: {
        name: "",
        userAddress: "",
        description: "",
        status: 1,
        cover: ""
    },
    newArtists: [],
    allArtists: [],
    currentArtist: {
        name: "",
        userAddress: "",
        description: "",
        status: 1,
        cover: ""
    },
    myPlaylists: []
}

export const artistSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        updateFormAttribute: (state, action: PayloadAction<{att: string, value: any}> ) => {
            state.artistForm[action.payload.att] = action.payload.value;
        },
        setCoverImage: (state, action: PayloadAction<{coverImage: File}> ) => {
            state.coverImage = action.payload.coverImage;
        },
        setArtistFormByCurrentArtist: (state, action: PayloadAction<{}> ) => {
            console.log(state.currentArtist);
            if (state.currentArtist._id) {
                state.artistForm = state.currentArtist;
            }

        },

    },
    extraReducers(builder: ActionReducerMapBuilder<any>) {
        builder.addCase(getLatestArtistsThunk.fulfilled, (state: ArtistState, action) => {

            state.newArtists = action.payload;

        })

        builder.addCase(getAllArtistThunk.fulfilled, (state: ArtistState, action) => {

            state.allArtists = action.payload;

        })
        builder.addCase(getCurrentArtistThunk.fulfilled, (state: ArtistState, action) => {
            state.currentArtist = action.payload;
        })

        builder.addCase(getMyProfileThunk.fulfilled, (state: ArtistState, action) => {
            state.currentArtist = action.payload;
        })

        builder.addCase(getPlaylistByArtistThunk.fulfilled, (state: ArtistState, action) => {

            state.myPlaylists = action.payload;

        })
    }
})

export const { updateFormAttribute, setCoverImage, setArtistFormByCurrentArtist } = artistSlice.actions;
export default artistSlice.reducer;