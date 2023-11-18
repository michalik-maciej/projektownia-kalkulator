import { ReactNode } from "react"
import { Link } from "react-router-dom"

import { Box, Button, HStack } from "@chakra-ui/react"

interface Props {
  children: ReactNode
}

export const PageWrapper = ({ children }: Props) => {
  return (
    <Box mt="16">
      <HStack
        position="fixed"
        zIndex={1}
        insetX="0"
        top="0"
        bg="cyan.200"
        spacing="8"
        py="4"
        px="16"
      >
        <Button as={Link} to="/form">
          Formularz
        </Button>
        <Button as={Link} to="/order">
          Rozpiska
        </Button>
        <Button as={Link} to="/offer">
          Oferta
        </Button>
        <Button as={Link} to="/catalog">
          Katalog
        </Button>
      </HStack>
      <Box mx="16" mb="32">
        {children}
      </Box>
    </Box>
  )
}
