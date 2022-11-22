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
import {useAppDispatch} from "../../controller/hooks";
import {useCallback} from "react";
import {createPlaylistThunk} from "../../controller/thunk/createPlaylistThunk";
import {setCoverImage, updateFormAttribute} from "../../controller/reducer/playlistSlice";
import {FiFile} from "react-icons/fi";

export default function PlaylistForm() {
    const dispatch = useAppDispatch();

    const handleSave = useCallback(() => {
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
                            // value={userForm.companyName}
                        />
                    </InputGroup>
                </FormControl>
                <FormControl>
                    <FormLabel>Description</FormLabel>
                    <InputGroup>
                        <Textarea
                            maxLength={2000}
                            onChange={e => handleChangeAttribute("description", e)}
                            // value={userForm.description}
                        />
                    </InputGroup>
                </FormControl>
                <FormControl>
                    <FormLabel>Cover</FormLabel>
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
                            <NumberInputField  onChange={e => handleChangeAttribute("price", e)}/>
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </InputGroup>

                </FormControl>
            </VStack>
            <HStack gap={4} mt={10}>
                <Button isLoading={false} colorScheme={"purple"} onClick={() => handleSave()}>Save</Button>
            </HStack>
        </Box>
    )
}