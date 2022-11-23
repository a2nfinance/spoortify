import {Box} from "@chakra-ui/react";
import {useAppDispatch, useAppSelector} from "../controller/hooks";
import {useEffect} from "react";
import {getAllPlaylistThunk} from "../controller/thunk/getAllPlaylistThunk";
import PlaylistsGrid from "../components/playlist/PlaylistsGrid";

export default function Index() {
    const dispatch = useAppDispatch();
    const {latestPlaylists} = useAppSelector(state => state.playlist)
    useEffect(() => {
        dispatch(getAllPlaylistThunk());
    }, [])
    return (
        <Box maxW={"full"}>
            <PlaylistsGrid playlists={latestPlaylists}/>
        </Box>
    )
}