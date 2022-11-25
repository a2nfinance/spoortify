import {Container, Heading, Stack, Text} from "@chakra-ui/react";
import PlaylistForm from "../../components/playlist/PlaylistForm";

export default function CreatePlaylist() {

    return (
        <Container maxW={"full"}>
            <Stack spacing={4}>
                <Heading
                    lineHeight={1.1}
                    fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
                    Create new playlist
                </Heading>
                <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
                    If you enable the option "is paid playlist?", users need payment to listen to your playlist.
                </Text>
            </Stack>
            <PlaylistForm />
        </Container>
    )
}