import { FC } from 'react';
import {
    Avatar,
    Box,
    Flex,
    HStack,
    IconButton,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    VStack,
    useColorModeValue,
    useDisclosure,
 } from '@chakra-ui/react'
import { FiMenu, FiBell } from 'react-icons/fi'
import Deposit from '@deposit/components/Deposit';
  
const NavBar: FC = () => {
    const { onOpen } = useDisclosure();

    return (
      <Box as="section" pb={{ base: '12', md: '15' }}>
        <Box as="nav" bg="bg-surface" boxShadow="sm">
            <IconButton
                display={{ base: 'flex', md: 'none' }}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu />}
            />
                <HStack spacing={{ base: '0', md: '6' }} justifyContent={{ base: 'space-between', md: 'flex-end' }}>
                    <IconButton
                    size="lg"
                    variant="ghost"
                    aria-label="open menu"
                    icon={<FiBell />}
                    />
                    <Flex alignItems={'center'}>
                    <Menu>
                        <MenuButton
                        py={2}
                        transition="all 0.3s"
                        _focus={{ boxShadow: 'none' }}>
                        <HStack>
                            <Avatar
                            size={'sm'}
                            bg={'blackAlpha.500'}
                            />
                            <VStack
                            display={{ base: 'none', md: 'flex' }}
                            alignItems="flex-start"
                            spacing="1px"
                            ml="2">
                            </VStack>
                        </HStack>
                        </MenuButton>
                        <MenuList
                        bg={useColorModeValue('white', 'gray.900')}
                        borderColor={useColorModeValue('gray.200', 'gray.700')}>
                        <MenuItem>
                          <Deposit />
                        </MenuItem>
                        <MenuDivider />
                        <MenuItem>Sign out</MenuItem>
                        </MenuList>
                    </Menu>
                    </Flex>
                </HStack>
        </Box>
      </Box>
    )
  }

export default NavBar;