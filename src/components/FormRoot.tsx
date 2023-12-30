import { AbsoluteCenter, Spinner, Button, Grid, Text } from "@chakra-ui/react"
import { FieldArray, useFormikContext } from "formik"

import { useFormInitialValues } from "../hooks/useFormInitialValues"
import { FormCollectionType } from "../types"

import { GridItem } from "./GridItem"
import { FormCollection } from "./FormCollection"
import { useCalculatePrice } from "../hooks/useCalculatePrice"

export const FormRoot = () => {
  const { initialValues, isLoading } = useFormInitialValues()
  const {
    values: { collections },
  } = useFormikContext<{ collections: FormCollectionType[] }>()
  const totalPrice = useCalculatePrice(collections)

  if (isLoading) {
    return (
      <AbsoluteCenter>
        <Spinner />
      </AbsoluteCenter>
    )
  }

  return (
    <FieldArray name="collections">
      {({ remove: removeCollection, insert: insertCollection }) => (
        <>
          <Grid
            m="8"
            gap="0.5"
            templateRows="repeat(2, auto)"
            templateColumns="repeat(8, auto)"
            position="relative"
          >
            <GridItem rowSpan={2}>Ciąg</GridItem>
            <GridItem rowSpan={2}>Wysokość</GridItem>
            <GridItem rowSpan={2}>Stopa</GridItem>
            <GridItem rowSpan={2}>Osłona</GridItem>
            <GridItem colStart={5} colSpan={3}>
              Regał
            </GridItem>
            <GridItem colStart={5}>Ilość / Szerokość</GridItem>
            <GridItem colStart={6}>Półki</GridItem>
            <GridItem colStart={7}>Plecy</GridItem>
            <GridItem rowStart={1} colStart={8}>
              Cena (zł)
            </GridItem>
            <GridItem colStart={8}>
              <Text fontWeight="bold">{totalPrice}</Text>
            </GridItem>
            {collections.map((collection, collectionIndex) => (
              <FormCollection
                collectionIndex={collectionIndex}
                collection={collection}
                initialValues={initialValues}
                handleAdd={() => insertCollection(collectionIndex, collection)}
                handleRemove={() => removeCollection(collectionIndex)}
              />
            ))}
          </Grid>
          <Button mx="8" mt="20" type="submit">
            Submit
          </Button>
        </>
      )}
    </FieldArray>
  )
}
