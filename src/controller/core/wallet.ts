import {IS_ALE_ENABLED, M_SET_DAPP_ACCOUNT, M_SET_DAPP_CONNECT, M_SET_DAPP_NETWORK} from "../reducer/networkSlice";
import { store } from "src/controller/store";
function handleNetworkChange(networkID) {
    store.dispatch(M_SET_DAPP_NETWORK(networkID));
}

function handleLockChange(status) {
    store.dispatch(IS_ALE_ENABLED(!status));
}

function handleConnectChange(status) {
    store.dispatch(M_SET_DAPP_CONNECT(status));
}

function handleAccountChange(account) {
    store.dispatch(M_SET_DAPP_ACCOUNT(account));
}
function listenDataChange() {
    window.aleereum.on("on_networkId_change", handleNetworkChange);
    window.aleereum.on("on_islocked_change", handleLockChange);
    window.aleereum.on("on_isConnected_change", handleConnectChange);
    window.aleereum.on("on_account_change", handleAccountChange);
}
export const connect = async () => {
    if (window["aleereum"]) {
        await window["aleereum"].connect();
        // listenDataChange()
    }
}