import {Container, Heading, Stack, Text} from "@chakra-ui/react";
import ProfileForm from "../../components/artist/ProfileForm";
import {useAppDispatch, useAppSelector} from "../../controller/hooks";
import {useEffect} from "react";
import {setArtistFormByCurrentArtist, setCoverImage} from "../../controller/reducer/artistSlice";
import {getMyProfileThunk} from "../../controller/thunk/getMyProfileThunk";

export default function Profile() {
    const dispatch = useAppDispatch();
    const {updateProfile} = useAppSelector(state => state.process)
    async function fetchData() {
        await dispatch(getMyProfileThunk());
        dispatch(setArtistFormByCurrentArtist({}));
        dispatch(setCoverImage({coverImage: null}));
    }
    useEffect(() => {
        fetchData();
    }, [updateProfile.processing])
    return (
        <Container maxW={"full"}>
            <Stack spacing={4}>
                <Heading
                    lineHeight={1.1}
                    fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
                    My Profile
                </Heading>
                <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
                    Your profile information will be shown to users.
                </Text>
            </Stack>
            <ProfileForm />

        </Container>
    )
}