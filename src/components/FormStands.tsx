import { Field, FieldArray } from "formik"
import { VStack, IconButton, Select, HStack, Tooltip } from "@chakra-ui/react"
import { AddIcon, DeleteIcon } from "@chakra-ui/icons"
import { size } from "lodash/fp"

import { getWidthOptions, variantsBack } from "../utils"
import { FormStandType } from "../types"

import { GridItem } from "./GridItem"
import { NumberInput } from "./NumberInput"
import { FormShelves } from "./FormShelves"

interface Props {
  collectionIndex: number
  stands: FormStandType[]
  initialStand: FormStandType
}

export const FormStands = ({
  stands,
  collectionIndex,
  initialStand,
}: Props) => {
  const fieldName = `collections.${collectionIndex}`
  return (
    <FieldArray name={`${fieldName}.stands`}>
      {({ push: pushStand, remove: removeStand }) => {
        return (
          <>
            {stands.map((stand, standIndex) => (
              <>
                <GridItem>
                  <Field
                    name={`${fieldName}.stands.${standIndex}.width`}
                    as={Select}
                  >
                    {getWidthOptions().map((width) => (
                      <option key={width} value={width}>
                        {width}
                      </option>
                    ))}
                  </Field>
                </GridItem>
                <GridItem position="relative">
                  <VStack>
                    <HStack gap="4">
                      <NumberInput
                        name={`${fieldName}.stands.${standIndex}.numberOfStands`}
                      />
                      <Tooltip
                        label="Usuń regał"
                        {...(size(stands) === 1 && { visibility: "hidden" })}
                      >
                        <IconButton
                          icon={<DeleteIcon opacity="0.7" />}
                          borderRadius="full"
                          size="sm"
                          p="0"
                          isDisabled={size(stands) === 1}
                          aria-label="remove stand"
                          onClick={() => removeStand(standIndex)}
                        />
                      </Tooltip>
                    </HStack>
                    {size(stands) === standIndex + 1 && (
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
                <GridItem>
                  <FormShelves
                    fieldName={`${fieldName}.stands.${standIndex}.shelves`}
                    initialShelf={initialStand.shelves[0]}
                    width={stand.width}
                    shelves={stand.shelves}
                  />
                </GridItem>
                <GridItem position="relative">
                  <Field
                    name={`${fieldName}.stands.${standIndex}.backVariant`}
                    as={Select}
                  >
                    {variantsBack.map(({ value, name }) => (
                      <option
                        key={value}
                        value={value}
                        disabled={value === "euro"}
                      >
                        {name}
                      </option>
                    ))}
                  </Field>
                </GridItem>
              </>
            ))}
          </>
        )
      }}
    </FieldArray>
  )
}
