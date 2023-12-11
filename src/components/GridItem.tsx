import { GridItem as ChakraGridItem, GridItemProps } from "@chakra-ui/react"
import { useFormikContext } from "formik"
import { isNumber } from "lodash/fp"

interface Props extends GridItemProps {
  collectionIndex?: number
}

export const GridItem = ({ collectionIndex, ...props }: Props) => {
  const { values } = useFormikContext() as any

  const isCollapsed =
    isNumber(collectionIndex) &&
    values.collections[collectionIndex]?.isCollapsed

  return (
    <ChakraGridItem
      border="1px solid gray"
      borderColor={isCollapsed ? "rgba(128, 128, 128, 0.3)" : "gray"}
      display="flex"
      w="100%"
      overflowY="clip"
      position="relative"
      maxH={isCollapsed ? 0 : "full"}
      transition="all 0.5s"
      h="100%"
      py="3"
      px="6"
      alignItems="center"
      justifyContent="center"
      sx={{
        "& > :not(.collapse-visible)": {
          m: "auto",
          opacity: isCollapsed ? 0 : 1,
          transition: "opacity 0.5s",
        },
      }}
      {...props}
    />
  )
}
