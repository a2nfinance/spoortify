import {useAppDispatch, useAppSelector} from "../../controller/hooks";
import {useIPFS} from "../../hooks/useIPFS";
import H5AudioPlayer from "react-h5-audio-player";
import {useCallback} from "react";
import {setAudioPlayerAttribute} from "../../controller/reducer/songSlice";

export default function AudioPlayer() {
    const dispatch = useAppDispatch();
    const {songsByPlaylist, audioPlayer} = useAppSelector(state => state.song);
    const {isPaidByUser} = useAppSelector(state => state.playlist);
    const {resolveLink} = useIPFS();
    const handleOnEnded = useCallback((audioPlayer) => {
        if (audioPlayer.current < audioPlayer.count - 1) {
            dispatch(setAudioPlayerAttribute({att: "current", value: audioPlayer.current + 1}))
        } else {
            dispatch(setAudioPlayerAttribute({att: "current", value: 0}))
        }
    }, [])
    const handleOnPrevious = useCallback(() => {
        if (audioPlayer.current > 0) {
            dispatch(setAudioPlayerAttribute({att: "current", value: audioPlayer.current - 1}))
        } else {
            dispatch(setAudioPlayerAttribute({att: "current", value: audioPlayer.count - 1}))
        }
    }, [])
    return (
        (songsByPlaylist.length > 0) && <H5AudioPlayer
            autoPlay={audioPlayer.autoPlay}
            src={isPaidByUser ? (audioPlayer.count ? resolveLink(songsByPlaylist[audioPlayer.current].songURL) : "") : ""}
            onPlay={() => dispatch(setAudioPlayerAttribute({att: "autoPlay", value: true}))}
            // other props here
            onEnded={() => handleOnEnded(audioPlayer)}
            // onClickNext={() => handleOnEnded()}
            // onClickPrevious={() => handleOnPrevious()}
        />
    )
}