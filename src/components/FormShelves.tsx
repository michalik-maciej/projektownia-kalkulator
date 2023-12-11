import { Field, FieldArray } from "formik"
import { Flex, VStack, IconButton, Select, Tooltip } from "@chakra-ui/react"
import { AddIcon, DeleteIcon } from "@chakra-ui/icons"
import { NumberInput } from "./NumberInput"
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
            />
          </Tooltip>
        </VStack>
      )}
    </FieldArray>
  )
}
