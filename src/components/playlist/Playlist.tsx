import {Card, CardBody, CardHeader} from "@chakra-ui/card";
import {
    Avatar,
    Box, Button,
    Flex,
    Heading, Icon,
    IconButton, Image, Link,
    List,
    ListIcon,
    ListItem, OrderedList,
    Stack,
    StackDivider,
    Text
} from "@chakra-ui/react";
import {MdCheckCircle} from "react-icons/md";
import {useAppDispatch, useAppSelector} from "../../controller/hooks";
import {useIPFS} from "../../hooks/useIPFS";
import {useCallback, useState} from "react";
import {setAudioPlayerAttribute} from "../../controller/reducer/songSlice";
import {buyThunk} from "../../controller/thunk/buyThunk";
import {useAddress} from "../../hooks/useAddress";
import {useRouter} from "next/router";
import {AiOutlinePlayCircle} from "react-icons/ai";


export default function Playlist() {
    const router = useRouter();
    const {getShortAddress} = useAddress();
    const {currentPlaylist} = useAppSelector(state => state.playlist);
    const {songsByPlaylist, audioPlayer} = useAppSelector(state => state.song);
    const dispatch = useAppDispatch();
    const {resolveLink} = useIPFS();
    const handleSongClick = useCallback((index) => {
        dispatch(setAudioPlayerAttribute({att: "current", value: index}));
        dispatch(setAudioPlayerAttribute({att: "autoPlay", value: true}));
    }, [])
    const handleBuyNow = useCallback(() => {
        dispatch(buyThunk())
    }, [])
    return (
        <Card backgroundColor={"transparent"} shadow={"none"}>
            <CardHeader>
                <Flex gap='4'>
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <Image width={"150px"} src={resolveLink(currentPlaylist.cover)} />
                        <Box>
                            <Heading size='sm'>{currentPlaylist.name}</Heading>
                            <Link
                                onClick={() => router.push(`/artist/${currentPlaylist._id}`)}
                                fontSize={"xs"} color={"gray.500"}
                                letterSpacing={"1px"}>
                                {getShortAddress(currentPlaylist.userAddress)}
                            </Link>
                            <Text fontStyle={"italic"} fontSize={"xs"} letterSpacing={"1px"}>
                                {currentPlaylist.description}
                            </Text>

                            <Text
                                fontWeight={"semibold"}
                                fontSize={"xs"}
                                fontStyle={"italic"}
                                letterSpacing={"1px"}>
                                {currentPlaylist.isPaid ? `Price: ${currentPlaylist.price} CCN` : ""}
                            </Text>
                            <Button rounded={0} mt={2} variant={"outline"} colorScheme={"green"} size={"xs"} onClick={() => handleBuyNow()}>Buy Now</Button>
                        </Box>
                    </Flex>
                </Flex>
            </CardHeader>

            <CardBody>
                <List spacing={3}>
                    {
                        songsByPlaylist.map((song, index) => {
                            // let audio = new Audio(resolveLink(song.songURL));
                            let duration = 0;
                            // audio.addEventListener('loadedmetadata', function(){
                            //     // Obtain the duration in seconds of the audio file (with milliseconds as well, a float value)
                            //     duration = audio.duration;
                            // },false);
                            return (
                                <ListItem
                                    cursor={"pointer"}
                                    opacity={(audioPlayer.current == index) ? 1 : 0.6}
                                    display={"flex"} onClick={() => handleSongClick(index)}
                                >
                                    <Icon as={AiOutlinePlayCircle} alignSelf={'center'} />
                                    <Text ml={1} fontWeight={400} letterSpacing={"1px"}>{song.name}</Text>
                                </ListItem>
                            )
                        })
                    }

                </List>
            </CardBody>
        </Card>
    )
}