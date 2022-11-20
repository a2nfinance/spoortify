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
    useColorMode, Button,
} from '@chakra-ui/react';
import {
    FiHome,
    FiTrendingUp,
    FiCompass,
    FiStar,
    FiSettings,
    FiMenu,
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import { ReactText } from 'react';
import {MoonIcon, SunIcon} from "@chakra-ui/icons";
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


interface LinkItemProps {
    name: string;
    icon: IconType;
    url?: string
}
const LinkItems: Array<LinkItemProps> = [
    { name: 'Home', icon: FiHome },
    { name: 'Trending', icon: FiTrendingUp },
    { name: 'Explore', icon: FiCompass },
    { name: 'Favourites', icon: FiStar },
    { name: 'Settings', icon: FiSettings },
    { name: 'Balance', icon: FiSettings, url: "/account/balance" },
];

export default function SidebarWithHeader({
                                              children,
                                          }: {
    children: ReactNode;
}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const isAle = useAppSelector((state) => state.network.isAle);


    return (
        <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
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
            <MobileNav onOpen={onOpen} />
            <Box ml={{ base: 0, md: 60 }} p="4">
                {children}
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
                {children}
            </Flex>
        </Link>
    );
};

interface MobileProps extends FlexProps {
    onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
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
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent={{ base: 'space-between', md: 'flex-end' }}
            {...rest}>
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

            <HStack spacing={{ base: '0', md: '6' }}>
                <Button onClick={toggleColorMode} fontSize={"sm"}>
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
                    _hover={{
                        bg: 'purple.500',
                    }}>
                    {/*{ isConnected ? <Image src={"/networks/metamask.svg"} width={"20px"} /> : <></>}*/}
                    { isConnected ? `${account}`: "Connect Wallet" }
                </Button>
                {/*<Flex alignItems={'center'}>*/}
                {/*    <Menu>*/}
                {/*        <MenuButton*/}
                {/*            py={2}*/}
                {/*            transition="all 0.3s"*/}
                {/*            _focus={{ boxShadow: 'none' }}>*/}
                {/*            <HStack>*/}
                {/*                <Avatar*/}
                {/*                    size={'sm'}*/}
                {/*                    src={*/}
                {/*                        'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'*/}
                {/*                    }*/}
                {/*                />*/}
                {/*                <VStack*/}
                {/*                    display={{ base: 'none', md: 'flex' }}*/}
                {/*                    alignItems="flex-start"*/}
                {/*                    spacing="1px"*/}
                {/*                    ml="2">*/}
                {/*                    <Text fontSize="sm">Justina Clark</Text>*/}
                {/*                    <Text fontSize="xs" color="gray.600">*/}
                {/*                        Admin*/}
                {/*                    </Text>*/}
                {/*                </VStack>*/}
                {/*                <Box display={{ base: 'none', md: 'flex' }}>*/}
                {/*                    <FiChevronDown />*/}
                {/*                </Box>*/}
                {/*            </HStack>*/}
                {/*        </MenuButton>*/}
                {/*        <MenuList*/}
                {/*            bg={useColorModeValue('white', 'gray.900')}*/}
                {/*            borderColor={useColorModeValue('gray.200', 'gray.700')}>*/}
                {/*            <MenuItem>Profile</MenuItem>*/}
                {/*            <MenuItem>Settings</MenuItem>*/}
                {/*            <MenuItem>Billing</MenuItem>*/}
                {/*            <MenuDivider />*/}
                {/*            <MenuItem>Sign out</MenuItem>*/}
                {/*        </MenuList>*/}
                {/*    </Menu>*/}
                {/*</Flex>*/}
            </HStack>
        </Flex>
    );
};