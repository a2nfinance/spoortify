import {
    Box,
    Button,
    FormControl,
    FormLabel,
    HStack,
    Input,
    InputGroup,
    InputLeftElement,
    Textarea,
    VStack,
    Icon, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Switch
} from "@chakra-ui/react";
import {useAppDispatch, useAppSelector} from "../../controller/hooks";
import {useCallback, useEffect} from "react";
import {createPlaylistThunk} from "../../controller/thunk/createPlaylistThunk";
import {resetPlaylistFormData, setCoverImage, updateFormAttribute} from "../../controller/reducer/playlistSlice";
import {FiFile} from "react-icons/fi";
import {actionNames, processKeys, updateProcessStatus} from "../../controller/reducer/proccessesSlice";

export default function PlaylistForm() {
    const dispatch = useAppDispatch();
    const {playlistForm} = useAppSelector(state => state.playlist)
    const {createPlaylist} = useAppSelector(state => state.process)

    const handleSave = useCallback(() => {
        dispatch(updateProcessStatus({
            actionName: actionNames.createPlaylist,
            att: processKeys.processing,
            value: true
        }))
        dispatch(createPlaylistThunk());
    }, [])

    const handleChangeAttribute = useCallback((att: string, e: any) => {
        dispatch(updateFormAttribute({att: att, value: e.target.value }));
    }, [])

    const handleChangeIsPaid = useCallback((e) => {
        dispatch(updateFormAttribute({att: "isPaid", value: e.target.checked }));
    }, [])

    const handleChangeCover = useCallback((e: any) => {
        dispatch(setCoverImage({coverImage: e.target.files[0] }));
    }, [])
    useEffect(() => {
        dispatch(resetPlaylistFormData())
    }, [])
    return (
        <Box as={'form'} mt={10}>
            <VStack spacing={3}>
                <FormControl display='flex' alignItems='center'>
                    <FormLabel htmlFor='is-paid' mb='0'>
                        Is Paid Playlist?
                    </FormLabel>
                    <Switch id='is-paid'  onChange={e => handleChangeIsPaid(e)} />
                </FormControl>
                <FormControl>
                    <FormLabel>Name</FormLabel>
                    <InputGroup>
                        <Input
                            onChange={e => handleChangeAttribute("name", e)}
                            value={playlistForm.name}
                        />
                    </InputGroup>
                </FormControl>
                <FormControl>
                    <FormLabel>Description</FormLabel>
                    <InputGroup>
                        <Textarea
                            maxLength={2000}
                            onChange={e => handleChangeAttribute("description", e)}
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
                       <Input size={"md"} type={"file"} onChange={e => handleChangeCover(e)} />
                    </InputGroup>
                </FormControl>

                <FormControl>
                    <FormLabel>Price</FormLabel>
                    <InputGroup>
                        <NumberInput min={0}>
                            <NumberInputField  onChange={e => handleChangeAttribute("price", e)} value={playlistForm.price}/>
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </InputGroup>

                </FormControl>
            </VStack>
            <HStack gap={4} mt={10}>
                <Button isLoading={createPlaylist.processing} colorScheme={"purple"} onClick={() => handleSave()}>Save</Button>
            </HStack>
        </Box>
    )
}