import {
    Box, Button,
    Heading, HStack, Image,
    Stack,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr
} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {useAppDispatch, useAppSelector} from "../../controller/hooks";
import {useCallback, useEffect} from "react";
import {getMySongsThunk} from "../../controller/thunk/getMySongsThunk";
import {useIPFS} from "../../hooks/useIPFS";
import EditModal from "../../components/songs/EditModal";
import {setCoverImage, setOpenEditModal, setSong, setSongFormData} from "../../controller/reducer/songSlice";
import {getMyPlaylistThunk} from "../../controller/thunk/getMyPlaylistThunk";

export default function MySongs() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const {resolveLink} = useIPFS();
    const {mySongs} = useAppSelector(state => state.song);
    const {updateSong} = useAppSelector(state => state.process);
    useEffect(() => {
        dispatch(getMyPlaylistThunk());
        dispatch(getMySongsThunk());
    }, [updateSong])

    const handleEditClick = useCallback((song) => {
        dispatch(setCoverImage({coverImage: null}));
        dispatch(setSong({songFile: null}));
        dispatch(setOpenEditModal({isOpen: true}));
        dispatch(setSongFormData({songForm: song}));
    }, [])
    return (
        <Box>
            <Stack spacing={4} mb={5}>
                <Heading
                    display={"flex"}
                    justifyContent={"space-between"}
                    lineHeight={1.1}
                    fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
                    <Text>My Songs</Text>
                    <Button colorScheme={"purple"} onClick={() => router.push("/account/create-song")}>New Song</Button>
                </Heading>
                <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
                    Your profile information will be shown to customer.
                </Text>
            </Stack>
            <TableContainer>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>Image</Th>
                            <Th>Name</Th>
                            <Th>Listen</Th>
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            mySongs.map((song, index) => {
                                return (
                                    <Tr>
                                        <Td><Image width={"50px"} src={resolveLink(song.cover)} /></Td>
                                        <Td>{song.name}</Td>
                                        <Td>
                                            <audio controls>
                                                <source src={resolveLink(song.songURL)} type="audio/mpeg"/>
                                                Your browser does not support the audio element.
                                            </audio>
                                        </Td>
                                        <Td>
                                            <Button onClick={() => handleEditClick(song)}>Edit</Button>
                                        </Td>
                                    </Tr>
                                )
                            })
                        }

                    </Tbody>
                </Table>
            </TableContainer>
            <EditModal />
        </Box>
    )
}