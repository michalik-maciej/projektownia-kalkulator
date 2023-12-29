import { ChangeEvent } from "react"
import { Field } from "formik"
import { VStack, IconButton, Select, HStack, Tooltip } from "@chakra-ui/react"
import { AddIcon, DeleteIcon } from "@chakra-ui/icons"
import { size } from "lodash/fp"

import { useFormOptions } from "../hooks/useFormOptions"
import { getCollectionStandsSize } from "../utils"
import {
  FormSubCollectionType,
  FormStandType,
  FormCollectionType,
  HandleLockedChange,
} from "../types"

import { GridItem } from "./GridItem"
import { NumberInput } from "./NumberInput"
import { FormShelves } from "./FormShelves"
import { useCalculatePrice } from "../hooks/useCalculatePrice"

interface Props {
  collection: FormCollectionType
  collectionIndex: number
  fieldName: string
  handleAdd: () => void
  handleRemove: (index: number) => void
  handleLockedChange: HandleLockedChange
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
  handleLockedChange,
  initialStand,
  standIndex,
  subCollection,
  subCollectionIndex,
}: Props) => {
  const { backOptions, widthOptions } = useFormOptions()
  const collectionPrice = useCalculatePrice([collection])

  return (
    <>
      <GridItem
        collectionIndex={collectionIndex}
        colStart={5}
        position="relative"
      >
        <VStack>
          <HStack gap="4">
            {/* @ts-ignore */}
            <NumberInput
              name={`${fieldName}.numberOfStands`}
              {...(collection.isEditLocked && {
                onChange: (event: ChangeEvent<HTMLInputElement>) =>
                  handleLockedChange(
                    event,
                    `stands.${standIndex}.numberOfStands`
                  ),
              })}
            />
            <Field
              as={Select}
              name={`${fieldName}.width`}
              size="sm"
              {...(collection.isEditLocked && {
                onChange: (event: ChangeEvent<HTMLInputElement>) =>
                  handleLockedChange(event, `stands.${standIndex}.width`),
                isDisabled: subCollectionIndex > 0,
              })}
            >
              {widthOptions.map((width) => (
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
                isDisabled={
                  size(subCollection.stands) === 1 ||
                  (collection.isEditLocked && subCollectionIndex > 0)
                }
                aria-label="remove stand"
                // @ts-ignore
                onClick={handleRemove}
              />
            </Tooltip>
          </HStack>
          {size(subCollection.stands) === standIndex + 1 && (
            <Tooltip label="Dodaj regał">
              <IconButton
                aria-label="add stand"
                borderRadius="full"
                icon={<AddIcon opacity="0.7" />}
                my="2"
                onClick={handleAdd}
                px="5"
                size="xs"
                type="button"
                {...(collection.isEditLocked && {
                  isDisabled: subCollectionIndex > 0,
                })}
              />
            </Tooltip>
          )}
        </VStack>
      </GridItem>
      <GridItem collectionIndex={collectionIndex} colStart={6}>
        <FormShelves
          collection={collection}
          standIndex={standIndex}
          subCollectionIndex={subCollectionIndex}
          fieldName={`${fieldName}.shelves`}
          handleLockedChange={handleLockedChange}
          initialShelf={initialStand.shelves[0]}
          width={subCollection.stands[standIndex].width}
          shelves={subCollection.stands[standIndex].shelves}
        />
      </GridItem>
      <GridItem
        collectionIndex={collectionIndex}
        position="relative"
        colStart={7}
      >
        <Field
          name={`${fieldName}.backVariant`}
          size="sm"
          as={Select}
          {...(collection.isEditLocked && {
            onChange: (event: ChangeEvent<HTMLInputElement>) =>
              handleLockedChange(event, `stands.${standIndex}.backVariant`),
            isDisabled: subCollectionIndex > 0,
          })}
        >
          {backOptions.map(({ value, name }) => {
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
          colStart={8}
        >
          <div>{collectionPrice}</div>
        </GridItem>
      )}
    </>
  )
}
