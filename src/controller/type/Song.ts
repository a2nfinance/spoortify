export type SongForm = {
    _id?: string,
    userAddress: string,
    name: string,
    description?: string,
    cover: string,
    songURL: string,
    playlistId: string,
    status: number
}