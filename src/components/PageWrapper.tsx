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

  return (
    <Box pt="20" minH="100vh">
      <Flex
        position="fixed"
        zIndex={1}
        insetX="0"
        top="0"
        py="4"
        px="16"
        align="center"
        justify="space-between"
        borderBottom="2px solid black"
      >
        <HStack spacing="8">
          <Button as={Link} to="/form">
            Formularz
          </Button>
          <Button as={Link} to="/order">
            Rozpiska
          </Button>
          <Button as={Link} to="/catalog">
            Katalog
          </Button>
        </HStack>
        <Switch onChange={toggleColorMode} />
      </Flex>
      <Box mx="16" mb="32">
        {children}
      </Box>
    </Box>
  )
}
