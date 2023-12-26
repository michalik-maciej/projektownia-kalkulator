import { Fragment } from "react"
import { eq, get, take } from "lodash/fp"
import { Field, FieldArray } from "formik"
import { Radio, VStack, HStack, RadioGroup, Select } from "@chakra-ui/react"

import { Gondola } from "../icons/Gondola"
import { Impuls } from "../icons/Impuls"
import { Przyscienny } from "../icons/Przyscienny"

import {
  getCollectionStandsSize,
  getHeightOptions,
  variantsCollection,
} from "../utils"
import { FormCollectionType } from "../types"

import { GridItem } from "./GridItem"
import { FormSubCollection } from "./FormSubCollection"
import { NumberInput } from "./NumberInput"
import { CollectionControlMenu } from "./CollectionControlMenu"

interface Props {
  collectionIndex: number
  collection: FormCollectionType
  initialValues: { collections: FormCollectionType[] }
  handleAdd: (index: number, value: FormCollectionType) => void
  handleRemove: (index: number) => void
}

export const FormCollection = ({
  collectionIndex,
  collection,
  handleAdd,
  handleRemove,
  initialValues,
}: Props) => {
  const fieldName = `collections.${collectionIndex}`

  return (
    <Fragment key={collectionIndex}>
      <GridItem
        alignItems="flex-start"
        collectionIndex={collectionIndex}
        colStart={1}
        rowSpan={getCollectionStandsSize(collection)}
      >
        <CollectionControlMenu
          collectionIndex={collectionIndex}
          fieldName={fieldName}
          handleAdd={handleAdd}
          handleRemove={handleRemove}
        />
        <VStack gap="6" m="2">
          <VStack
            as={RadioGroup}
            gap="6"
            value={collection.variant}
            alignItems="flex-end"
          >
            {variantsCollection.map((variant) => (
              <label key={variant}>
                <HStack>
                  {get(variant, {
                    P: <Przyscienny />,
                    G: <Gondola />,
                    I: <Impuls />,
                  })}
                  <Field
                    as={Radio}
                    key={variant}
                    name={`${fieldName}.variant`}
                    value={variant}
                    isDisabled={variant === "I"}
                  />
                </HStack>
              </label>
            ))}
          </VStack>
          <HStack gap="4">
            <NumberInput name={`${fieldName}.numberOfCollections`} />
          </HStack>
        </VStack>
      </GridItem>
      <GridItem
        collectionIndex={collectionIndex}
        rowSpan={getCollectionStandsSize(collection)}
      >
        <Field name={`${fieldName}.height`} as={Select} size="sm">
          {getHeightOptions().map((height) => (
            <option key={height} value={height}>
              {height}
            </option>
          ))}
        </Field>
      </GridItem>
      <FieldArray name={`${fieldName}.subCollections`}>
        {() => {
          const subCollections = eq("P", collection.variant)
            ? take(1, collection.subCollections)
            : collection.subCollections

          return (
            <>
              {subCollections.map((subCollection, subCollectionIndex) => (
                <FormSubCollection
                  collection={collection}
                  collectionIndex={collectionIndex}
                  fieldName={`${fieldName}.subCollections.${subCollectionIndex}`}
                  initialStand={
                    initialValues.collections[0].subCollections[0].stands[0]
                  }
                  subCollection={subCollection}
                  subCollectionIndex={subCollectionIndex}
                />
              ))}
            </>
          )
        }}
      </FieldArray>
      <GridItem py="2" colStart={1} colSpan={7} visibility="hidden" />
    </Fragment>
  )
}
