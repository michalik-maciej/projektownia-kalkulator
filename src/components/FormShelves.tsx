import { Field, FieldArray } from "formik"
import { Flex, VStack, IconButton, Select } from "@chakra-ui/react"
import { AddIcon, DeleteIcon } from "@chakra-ui/icons"
import { NumberInput } from "../NumberInput"
import { getShelfOptions } from "../utils"
import { FormShelfType } from "../types"

interface Props {
  fieldName: string
  initialShelf: FormShelfType
  shelves: FormShelfType[]
  width: string
}

export const FormShelves = ({
  fieldName,
  initialShelf,
  shelves,
  width,
}: Props) => {
  return (
    <FieldArray name={`${fieldName}`}>
      {({ push: pushShelf, remove: removeShelf }) => (
        <>
          <VStack spacing="4">
            {shelves.map((_, shelfIndex) => (
              <Flex key={shelfIndex} position="relative">
                <Field as={Select} name={`${fieldName}.${shelfIndex}.depth`}>
                  {getShelfOptions(width).map((depth) => (
                    <option key={depth} value={depth}>
                      {depth}
                    </option>
                  ))}
                </Field>
                <NumberInput
                  name={`${fieldName}.${shelfIndex}.numberOfShelves`}
                />
                <VStack
                  position="absolute"
                  spacing="1"
                  top="50%"
                  right="0"
                  transform="translate(100%, -50%)"
                >
                  <IconButton
                    icon={<DeleteIcon />}
                    borderRadius="full"
                    size="xs"
                    p="0"
                    aria-label="remove stand"
                    onClick={() => removeShelf(shelfIndex)}
                  />
                </VStack>
              </Flex>
            ))}
            <IconButton
              icon={<AddIcon />}
              borderRadius="full"
              size="xs"
              p="0"
              aria-label="add stand"
              type="button"
              onClick={() => pushShelf(initialShelf)}
            />
          </VStack>
        </>
      )}
    </FieldArray>
  )
}
