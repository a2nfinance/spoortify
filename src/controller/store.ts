import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import accountReducer from "src/controller/reducer/accountSlice";
import networkReducer from "src/controller/reducer/networkSlice";
import playlistReducer from "src/controller/reducer/playlistSlice";
import songReducer from "src/controller/reducer/songSlice";
import artistReducer from "src/controller/reducer/artistSlice";

const persistConfig = {
    key: 'network',
    storage,
}
const network = persistReducer(persistConfig, networkReducer)
export function makeStore() {
    return configureStore({
        reducer: {
            account: accountReducer,
            network: network,
            playlist: playlistReducer,
            song: songReducer,
            artist: artistReducer
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false,
            }),
    })
}

export const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action<string>
    >

export const persistor  = persistStore(store)