import {Card, CardBody, CardHeader} from "@chakra-ui/card";
import {Avatar, Box, Flex, Heading, Icon, Image, Stack, StackDivider, Text} from "@chakra-ui/react";
import {useAppDispatch, useAppSelector} from "../../controller/hooks";
import {useEffect} from "react";
import {useIPFS} from "../../hooks/useIPFS";
import {useRouter} from "next/router";
import {getLatestArtistsThunk} from "../../controller/thunk/getLatestArtistsThunk";
import {useAddress} from "../../hooks/useAddress";
import {AiOutlineEye} from "react-icons/ai";

export default function NewArtists() {
    const {getShortAddress} = useAddress();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const {resolveLink} = useIPFS();
    const {newArtists} = useAppSelector(state => state.artist);
    useEffect(()=> {
        dispatch(getLatestArtistsThunk())
    }, [])
    return (
        <Card backgroundColor={"transparent"} shadow={0} width={"full"}>
            <CardHeader>
                <Heading size='md'>Top Artists</Heading>
            </CardHeader>

            <CardBody>
                <Stack divider={<StackDivider />} spacing='4'>
                    {
                        newArtists.map((artist, index) => {
                            return (
                                <Flex gap='4' key={`playlist-${artist._id}`}
                                      onClick={() => router.push(`/artist/${artist._id}`)}
                                      cursor={"pointer"}
                                      justifyContent={"space-between"}>
                                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                        <Text fontWeight={500} fontSize={"sm"}>{index+1}.</Text>
                                        <Image rounded={"50%"} width={"60px"} src={resolveLink(artist.cover)} />

                                        <Box>
                                            <Heading size='sm'>{artist.name}</Heading>
                                            <Text fontSize={"xs"} color={"gray.500"} letterSpacing={"1px"}>{getShortAddress(artist.userAddress)}</Text>
                                            {/*<Text>{new Date(artist.createdAt).toLocaleDateString()}</Text>*/}
                                        </Box>
                                    </Flex>
                                    <Icon as={AiOutlineEye} h={7} w={7} alignSelf={'center'} />
                                </Flex>
                            )
                        })
                    }
                </Stack>
            </CardBody>
        </Card>
    )
}