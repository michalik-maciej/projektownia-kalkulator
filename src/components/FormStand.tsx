import { Field } from "formik"
import { VStack, IconButton, Select, HStack, Tooltip } from "@chakra-ui/react"
import { AddIcon, DeleteIcon } from "@chakra-ui/icons"
import { size } from "lodash/fp"

import { calculatePrice, getWidthOptions, variantsBack } from "../utils"
import { FormCollectionType, FormStandType } from "../types"

import { GridItem } from "./GridItem"
import { NumberInput } from "./NumberInput"
import { FormShelves } from "./FormShelves"

interface Props {
  collection: FormCollectionType
  collectionIndex: number
  handleAdd: () => void
  handleRemove: (index: number) => void
  initialStand: FormStandType
  standIndex: number
}

export const FormStand = ({
  collection,
  collectionIndex,
  handleAdd,
  handleRemove,
  initialStand,
  standIndex,
}: Props) => {
  const fieldName = `collections.${collectionIndex}`
  return (
    <>
      <GridItem
        collectionIndex={collectionIndex}
        colStart={4}
        position="relative"
      >
        <VStack>
          <HStack gap="4">
            <NumberInput
              name={`${fieldName}.stands.${standIndex}.numberOfStands`}
            />
            <Field
              as={Select}
              name={`${fieldName}.stands.${standIndex}.width`}
              size="sm"
            >
              {getWidthOptions().map((width) => (
                <option key={width} value={width}>
                  {width}
                </option>
              ))}
            </Field>
            <Tooltip
              label="Usuń regał"
              {...(size(collection.stands) === 1 && {
                visibility: "hidden",
              })}
            >
              <IconButton
                icon={<DeleteIcon opacity="0.7" />}
                borderRadius="full"
                size="sm"
                p="0"
                isDisabled={size(collection.stands) === 1}
                aria-label="remove stand"
                // @ts-ignore
                onClick={handleRemove}
              />
            </Tooltip>
          </HStack>
          {size(collection.stands) === standIndex + 1 && (
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
          fieldName={`${fieldName}.stands.${standIndex}.shelves`}
          initialShelf={initialStand.shelves[0]}
          width={collection.stands[standIndex].width}
          shelves={collection.stands[standIndex].shelves}
        />
      </GridItem>
      <GridItem
        collectionIndex={collectionIndex}
        position="relative"
        colStart={6}
      >
        <Field
          name={`${fieldName}.stands.${standIndex}.backVariant`}
          size="sm"
          as={Select}
        >
          {variantsBack.map(({ value, name }) => (
            <option key={value} value={value}>
              {name}
            </option>
          ))}
        </Field>
      </GridItem>
      {standIndex === 0 && (
        <GridItem
          collectionIndex={collectionIndex}
          rowSpan={collection.stands.length}
          colStart={7}
        >
          <div>{calculatePrice([collection])}</div>
        </GridItem>
      )}
    </>
  )
}
