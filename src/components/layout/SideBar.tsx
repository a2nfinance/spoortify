import React, {ReactNode, useEffect} from 'react';
import {
    IconButton,
    Box,
    CloseButton,
    Flex,
    HStack,
    VStack,
    Icon,
    useColorModeValue,
    Link,
    Drawer,
    DrawerContent,
    Text,
    useDisclosure,
    BoxProps,
    FlexProps,
    useColorMode, Button, useBreakpointValue, InputLeftElement, Input, InputGroup, Stack,
} from '@chakra-ui/react';
import {
    FiHome,
    FiSettings,
    FiMenu,
} from 'react-icons/fi';
import {
    MdAccountBalanceWallet
} from 'react-icons/md';
import {
    RiPlayListFill
} from "react-icons/ri";

import {
    IoIosMusicalNotes
} from "react-icons/io";
import { IconType } from 'react-icons';
import { ReactText } from 'react';
import {MoonIcon, SearchIcon, SunIcon} from "@chakra-ui/icons";
import {
    HAS_ALE,
    IS_ALE,
    IS_ALE_ENABLED,
    M_SET_DAPP_ACCOUNT,
    M_SET_DAPP_CONNECT,
    M_SET_DAPP_NETWORK
} from "../../controller/reducer/networkSlice";
import {useAppDispatch, useAppSelector} from "../../controller/hooks";
import {useRouter} from "next/router";
import LatestPlaylists from "../playlist/LatestPlaylists";
import NewArtists from "../artist/NewArtists";
import {useAddress} from "../../hooks/useAddress";


interface LinkItemProps {
    name: string;
    icon: IconType;
    url?: string
}
const LinkItems: Array<LinkItemProps> = [
    { name: 'Discover', icon: FiHome, url: "/" },
    { name: 'Balance', icon: MdAccountBalanceWallet, url: "/account/balance" },
    { name: 'My Playlists', icon: RiPlayListFill, url: "/account/playlists" },
    { name: 'My Songs', icon: IoIosMusicalNotes, url: "/account/songs" },
    { name: 'My Profile', icon: FiSettings, url: "/account/profile" },
];

export default function SidebarWithHeader({
                                              children,
                                          }: {
    children: ReactNode;
}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const isAle = useAppSelector((state) => state.network.isAle);


    return (
        <Box minH="100vh" bg={useColorModeValue('gray.100', 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(2,2,112,1) 100%);')}>
            <SidebarContent
                onClose={() => onClose}
                display={{ base: 'none', md: 'block' }}
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full">
                <DrawerContent>
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <MobileNav onOpen={onOpen}  />
            <Box ml={{ base: 0, md: 60 }} p="4">
                <Stack alignItems={"initial"} direction={useBreakpointValue({base: "column", sm: "column", md: "column", lg: "column", xl: "row", "2xl": "row"})}>
                    <Box width={useBreakpointValue({base: "100%", lg: "60%", xl: "60%", "2xl": "70%"})}>
                        {children}
                    </Box>
                    <VStack width={useBreakpointValue({base: "100%", lg: "40%", xl: "40%", "2xl": "30%"})}>
                        <LatestPlaylists />
                        <NewArtists />
                    </VStack>
                </Stack>
            </Box>
        </Box>
    );
}

interface SidebarProps extends BoxProps {
    onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
    const router = useRouter();
    return (
        <Box
            transition="3s ease"
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"
            {...rest}>
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                    Logo
                </Text>
                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>
            {LinkItems.map((link) => (
                <NavItem key={link.name} icon={link.icon} url={link.url} router={router}>
                   {link.name}
                </NavItem>
            ))}
        </Box>
    );
};

interface NavItemProps extends FlexProps {
    icon: IconType;
    url: string,
    router: any,
    children: ReactText;
}
const NavItem = ({ icon, url, router, children, ...rest }: NavItemProps) => {
    return (
        <Link href="#" onClick={() => router.push(url)} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: 'cyan.400',
                    color: 'white',
                }}
                {...rest}>
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: 'white',
                        }}
                        as={icon}
                    />
                )}
                <Text fontWeight={500} letterSpacing={"1px"}>{children}</Text>
            </Flex>
        </Link>
    );
};

interface MobileProps extends FlexProps {
    onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
    const { getShortAddress } = useAddress();
    const { colorMode, toggleColorMode } = useColorMode();
    const {account, isConnected, isAle} = useAppSelector(state => state.network)
    const dispatch = useAppDispatch();
    // useEffect(() => {
    //     window.onload = function () {
    //         if (typeof window.aleereum !== "undefined") {
    //             const provider = window["aleereum"];
    //             if (provider.isAle) {
    //
    //                 dispatch(IS_ALE(true));
    //                 dispatch(M_SET_DAPP_ACCOUNT(provider.account));
    //                 dispatch(M_SET_DAPP_CONNECT(provider.isConnected));
    //                 dispatch(M_SET_DAPP_NETWORK(provider.networkId));
    //                 dispatch(IS_ALE_ENABLED(!provider.islocked));
    //             } else {
    //                 dispatch(HAS_ALE(false));
    //             }
    //         } else {
    //             dispatch(IS_ALE(false));
    //         }
    //     };
    // }, [])
    function handleNetworkChange(networkID) {
        dispatch(M_SET_DAPP_NETWORK(networkID));
    }

    function handleLockChange(status) {
        dispatch(IS_ALE_ENABLED(!status));
    }

    function handleConnectChange(status) {
        dispatch(M_SET_DAPP_CONNECT(status));
    }

    function handleAccountChange(account) {
        dispatch(M_SET_DAPP_ACCOUNT(account));
    }

    function listenDataChange() {
        window.aleereum.on("on_networkId_change", handleNetworkChange);
        window.aleereum.on("on_islocked_change", handleLockChange);
        window.aleereum.on("on_isConnected_change", handleConnectChange);
        window.aleereum.on("on_account_change", handleAccountChange);
    }
    function connect() {
        if (window["aleereum"]) {
            window["aleereum"].connect();
            listenDataChange()
        }
    }
    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 4 }}
            height="20"
            alignItems="center"
            // bg={useColorModeValue('white', 'gray.900')}
            // borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent={{ base: 'space-between', md: 'flex-end', lg: "space-between" }}
            {...rest}>
            <Flex>
                <InputGroup maxW={"300px"} display={{base: "none", lg: "flex"}}>
                    <InputLeftElement
                        pointerEvents='none'
                        children={<SearchIcon color='gray.300' />}
                    />
                    <Input type='tel' placeholder='Playlist' />
                </InputGroup>
                <IconButton
                    display={{ base: 'flex', md: 'none' }}
                    onClick={onOpen}
                    variant="outline"
                    aria-label="open menu"
                    icon={<FiMenu />}
                />

                <Text
                    display={{ base: 'flex', md: 'none' }}
                    fontSize="2xl"
                    fontFamily="monospace"
                    fontWeight="bold">
                    Logo
                </Text>
            </Flex>


            <HStack spacing={{ base: '0', md: '6' }}>
                <Button onClick={toggleColorMode} fontSize={"sm"} mr={1}>
                    {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                </Button>

                <Button
                    onClick={() => connect()}
                    display={{ base: 'inline-flex', md: 'inline-flex'}}
                    fontSize={'xs'}
                    letterSpacing={"1px"}
                    color={'gray.200'}
                    bg={'purple.400'}
                    gap={2}
                    leftIcon={isConnected ? <MdAccountBalanceWallet fontSize={"sm"} /> : <></>}
                    _hover={{
                        bg: 'purple.500',
                    }}>
                    {/*{ isConnected ? <Image src={"/networks/metamask.svg"} width={"20px"} /> : <></>}*/}
                    { isConnected ? `${getShortAddress(account)}`: "Connect Wallet" }
                </Button>

            </HStack>

        </Flex>
    );
};