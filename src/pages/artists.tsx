import {Box} from "@chakra-ui/react";
import {useAppDispatch, useAppSelector} from "../controller/hooks";
import {useEffect} from "react";
import {getAllArtistThunk} from "../controller/thunk/getAllArtistThunk";
import ArtistsGrid from "../components/artist/ArtistsGrid";

export default function Artists() {
    const dispatch = useAppDispatch();
    const {allArtists} = useAppSelector(state => state.artist)
    useEffect(() => {
        dispatch(getAllArtistThunk());
    }, [])
    return (
        <Box maxW={"full"}>
            <ArtistsGrid artists={allArtists}/>
        </Box>
    )
}