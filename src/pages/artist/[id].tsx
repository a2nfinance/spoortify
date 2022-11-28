import {Box, Button, Flex, Heading, Image, Text, VStack} from "@chakra-ui/react";
import {useAppDispatch, useAppSelector} from "../../controller/hooks";
import {useEffect} from "react";
import {getCurrentArtistThunk} from "../../controller/thunk/getCurrentArtistThunk";
import {getPlaylistByArtistThunk} from "../../controller/thunk/getPlaylistByArtistThunk";
import PlaylistsGrid from "../../components/playlist/PlaylistsGrid";
import {useIPFS} from "../../hooks/useIPFS";
import {useAddress} from "../../hooks/useAddress";


export default function Artist({id}) {
    const {getShortAddress} = useAddress();
    const dispatch = useAppDispatch();
    const {resolveLink} = useIPFS();
    const { currentArtist, myPlaylists } = useAppSelector(state => state.artist);
    useEffect(() => {
        dispatch(getCurrentArtistThunk(id))
        dispatch(getPlaylistByArtistThunk(id));
    }, [id])
    return (
        <Box maxW={"full"}>
            <VStack gap='4' alignItems={"flex-start"}>
                <Flex flex='1' px={2} gap='4' flexWrap='wrap'>
                    <Image width={"100px"} src={resolveLink(currentArtist.cover)} />

                    <Box>
                        <Heading size='xl'>{currentArtist.name}</Heading>
                        <Text fontSize={"sm"} maxW={"400px"}>{currentArtist.description}</Text>
                        <Text fontSize={"xs"} color={"gray.500"}>{getShortAddress(currentArtist.userAddress)}</Text>
                    </Box>
                </Flex>
                <PlaylistsGrid playlists={myPlaylists}/>
            </VStack>

    </Box>)
}

export async function getServerSideProps(ctx) {
    return {props: {id: ctx.query.id}}
}