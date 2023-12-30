import { ReactNode } from "react"
import { Link } from "react-router-dom"

import {
  Box,
  Button,
  Flex,
  HStack,
  Switch,
  useColorMode,
} from "@chakra-ui/react"

interface Props {
  children: ReactNode
}

export const PageWrapper = ({ children }: Props) => {
  const { toggleColorMode } = useColorMode()

  const buttonProps = {
    as: Link,
    borderRadius: "full",
  }

  return (
    <Box pt="20" minH="100vh">
      <Flex
        align="center"
        bgColor="#313334"
        borderBottom="1px solid black"
        insetX="0"
        justify="space-between"
        position="fixed"
        px="16"
        py="4"
        top="0"
        zIndex={1}
      >
        <HStack spacing="8">
          <Button {...buttonProps} to="/form">
            Formularz
          </Button>
          <Button {...buttonProps} to="/order">
            Rozpiska
          </Button>
          <Button {...buttonProps} to="/catalog">
            Katalog
          </Button>
        </HStack>
        <Switch onChange={toggleColorMode} />
      </Flex>
      <Box px="16" m="auto" maxW="1400" mb="32">
        {children}
      </Box>
    </Box>
  )
}
