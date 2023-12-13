import { Field, FieldArray } from "formik"
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
  initialStand: FormStandType
}

export const FormStands = ({
  collection,
  collectionIndex,
  initialStand,
}: Props) => {
  const fieldName = `collections.${collectionIndex}`
  return (
    <FieldArray name={`${fieldName}.stands`}>
      {({ push: pushStand, remove: removeStand }) => {
        return (
          <>
            {collection.stands.map((stand, standIndex) => (
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
                          onClick={() => removeStand(standIndex)}
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
                          onClick={() => pushStand(initialStand)}
                        />
                      </Tooltip>
                    )}
                  </VStack>
                </GridItem>
                <GridItem collectionIndex={collectionIndex} colStart={5}>
                  <FormShelves
                    fieldName={`${fieldName}.stands.${standIndex}.shelves`}
                    initialShelf={initialStand.shelves[0]}
                    width={stand.width}
                    shelves={stand.shelves}
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
            ))}
          </>
        )
      }}
    </FieldArray>
  )
}
