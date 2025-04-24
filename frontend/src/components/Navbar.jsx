import { FaRegSquarePlus } from "react-icons/fa6";
import { Button, Container, Flex, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { useColorMode } from "./ui/color-mode";
import { LuMoon, LuSun } from "react-icons/lu";

const Navbar = () => {
    const {colorMode, toggleColorMode} = useColorMode()
    return (
        <Container maxW={"1140px"} px={4}>
            <Flex
                h={16}
                alignItems={"center"}
                justifyContent={"space-between"}
                flexDir={{base:"column",sm:"row"}}
            >
                <Link to={"/"}>
                    <Text
                        fontSize={{base:"22px",sm:"28px"}}
                        fontWeight={"bold"}
                        textTransform={"uppercase"}
                        textAlign={"center"}
                        bgGradient={"to-r"}
                        gradientFrom={"cyan.400"}
                        gradientTo={"blue.500"}
                        bgClip={"text"}
                    >
                        Product Store 🛒
                    </Text>
                </Link>

                <HStack alignItems={"center"} spaceX={2}>
                    <Link to={"/create"}>
                        <Button>
                           <FaRegSquarePlus/>
                        </Button>
                    </Link>
                    <Button onClick={toggleColorMode}>
                        {colorMode==="light" ? <LuMoon/> : <LuSun/>}
                    </Button>
                </HStack>

            </Flex>
        </Container>
    )
}

export default Navbar
