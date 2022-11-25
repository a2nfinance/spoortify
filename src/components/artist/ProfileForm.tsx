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
    Icon, Image
} from "@chakra-ui/react";
import {useAppDispatch, useAppSelector} from "../../controller/hooks";
import {useCallback} from "react";
import {createProfileThunk} from "../../controller/thunk/createProfileThunk";
import {setCoverImage, updateFormAttribute} from "../../controller/reducer/artistSlice";
import {FiFile} from "react-icons/fi";
import {useIPFS} from "../../hooks/useIPFS";
import {actionNames, processKeys, updateProcessStatus} from "../../controller/reducer/proccessesSlice";

export default function ProfileForm() {
    const {resolveLink} = useIPFS();
    const dispatch = useAppDispatch();
    const {artistForm} = useAppSelector(state => state.artist);
    const {updateProfile} = useAppSelector(state => state.process);
    const handleSave = useCallback(() => {
        dispatch(updateProcessStatus({
            actionName: actionNames.updateProfile,
            att: processKeys.processing,
            value: true
        }))
        dispatch(createProfileThunk());
    }, [])

    const handleChangeAttribute = useCallback((att: string, e: any) => {
        dispatch(updateFormAttribute({att: att, value: e.target.value }));
    }, [])

    const handleChangeCover = useCallback((e: any) => {
        dispatch(setCoverImage({coverImage: e.target.files[0] }));
    }, [])

    return (
        <Box as={'form'} mt={10}>
            <VStack spacing={3}>
                <FormControl>
                    <FormLabel>Name</FormLabel>
                    <InputGroup>
                        <Input
                            onChange={e => handleChangeAttribute("name", e)}
                            value={artistForm.name}
                        />
                    </InputGroup>
                </FormControl>
                <FormControl>
                    <FormLabel>Description</FormLabel>
                    <InputGroup>
                        <Textarea
                            maxLength={2000}
                            onChange={e => handleChangeAttribute("description", e)}
                            value={artistForm.description}
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
                    {
                        artistForm.cover && <Image width={"150px"} src={resolveLink(artistForm.cover)} mt={2} />
                    }
                </FormControl>
            </VStack>
            <HStack gap={4} mt={10}>
                <Button isLoading={updateProfile.processing} colorScheme={"purple"} onClick={() => handleSave()}>Save</Button>
            </HStack>
        </Box>
    )
}