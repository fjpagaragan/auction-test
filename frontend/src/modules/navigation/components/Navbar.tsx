import { Avatar, Box, Button, ButtonGroup, Center, Container, Flex, HStack, IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Stack, useBreakpointValue, useColorModeValue } from "@chakra-ui/react";
import { FC } from "react";
import { FiMenu } from 'react-icons/fi'


const NavBar: FC = () => {
    const isDesktop = useBreakpointValue({ base: false, lg: true })
    return (
        <>
            <Box px={4}>
                <Flex 
                    h={16} 
                    alignItems={'center'} 
                    justifyContent={'space-between'}
                    bg={useColorModeValue('white', 'gray.800')}
                    color={useColorModeValue('gray.600', 'white')}
                    borderBottom={1}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('gray.200', 'gray.900')}
                >
                    <Box>Logo</Box>
                    <Flex alignItems={'center'}>
                        <Stack direction={'row'} spacing={7}>
                            <Menu>
                                <MenuButton
                                as={Button}
                                rounded={'full'}
                                variant={'link'}
                                cursor={'pointer'}
                                minW={0}>
                                <Avatar
                                    size={'sm'}
                                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                                />
                                </MenuButton>
                                <MenuList alignItems={'center'}>
                                <MenuItem>Deposit</MenuItem>
                                <MenuItem>Logout</MenuItem>
                                </MenuList>
                            </Menu>
                        </Stack>
                    </Flex>
                </Flex>
            </Box>
        </>
    )
}

export default NavBar;