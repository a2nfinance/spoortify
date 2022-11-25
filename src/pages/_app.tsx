import {Box, ChakraProvider, Container} from '@chakra-ui/react'
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import {persistor, store} from "../controller/store";
import {theme} from "../theme/theme";
import { createStandaloneToast } from '@chakra-ui/toast'
import Head from 'next/head'
import SidebarWithHeader from "../components/layout/SideBar";
import 'react-h5-audio-player/lib/styles.css';
import "/public/css/audio-player.css";
const { ToastContainer } = createStandaloneToast()
function MyApp({ Component, pageProps }) {


    return (
        <ChakraProvider theme={theme}>
            <Provider store={store}>
                < //@ts-ignore
                    PersistGate loading={null} persistor={persistor}>
                    <Box>
                        <Head>
                            <title>Music Network on OORT</title>
                        </Head>
                        <Container maxW={"container.3xl"} p={0}>
                            <SidebarWithHeader>
                                        <Component {...pageProps} />
                            </SidebarWithHeader>

                            {/*<NetworkSelectionPopup />*/}
                            {/*<Footer />*/}
                        </Container>
                        <ToastContainer />

                    </Box>


                </PersistGate>
            </Provider>
        </ChakraProvider>
    )
}

export default MyApp