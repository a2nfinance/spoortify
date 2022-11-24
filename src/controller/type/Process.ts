type Status = {
    started?: boolean,
    pending?: boolean,
    processing: boolean,
    ended?: boolean
    error?: boolean
}

export type Processes = {
    deposit: Status,
    withdraw: Status,
    buy: Status,
    createSong: Status,
    createPlaylist: Status,
    updateSong: Status,
    updatePlaylist: Status,
    updateProfile: Status
}