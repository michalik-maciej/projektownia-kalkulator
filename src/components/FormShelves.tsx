import { ChangeEvent } from "react"
import { Field, FieldArray } from "formik"
import { Flex, VStack, IconButton, Select, Tooltip } from "@chakra-ui/react"
import { AddIcon, DeleteIcon } from "@chakra-ui/icons"

import { NumberInput } from "./NumberInput"
import { getShelfOptions } from "../utils"
import { FormCollectionType, FormShelfType, HandleLockedChange } from "../types"

interface Props {
  collection: FormCollectionType
  fieldName: string
  handleLockedChange: HandleLockedChange
  initialShelf: FormShelfType
  shelves: FormShelfType[]
  standIndex: number
  subCollectionIndex: number
  width: string
}

export const FormShelves = ({
  collection,
  fieldName,
  handleLockedChange,
  initialShelf,
  shelves,
  standIndex,
  subCollectionIndex,
  width,
}: Props) => {
  return (
    <FieldArray name={`${fieldName}`}>
      {({ push: pushShelf, remove: removeShelf }) => (
        <VStack>
          {shelves.map((_, shelfIndex) => (
            <Flex
              key={shelfIndex}
              position="relative"
              gap="4"
              alignItems="center"
            >
              <NumberInput
                name={`${fieldName}.${shelfIndex}.numberOfShelves`}
              />
              <Field
                as={Select}
                size="sm"
                name={`${fieldName}.${shelfIndex}.depth`}
                {...(collection.isEditLocked && {
                  onChange: (event: ChangeEvent<HTMLInputElement>) =>
                    handleLockedChange(
                      event,
                      `stands.${standIndex}.shelves.${shelfIndex}.depth`
                    ),
                  isDisabled: subCollectionIndex > 0,
                })}
              >
                {getShelfOptions(width).map((depth) => (
                  <option key={depth} value={depth}>
                    {depth}
                  </option>
                ))}
              </Field>
              <Tooltip label="Usuń półki">
                <IconButton
                  icon={<DeleteIcon opacity="0.7" />}
                  borderRadius="full"
                  size="sm"
                  aria-label="remove shelves"
                  onClick={() => removeShelf(shelfIndex)}
                  {...(collection.isEditLocked && {
                    isDisabled: subCollectionIndex > 0,
                  })}
                />
              </Tooltip>
            </Flex>
          ))}
          <Tooltip label="Dodaj półki">
            <IconButton
              icon={<AddIcon opacity="0.7" />}
              borderRadius="full"
              size="xs"
              px="5"
              my="2"
              aria-label="add shelves"
              type="button"
              onClick={() => pushShelf(initialShelf)}
              {...(collection.isEditLocked && {
                isDisabled: subCollectionIndex > 0,
              })}
            />
          </Tooltip>
        </VStack>
      )}
    </FieldArray>
  )
}
