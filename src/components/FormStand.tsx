import { Field } from "formik"
import { VStack, IconButton, Select, HStack, Tooltip } from "@chakra-ui/react"
import { AddIcon, DeleteIcon } from "@chakra-ui/icons"
import { size } from "lodash/fp"

import {
  calculatePrice,
  getCollectionStandsSize,
  getWidthOptions,
  variantsBack,
} from "../utils"
import {
  FormSubCollectionType,
  FormStandType,
  FormCollectionType,
} from "../types"

import { GridItem } from "./GridItem"
import { NumberInput } from "./NumberInput"
import { FormShelves } from "./FormShelves"

interface Props {
  collection: FormCollectionType
  collectionIndex: number
  fieldName: string
  handleAdd: () => void
  handleRemove: (index: number) => void
  initialStand: FormStandType
  standIndex: number
  subCollection: FormSubCollectionType
  subCollectionIndex: number
}

export const FormStand = ({
  collection,
  collectionIndex,
  fieldName,
  handleAdd,
  handleRemove,
  initialStand,
  standIndex,
  subCollection,
  subCollectionIndex,
}: Props) => {
  return (
    <>
      <GridItem
        collectionIndex={collectionIndex}
        colStart={4}
        position="relative"
      >
        <VStack>
          <HStack gap="4">
            <NumberInput name={`${fieldName}.numberOfStands`} />
            <Field as={Select} name={`${fieldName}.width`} size="sm">
              {getWidthOptions().map((width) => (
                <option key={width} value={width}>
                  {width}
                </option>
              ))}
            </Field>
            <Tooltip
              label="Usuń regał"
              {...(size(subCollection.stands) === 1 && {
                visibility: "hidden",
              })}
            >
              <IconButton
                icon={<DeleteIcon opacity="0.7" />}
                borderRadius="full"
                size="sm"
                p="0"
                isDisabled={size(subCollection.stands) === 1}
                aria-label="remove stand"
                // @ts-ignore
                onClick={handleRemove}
              />
            </Tooltip>
          </HStack>
          {size(subCollection.stands) === standIndex + 1 && (
            <Tooltip label="Dodaj regał">
              <IconButton
                icon={<AddIcon opacity="0.7" />}
                borderRadius="full"
                px="5"
                my="2"
                size="xs"
                aria-label="add stand"
                type="button"
                onClick={handleAdd}
              />
            </Tooltip>
          )}
        </VStack>
      </GridItem>
      <GridItem collectionIndex={collectionIndex} colStart={5}>
        <FormShelves
          fieldName={`${fieldName}.shelves`}
          initialShelf={initialStand.shelves[0]}
          width={subCollection.stands[standIndex].width}
          shelves={subCollection.stands[standIndex].shelves}
        />
      </GridItem>
      <GridItem
        collectionIndex={collectionIndex}
        position="relative"
        colStart={6}
      >
        <Field name={`${fieldName}.backVariant`} size="sm" as={Select}>
          {variantsBack.map(({ value, name }) => {
            if (collection.variant !== "P" && value === "2") {
              return null
            }

            return (
              <option key={value} value={value}>
                {name}
              </option>
            )
          })}
        </Field>
      </GridItem>
      {subCollectionIndex === 0 && standIndex === 0 && (
        <GridItem
          collectionIndex={collectionIndex}
          rowSpan={getCollectionStandsSize(collection)}
          colStart={7}
        >
          <div>{calculatePrice([collection])}</div>
        </GridItem>
      )}
    </>
  )
}
