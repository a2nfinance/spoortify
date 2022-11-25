import {
    Flex,
    Circle,
    Box,
    Image,
    Badge,
    useColorModeValue,
    Icon,
    chakra,
    Tooltip,
} from '@chakra-ui/react';
import {AiOutlineEye} from 'react-icons/ai';
import {useIPFS} from "../../hooks/useIPFS";


export default function ArtistGridItem({artist, router}) {
    const { resolveLink } = useIPFS();
    return (
        <Flex px={2} paddingBottom={2} w="full" alignItems="center" justifyContent="center">
            <Box
                bg={useColorModeValue('white', 'gray.800')}
                maxW="sm"
                borderWidth="1px"
                shadow="lg"
                position="relative">
                {/*{data.isNew && (*/}
                {/*    <Circle*/}
                {/*        size="10px"*/}
                {/*        position="absolute"*/}
                {/*        top={2}*/}
                {/*        right={2}*/}
                {/*        bg="red.200"*/}
                {/*    />*/}
                {/*)}*/}

                <Image
                    src={resolveLink(artist.cover)}
                    // alt={`Picture of ${playlist.cover}`}
                    p={4}
                />

                <Box px="4" py={3}>
                    {/*<Box display="flex" alignItems="baseline">*/}
                    {/*    {data.isNew && (*/}
                    {/*        <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">*/}
                    {/*            New*/}
                    {/*        </Badge>*/}
                    {/*    )}*/}
                    {/*</Box>*/}
                    <Flex mt="1" justifyContent="space-between" alignContent="center">
                        <Box
                            fontSize="md"
                            fontWeight="semibold"
                            as="h5"
                            lineHeight="tight">
                            {artist.name}
                        </Box>
                        <Tooltip
                            label="view"
                            bg="white"
                            placement={'top'}
                            color={'gray.800'}
                            fontSize={'1.2em'}>
                            <chakra.a href={'#'} display={'flex'}>
                                <Icon as={AiOutlineEye} h={7} w={7} alignSelf={'center'} onClick={() => router.push(`/artist/${artist._id}`)} />
                            </chakra.a>
                        </Tooltip>
                    </Flex>
                </Box>
            </Box>
        </Flex>
    );
}