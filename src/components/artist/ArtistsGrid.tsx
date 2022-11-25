import {Box, SimpleGrid} from "@chakra-ui/react";
import ArtistGridItem from "./ArtistGridItem";
import {useRouter} from "next/router";

export default function ArtistsGrid({artists}) {
    const router = useRouter();
    return (
        <SimpleGrid columns={[2, 1, 2, 3,4]}>
            {
                artists.map(artist => {
                    return (
                        <Box key={`grid-item-${artist._id}`}>
                            <ArtistGridItem artist={artist} router={router} />
                        </Box>
                    )
                })
            }
        </SimpleGrid>
    )
}