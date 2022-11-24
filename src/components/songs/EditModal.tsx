import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Icon, Image,
    Input,
    InputGroup,
    InputLeftElement,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper, Select,
    Switch,
    Textarea, VStack,
} from "@chakra-ui/react";
import {useAppDispatch, useAppSelector} from "../../controller/hooks";
import {useCallback, useEffect} from "react";
import {setCoverImage, setOpenEditModal, setSong, updateFormAttribute} from "../../controller/reducer/songSlice";
import {FiFile} from "react-icons/fi";
import {useIPFS} from "../../hooks/useIPFS";
import {updateSongThunk} from "../../controller/thunk/updateSongThunk";
import {actionNames, processKeys, updateProcessStatus} from "../../controller/reducer/proccessesSlice";

export default function EditModal() {
    const {resolveLink} = useIPFS();
    const {openEditModal, songForm} = useAppSelector(state => state.song);
    const {myPlaylists} = useAppSelector(state => state.playlist);
    const {updateSong} = useAppSelector(state => state.process);
    const dispatch = useAppDispatch();

    const handleOnClose = useCallback(() => {
        dispatch(setOpenEditModal({isOpen: false}))
    }, [])

    const handleSave = useCallback(() => {
        dispatch(updateProcessStatus({
            actionName: actionNames.updateSong,
            att: processKeys.processing,
            value: true
        }))
        dispatch(updateSongThunk());
    }, [])
    const handleUpdateSongAttribute = useCallback((att, e) => {
        dispatch(updateFormAttribute({att: att, value: e.target.value}))
    }, []);

    const handleChangeCover = useCallback((e: any) => {
        dispatch(setCoverImage({coverImage: e.target.files[0] }));
    }, [])
    const handleChangeSongFile = useCallback((e: any) => {
        dispatch(setSong({songFile: e.target.files[0] }));
    }, [])

    return (
        <Modal isOpen={openEditModal} onClose={() => handleOnClose()}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader textAlign={"center"}>Edit Playlist</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={3}>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <InputGroup>
                                <Input
                                    onChange={e => handleUpdateSongAttribute("name", e)}
                                    value={songForm.name}
                                />
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Description</FormLabel>
                            <InputGroup>
                                <Input
                                    onChange={e => handleUpdateSongAttribute("description", e)}
                                    value={songForm.description}
                                />
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Cover Image</FormLabel>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents="none"
                                    children={<Icon as={FiFile} />}
                                />
                                <Input size={"md"} type={"file"} onChange={e => handleChangeCover(e)} />
                            </InputGroup>
                            <Image mt={2} src={resolveLink(songForm.cover)} width={"100px"} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Music File (MP3)</FormLabel>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents="none"
                                    children={<Icon as={FiFile} />}
                                />
                                <Input size={"md"} type={"file"} onChange={e => handleChangeSongFile(e)} />
                            </InputGroup>
                            <Box mt={2}>
                                <audio controls>
                                    <source src={resolveLink(songForm.songURL)} type="audio/mpeg"/>
                                    Your browser does not support the audio element.
                                </audio>
                            </Box>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Playlist</FormLabel>
                            <InputGroup>
                                <Select placeholder='Select option' onChange={e => handleUpdateSongAttribute("playlistId", e)}>
                                    {
                                        myPlaylists.map(playlist => {
                                            return <option selected={songForm.playlistId == playlist._id} key={playlist._id} value={playlist._id}>{playlist.name}</option>
                                        })
                                    }
                                </Select>
                            </InputGroup>
                        </FormControl>
                    </VStack>
                </ModalBody>

                <ModalFooter justifyContent={"center"}>
                    <Button isLoading={updateSong.processing} colorScheme='purple' mr={3} onClick={() => handleSave()}>
                        Save
                    </Button>
                    <Button colorScheme='purple' mr={3} onClick={() => handleOnClose()}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}