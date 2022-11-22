import {Box, Button, Flex, Heading, Image, Text} from "@chakra-ui/react";
import {useAppDispatch, useAppSelector} from "../../controller/hooks";
import {useEffect} from "react";
import {getCurrentArtistThunk} from "../../controller/thunk/getCurrentArtistThunk";
import {getPlaylistByArtistThunk} from "../../controller/thunk/getPlaylistByArtistThunk";
import PlaylistGrid from "../../components/playlist/PlaylistGrid";
import {useIPFS} from "../../hooks/useIPFS";


export default function Artist({id}) {
    const dispatch = useAppDispatch();
    const {resolveLink} = useIPFS();
    const { currentArtist, myPlaylists } = useAppSelector(state => state.artist);
    useEffect(() => {
        dispatch(getCurrentArtistThunk(id))
        dispatch(getPlaylistByArtistThunk(id));
    }, [])
    return (
        <Box maxW={"full"}>
            <Flex gap='4'>
                <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                    <Image width={"100px"} src={resolveLink(currentArtist.cover)} />

                    <Box>
                        <Heading size='sm'>{currentArtist.name}</Heading>
                        <Text>{currentArtist.description}</Text>
                        <Text>{currentArtist.userAddress}</Text>
                    </Box>
                </Flex>
            </Flex>
            <PlaylistGrid playlists={myPlaylists}/>
    </Box>)
}

export async function getServerSideProps(ctx) {
    return {props: {id: ctx.query.id}}
}