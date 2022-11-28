import {
    Flex,
    Circle,
    Box,
    Image,
    Badge,
    useColorModeValue,
    Icon,
    chakra,
    Tooltip, AvatarBadge,
} from '@chakra-ui/react';
import { AiOutlinePlayCircle } from 'react-icons/ai';
import {useIPFS} from "../../hooks/useIPFS";


export default function PlaylistGridItem({playlist, router}) {
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
                <Box position={"relative"} p={4}>
                    <Image
                        src={resolveLink(playlist.cover)}
                        // alt={`Picture of ${playlist.cover}`}
                    />
                   <Badge colorScheme={"white"} position={"absolute"} top={4} right={4}>
                       {playlist.isPaid ? "" : "Free"}
                   </Badge>
                </Box>


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
                            {playlist.name}
                        </Box>
                        <Tooltip
                            label="play"
                            bg="white"
                            placement={'top'}
                            color={'gray.800'}
                            fontSize={'1.2em'}>
                            <chakra.a href={'#'} display={'flex'}>
                                <Icon as={AiOutlinePlayCircle} h={7} w={7} alignSelf={'center'} onClick={() => router.push(`/playlist/${playlist._id}`)} />
                            </chakra.a>
                        </Tooltip>
                    </Flex>
                </Box>
            </Box>
        </Flex>
    );
}