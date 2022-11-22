import {Container, Heading, Stack, Text} from "@chakra-ui/react";
import ProfileForm from "../../components/artist/ProfileForm";

export default function CreatePlaylist() {

    return (
        <Container maxW={"full"}>
            <Stack spacing={4}>
                <Heading
                    lineHeight={1.1}
                    fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
                    Update your profile
                </Heading>
                <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
                    Your profile information will be shown to customer.
                </Text>
            </Stack>
            <ProfileForm />

        </Container>
    )
}