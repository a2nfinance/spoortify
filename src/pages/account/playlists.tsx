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
import {getMyPlaylistThunk} from "../../controller/thunk/getMyPlaylistThunk";
import {useIPFS} from "../../hooks/useIPFS";
import {PlaylistForm} from "../../controller/type/Playlist";
import {setCoverImage, setOpenEditModal, setPlaylistFormData} from "../../controller/reducer/playlistSlice";
import EditModal from "../../components/playlist/EditModal";

export default function MyPlaylists() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const {resolveLink} = useIPFS();
    const {myPlaylists} = useAppSelector(state => state.playlist);
    const {updatePlaylist} = useAppSelector(state => state.process);
    useEffect(() => {
        dispatch(getMyPlaylistThunk());
    }, [updatePlaylist.processing])

    const handleClickUpdate = useCallback((playlist: PlaylistForm) => {
        dispatch(setCoverImage({coverImage: null }));
        dispatch(setOpenEditModal({isOpen: true}));
        dispatch(setPlaylistFormData({playlistForm: playlist}));
    }, [])
    return (
       <Box>
           <Stack spacing={4} mb={5}>
               <Heading
                   display={"flex"}
                   justifyContent={"space-between"}
                   lineHeight={1.1}
                   fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
                   <Text>My Playlists</Text>
                   <Button colorScheme={"purple"} onClick={() => router.push("/account/create-playlist")}>New Playlist</Button>
               </Heading>
               <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
                   To change a playlist's information, click the button "edit".
               </Text>
           </Stack>
           <TableContainer>
               <Table variant='simple'>
                   <Thead>
                       <Tr>
                           <Th>Image</Th>
                           <Th>Name</Th>
                           <Th>Description</Th>
                           <Th isNumeric>Price (CCN)</Th>
                           <Th>Actions</Th>
                       </Tr>
                   </Thead>
                   <Tbody>
                       {
                           myPlaylists.map((playlist, index) => {
                               return  (
                                   <Tr key={`tr-${playlist._id}`}>
                                       <Td><Image width={"50px"} src={resolveLink(playlist.cover)} /></Td>
                                       <Td maxW={"200px"}>{playlist.name}</Td>
                                       <Td maxW={"200px"}>{playlist.description}</Td>
                                       <Td isNumeric>{playlist.price}</Td>
                                       <Td>
                                           <HStack>
                                               <Button onClick={() => router.push(`/playlist/${playlist._id}`)}>Listen</Button>
                                               <Button onClick={() => handleClickUpdate(playlist)}>Edit</Button>
                                           </HStack>

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