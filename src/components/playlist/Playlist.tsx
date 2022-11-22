import {Card, CardBody, CardHeader} from "@chakra-ui/card";
import {
    Avatar,
    Box, Button,
    Flex,
    Heading,
    IconButton, Image,
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


export default function Playlist() {
    const {currentPlaylist} = useAppSelector(state => state.playlist);
    const {songsByPlaylist} = useAppSelector(state => state.song);
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
        <Card>
            <CardHeader>
                <Flex gap='4'>
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <Image width={"100px"} src={resolveLink(currentPlaylist.cover)} />

                        <Box>
                            <Heading size='sm'>Album</Heading>
                            <Text>{currentPlaylist.name}</Text>
                            <Text>{currentPlaylist.userAddress}</Text>
                            <Text>{currentPlaylist.isPaid ? `${currentPlaylist.price} CCN` : ""}</Text>
                            <Button colorScheme={"purple"} onClick={() => handleBuyNow()}>Buy Now</Button>
                        </Box>
                    </Flex>
                </Flex>
            </CardHeader>

            <CardBody>
                <OrderedList spacing={3}>
                    {
                        songsByPlaylist.map((song, index) => {
                            // let audio = new Audio(resolveLink(song.songURL));
                            let duration = 0;
                            // audio.addEventListener('loadedmetadata', function(){
                            //     // Obtain the duration in seconds of the audio file (with milliseconds as well, a float value)
                            //     duration = audio.duration;
                            // },false);
                            return (
                                <ListItem onClick={() => handleSongClick(index)}>
                                    {song.name}
                                </ListItem>
                            )
                        })
                    }

                </OrderedList>
            </CardBody>
        </Card>
    )
}