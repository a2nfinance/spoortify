import {Box, Container, HStack, useBreakpointValue, VStack} from "@chakra-ui/react";
import {useAppDispatch, useAppSelector} from "../../controller/hooks";
import {useEffect} from "react";
import {getSongsByPlaylistThunk} from "../../controller/thunk/getSongsByPlaylistThunk";
import {getCurrentPlaylistThunk} from "../../controller/thunk/getCurrentPlaylistThunk";
import Playlist from "../../components/playlist/Playlist";
import AudioPlayer from "../../components/audio/AudioPlayer";

export default function Album({id}) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getCurrentPlaylistThunk(id))
        dispatch(getSongsByPlaylistThunk(id));
    }, [])
    return (<Box maxW={"full"}>
                <Playlist />
                <Box px={"20px"}>
                    <AudioPlayer />
                </Box>

    </Box>)
}

export async function getServerSideProps(ctx) {
    return {props: {id: ctx.query.id}}
}