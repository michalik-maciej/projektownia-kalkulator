import { GridItem as ChakraGridItem, GridItemProps } from "@chakra-ui/react"

export const GridItem = (props: GridItemProps) => (
  <ChakraGridItem
    {...props}
    border="1px solid grey"
    display="flex"
    w="100%"
    h="100%"
    py="3"
    px="6"
    alignItems="center"
    justifyContent="center"
    sx={{
      "& > *": {
        m: "auto",
      },
    }}
  />
)
