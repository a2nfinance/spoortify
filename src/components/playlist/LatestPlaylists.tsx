import {Card, CardBody, CardHeader} from "@chakra-ui/card";
import {
    Avatar,
    Box,
    Flex,
    Heading,
    Icon,
    Image,
    Link,
    Stack,
    StackDivider,
    Text,
    useBreakpointValue
} from "@chakra-ui/react";
import {useAppDispatch, useAppSelector} from "../../controller/hooks";
import {useEffect} from "react";
import {getLatestPlaylistsThunk} from "../../controller/thunk/getLatestPlaylistsThunk";
import {useIPFS} from "../../hooks/useIPFS";
import {useRouter} from "next/router";
import {useAddress} from "../../hooks/useAddress";
import {AiOutlinePlayCircle} from "react-icons/ai";

export default function LatestPlaylists() {
    const {getShortAddress} = useAddress();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const {resolveLink} = useIPFS();
    const {latestPlaylists} = useAppSelector(state => state.playlist);
    useEffect(()=> {
        dispatch(getLatestPlaylistsThunk())
    }, [])
    return (
        <Card backgroundColor={"transparent"} shadow={0} width={"full"}>
            <CardHeader pt={0}>
               <Flex justifyContent={"space-between"}>
                   <Heading size='md'>Top Playlists</Heading>
                   <Link onClick={() => router.push("/")} fontSize={"sm"} color={"gray.500"}>see more</Link>
               </Flex>
            </CardHeader>

            <CardBody>
                <Stack divider={<StackDivider />} spacing='4'>
                    {
                        latestPlaylists.map((playlist, index) => {
                            return (
                                <Flex gap='4'
                                      py={1}
                                      _hover={{backgroundColor: "navy"}}
                                      key={`playlist-${playlist._id}`}
                                      onClick={() => router.push(`/playlist/${playlist._id}`)}
                                      cursor={"pointer"}
                                      justifyContent={"space-between"}>
                                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                        <Text fontWeight={500} fontSize={"sm"}>{index+1}.</Text>
                                        <Image width={"60px"} src={resolveLink(playlist.cover)} />

                                        <Box>
                                            <Heading size='sm'  inlineSize={{base: "150px", lg: "250px"}} overflowWrap={"break-word"}>{playlist.name}</Heading>
                                            <Text fontSize={"xs"} color={"gray.500"} letterSpacing={"1px"}>{getShortAddress(playlist.userAddress)}</Text>
                                        </Box>
                                    </Flex>
                                    <Icon as={AiOutlinePlayCircle} h={7} w={7} alignSelf={'center'} />
                                </Flex>
                            )
                        })
                    }
                </Stack>
            </CardBody>
        </Card>
    )
}