import {Card, CardBody, CardHeader} from "@chakra-ui/card";
import {Avatar, Box, Flex, Heading, Image, Stack, StackDivider, Text} from "@chakra-ui/react";
import {useAppDispatch, useAppSelector} from "../../controller/hooks";
import {useEffect} from "react";
import {getLatestPlaylistsThunk} from "../../controller/thunk/getLatestPlaylistsThunk";
import {useIPFS} from "../../hooks/useIPFS";

export default function LatestPlaylists() {
    const dispatch = useAppDispatch();
    const {resolveLink} = useIPFS();
    const {latestPlaylists} = useAppSelector(state => state.playlist);
    useEffect(()=> {
        dispatch(getLatestPlaylistsThunk())
    }, [])
    return (
        <Card>
            <CardHeader>
                <Heading size='md'>New Album</Heading>
            </CardHeader>

            <CardBody>
                <Stack divider={<StackDivider />} spacing='4'>
                    {
                        latestPlaylists.map(playlist => {
                            return (
                                <Flex gap='4'>
                                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                        <Image width={"60px"} src={resolveLink(playlist.cover)} />

                                        <Box>
                                            <Heading size='sm'>Album</Heading>
                                            <Text>{playlist.name}</Text>
                                            <Text>{playlist.userAddress}</Text>
                                        </Box>
                                    </Flex>
                                </Flex>
                            )
                        })
                    }
                </Stack>
            </CardBody>
        </Card>
    )
}