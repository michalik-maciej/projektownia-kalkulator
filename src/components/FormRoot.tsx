import { Button, IconButton, Grid, Tooltip } from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"
import { FieldArray } from "formik"
import { GridItem } from "./GridItem"
import { initialValues } from "../formInitialValues"
import { FormCollectionType } from "../types"
import { FormCollection } from "./FormCollection"

type Props = {
  collections: FormCollectionType[]
}
export const FormRoot = ({ collections }: Props) => {
  return (
    <FieldArray name="collections">
      {({ push: pushCollection, remove: removeCollection }) => (
        <>
          <Grid
            m="8"
            gap="0.5"
            templateRows="repeat(2, auto)"
            templateColumns="repeat(7, auto)"
            position="relative"
          >
            <GridItem rowSpan={2}>Ciąg</GridItem>
            <GridItem rowSpan={2}>Wysokość</GridItem>
            <GridItem rowSpan={2}>Stopa</GridItem>
            <GridItem colSpan={4}>Regał</GridItem>
            <GridItem>Ilość</GridItem>
            <GridItem>Szerokość</GridItem>
            <GridItem>Półki</GridItem>
            <GridItem>Plecy</GridItem>
            {collections.map((collection, collectionIndex) => (
              <FormCollection
                collectionIndex={collectionIndex}
                collection={collection}
                initialValues={initialValues}
                handleRemove={() => removeCollection(collectionIndex)}
              />
            ))}
            <Tooltip label="Dodaj ciąg">
              <IconButton
                icon={<AddIcon opacity="0.7" />}
                px="8"
                py="4"
                borderRadius="full"
                position="absolute"
                size="sm"
                aria-label="add collection"
                bottom="-80px"
                left="50%"
                transform="translate(-50%, -50%)"
                onClick={() => pushCollection(initialValues.collections[0])}
              />
            </Tooltip>
          </Grid>
          <Button mx="8" mt="20" type="submit">
            Submit
          </Button>
        </>
      )}
    </FieldArray>
  )
}
