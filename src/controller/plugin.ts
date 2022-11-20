// import { store } from "./store";
// import { M_SET_DAPP_NETWORK, M_SET_DAPP_CONNECT, M_SET_DAPP_ACCOUNT, IS_ALE, HAS_ALE, IS_ALE_ENABLED } from 'src/controller/reducer/networkSlice';
//
// window.onload = function () {
//     if (typeof window.aleereum !== "undefined") {
//         const provider = window["aleereum"];
//         if (provider.isAle) {
//             store.dispatch(IS_ALE(true));
//             store.dispatch(M_SET_DAPP_ACCOUNT(provider.account));
//             store.dispatch(M_SET_DAPP_CONNECT(provider.isConnected));
//             store.dispatch(M_SET_DAPP_NETWORK(provider.networkId));
//             store.dispatch(IS_ALE_ENABLED(!provider.islocked));
//         } else {
//             store.dispatch(HAS_ALE(false));
//         }
//     } else {
//         store.dispatch(IS_ALE(false));
//     }
// };