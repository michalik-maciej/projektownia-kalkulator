import { Field, FieldArray } from "formik"
import { VStack, Td, Tr, IconButton, Select } from "@chakra-ui/react"
import { AddIcon, DeleteIcon } from "@chakra-ui/icons"
import { size } from "lodash/fp"

import { NumberInput } from "./NumberInput"
import { getWidthOptions, variantsBack } from "../utils"
import { FormStandType } from "../types"

import { FormShelves } from "./FormShelves"
import { Fragment } from "react"

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
            {stands.map((stand, standIndex) => {
              const StandForm = () => (
                <>
                  <Td position="relative">
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
                  </Td>
                  <Td>
                    <NumberInput
                      name={`${fieldName}.stands.${standIndex}.numberOfStands`}
                    />
                  </Td>
                  <Td>
                    <FormShelves
                      fieldName={`${fieldName}.stands.${standIndex}.shelves`}
                      initialShelf={initialStand.shelves[0]}
                      width={stand.width}
                      shelves={stand.shelves}
                    />
                  </Td>
                  <Td position="relative">
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
                    <VStack
                      position="absolute"
                      spacing="1"
                      top="50%"
                      right="-4px"
                      transform="translate(100%, -50%)"
                    >
                      {size(stands) > 1 && (
                        <IconButton
                          icon={<DeleteIcon />}
                          borderRadius="full"
                          size="xs"
                          p="0"
                          aria-label="remove stand"
                          onClick={() => removeStand(standIndex)}
                        />
                      )}
                      {size(stands) === standIndex + 1 && (
                        <IconButton
                          icon={<AddIcon />}
                          borderRadius="full"
                          size="xs"
                          p="0"
                          aria-label="add stand"
                          type="button"
                          onClick={() => pushStand(initialStand)}
                        />
                      )}
                    </VStack>
                  </Td>
                </>
              )
              return (
                <Fragment key={`${fieldName}.${standIndex}`}>
                  {standIndex === 0 ? (
                    <StandForm />
                  ) : (
                    <Tr>
                      <StandForm />
                    </Tr>
                  )}
                </Fragment>
              )
            })}
          </>
        )
      }}
    </FieldArray>
  )
}
