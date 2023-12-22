import { Fragment } from "react"
import { eq, take } from "lodash/fp"
import { Field, FieldArray, FieldProps } from "formik"
import {
  Radio,
  VStack,
  HStack,
  RadioGroup,
  Switch,
  Tooltip,
} from "@chakra-ui/react"

import { Gondola } from "../icons/Gondola"
import { Przyscienny } from "../icons/Przyscienny"

import { getCollectionStandsSize, variantsCollection } from "../utils"
import { FormCollectionType } from "../types"

import { GridItem } from "./GridItem"
import { FormSubCollection } from "./FormSubCollection"
import { NumberInput } from "./NumberInput"
import { BaseCoverInput } from "./BaseCoverInput"
import { CollectionControlMenu } from "./CollectionControlMenu"

interface Props {
  collectionIndex: number
  collection: FormCollectionType
  initialValues: { collections: FormCollectionType[] }
  handleRemove: (index: number) => void
}

export const FormCollection = ({
  collectionIndex,
  collection,
  handleRemove,
  initialValues,
}: Props) => {
  const fieldName = `collections.${collectionIndex}`

  return (
    <Fragment key={collectionIndex}>
      <GridItem
        colStart={1}
        rowSpan={getCollectionStandsSize(collection)}
        collectionIndex={collectionIndex}
      >
        <CollectionControlMenu
          collectionIndex={collectionIndex}
          fieldName={fieldName}
          handleRemove={handleRemove}
        />
        {collection.variant === "G" && (
          <Tooltip label="Rozne strony">
            <Switch size="sm" display="none" />
          </Tooltip>
        )}
        <VStack gap="6">
          <HStack as={RadioGroup} defaultValue="P" gap="6">
            {variantsCollection.map((variant) => (
              <label key={variant}>
                <HStack gap="1">
                  {variant === "G" ? <Gondola /> : <Przyscienny />}
                  <Field
                    as={Radio}
                    key={variant}
                    name={`${fieldName}.variant`}
                    value={variant}
                  />
                </HStack>
              </label>
            ))}
          </HStack>
          <HStack gap="4">
            <Field name={`${fieldName}.hasBaseCover`}>
              {(field: FieldProps) => <BaseCoverInput {...field} />}
            </Field>
            <NumberInput name={`${fieldName}.numberOfCollections`} />
          </HStack>
        </VStack>
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
