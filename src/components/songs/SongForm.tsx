import {
    Box,
    Button,
    FormControl,
    FormLabel,
    HStack,
    Input,
    InputGroup,
    InputLeftElement,
    VStack,
    Icon, Select
} from "@chakra-ui/react";
import {useAppDispatch, useAppSelector} from "../../controller/hooks";
import {useCallback, useEffect} from "react";
import {setCoverImage, updateFormAttribute, setSong} from "../../controller/reducer/songSlice";
import {FiFile} from "react-icons/fi";
import {getMyPlaylistThunk} from "../../controller/thunk/getMyPlaylistThunk";
import {createSongThunk} from "../../controller/thunk/createSongThunk";

export default function SongForm() {
    const dispatch = useAppDispatch();
    const {myPlaylists} = useAppSelector(state => state.playlist);
    const {songForm} = useAppSelector(state => state.song);
    const handleSave = useCallback(() => {
        dispatch(createSongThunk());
    }, [])

    const handleChangeAttribute = useCallback((att: string, e: any) => {
        dispatch(updateFormAttribute({att: att, value: e.target.value }));
    }, [])

    const handleChangeCover = useCallback((e: any) => {
        dispatch(setCoverImage({coverImage: e.target.files[0] }));
    }, [])
    const handleChangeSongFile = useCallback((e: any) => {
        dispatch(setSong({songFile: e.target.files[0] }));
    }, [])

    useEffect(() => {
        dispatch(getMyPlaylistThunk());
    }, []);
    return (
        <Box as={'form'} mt={10}>
            <VStack spacing={3}>
                <FormControl>
                    <FormLabel>Name</FormLabel>
                    <InputGroup>
                        <Input
                            onChange={e => handleChangeAttribute("name", e)}
                            value={songForm.name}
                        />
                    </InputGroup>
                </FormControl>
                <FormControl>
                    <FormLabel>Description</FormLabel>
                    <InputGroup>
                        <Input
                            onChange={e => handleChangeAttribute("description", e)}
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
                </FormControl>
                <FormControl>
                    <FormLabel>Playlist</FormLabel>
                    <InputGroup>
                        <Select placeholder='Select option' onChange={e => handleChangeAttribute("playlistId", e)}>
                            {
                                myPlaylists.map(playlist => {
                                    return <option key={playlist._id} value={playlist._id}>{playlist.name}</option>
                                })
                            }
                        </Select>
                    </InputGroup>
                </FormControl>
            </VStack>
            <HStack gap={4} mt={10}>
                <Button isLoading={false} colorScheme={"purple"} onClick={() => handleSave()}>Save</Button>
            </HStack>
        </Box>
    )
}