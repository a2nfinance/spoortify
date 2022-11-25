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
    NumberInputStepper,
    Switch,
    Textarea, VStack,
} from "@chakra-ui/react";
import {useAppDispatch, useAppSelector} from "../../controller/hooks";
import {useCallback, useEffect} from "react";
import {updatePlaylistThunk} from "../../controller/thunk/updatePlaylistThunk";
import {setCoverImage, setOpenEditModal, updateFormAttribute} from "../../controller/reducer/playlistSlice";
import {FiFile} from "react-icons/fi";
import {useIPFS} from "../../hooks/useIPFS";
import {actionNames, processKeys, updateProcessStatus} from "../../controller/reducer/proccessesSlice";

export default function EditModal() {
    const {resolveLink} = useIPFS();
    const {openEditModal, playlistForm} = useAppSelector(state => state.playlist);
    const {updatePlaylist} = useAppSelector(state => state.process)
    const dispatch = useAppDispatch();

    const handleOnClose = useCallback(() => {
        dispatch(setOpenEditModal({isOpen: false}))
    }, [])

    const handleSave = useCallback(() => {
        dispatch(updateProcessStatus({
            actionName: actionNames.updatePlaylist,
            att: processKeys.processing,
            value: true
        }))
        dispatch(updatePlaylistThunk());
    }, [])
    const handleUpdatePlaylistAttribute = useCallback((att, e) => {
        dispatch(updateFormAttribute({att: att, value: e.target.value}))
    }, []);

    const handleChangeIsPaid = useCallback((e) => {
        dispatch(updateFormAttribute({att: "isPaid", value: e.target.checked }));
    }, [])

    const handleChangeCover = useCallback((e: any) => {
        dispatch(setCoverImage({coverImage: e.target.files[0] }));
    }, [])

    return (
        <Modal isOpen={openEditModal} onClose={() => handleOnClose()}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader textAlign={"center"}>{playlistForm.name}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={3}>
                        <FormControl display='flex' alignItems='center'>
                            <FormLabel htmlFor='is-paid' mb='0'>
                                Is Paid Playlist?
                            </FormLabel>
                            <Switch id='is-paid' isChecked={playlistForm.isPaid} onChange={e => handleChangeIsPaid(e)} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <InputGroup>
                                <Input
                                    onChange={e => handleUpdatePlaylistAttribute("name", e)}
                                    value={playlistForm.name}
                                />
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Description</FormLabel>
                            <InputGroup>
                                <Textarea
                                    maxLength={2000}
                                    onChange={e => handleUpdatePlaylistAttribute("description", e)}
                                    value={playlistForm.description}
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
                                <Input placeholder={"select new file"} size={"md"} type={"file"} onChange={e => handleChangeCover(e)} />
                            </InputGroup>
                            <Image mt={2} src={resolveLink(playlistForm.cover)} width={"100px"} />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Price (CCN)</FormLabel>
                            <InputGroup>
                                <NumberInput min={0} value={playlistForm.price}>
                                    <NumberInputField  onChange={e => handleUpdatePlaylistAttribute("price", e)} />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </InputGroup>

                        </FormControl>
                    </VStack>
                </ModalBody>

                <ModalFooter justifyContent={"center"}>
                    <Button colorScheme='purple' mr={3} isLoading={updatePlaylist.processing} onClick={() => handleSave()}>
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