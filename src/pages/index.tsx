import {Box} from "@chakra-ui/react";
import {useAppDispatch, useAppSelector} from "../controller/hooks";
import {useEffect} from "react";
import {getAllPlaylistThunk} from "../controller/thunk/getAllPlaylistThunk";
import PlaylistGrid from "../components/playlist/PlaylistGrid";

export default function Index() {
    const dispatch = useAppDispatch();
    const {latestPlaylists} = useAppSelector(state => state.playlist)
    useEffect(() => {
        dispatch(getAllPlaylistThunk());
    }, [])
    return (
        <Box maxW={"full"}>
            <PlaylistGrid playlists={latestPlaylists}/>
        </Box>
    )
}