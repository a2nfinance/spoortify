import {Box, SimpleGrid} from "@chakra-ui/react";
import PlaylistGridItem from "./PlaylistGridItem";
import {useRouter} from "next/router";

export default function PlaylistsGrid({playlists}) {
    const router = useRouter();
    return (
        <SimpleGrid columns={[2, 1, 2, 3,4]}>
            {
                playlists.map(playlist => {
                    return (
                        <Box key={`grid-item-${playlist._id}`}>
                            <PlaylistGridItem playlist={playlist} router={router} />
                        </Box>
                    )
                })
            }
        </SimpleGrid>
    )
}