import { Field, FieldArray } from "formik"
import { Radio, VStack, Td, Tr, IconButton } from "@chakra-ui/react"
import { AddIcon, DeleteIcon } from "@chakra-ui/icons"
import { size } from "lodash/fp"

import {
  getFootOptions,
  getWidthOptions,
  getHeightOptions,
  variantsCollection,
  variantsBack,
} from "../utils"
import { FormStandType } from "../types"

import { FormShelves } from "./FormShelves"
import { ReactNode } from "react"

interface Params {
  children: ReactNode
  stands: FormStandType[]
  fieldName: string
  initialStand: FormStandType
}

export const FormStands = ({
  children,
  stands,
  fieldName,
  initialStand,
}: Params) => {
  return (
    <FieldArray name={`${fieldName}.stands`}>
      {({ push: pushStand, remove: removeStand }) => {
        return (
          <>
            {stands.map((stand, standIndex) => (
              <Tr key={`${fieldName}.${standIndex}`} position="relative">
                <>
                  {standIndex === 0 && (
                    <>
                      <Td position="relative" rowSpan={stands.length}>
                        {children}
                        <VStack>
                          {variantsCollection.map((variant) => (
                            <label key={variant}>
                              {variant}
                              <Field
                                as={Radio}
                                pl="2"
                                defaultChecked={variant === "P"}
                                key={variant}
                                name={`${fieldName}.variant`}
                                value={variant}
                                isDisabled={variant !== "P"}
                              />
                            </label>
                          ))}
                        </VStack>
                      </Td>
                      <Td display="none" rowSpan={stands.length}>
                        ciąg
                      </Td>
                      <Td rowSpan={stands.length}>
                        <Field name={`${fieldName}.height`} as="select">
                          {getHeightOptions().map((height) => (
                            <option key={height} value={height}>
                              {height}
                            </option>
                          ))}
                        </Field>
                      </Td>
                      <Td rowSpan={stands.length}>
                        <Field name={`${fieldName}.depth`} as="select">
                          {getFootOptions().map((depth) => (
                            <option key={depth} value={depth}>
                              {depth}
                            </option>
                          ))}
                        </Field>
                      </Td>
                    </>
                  )}
                  <Td>
                    <Field
                      name={`${fieldName}.stands.${standIndex}.width`}
                      as="select"
                    >
                      {getWidthOptions().map((width) => (
                        <option key={width} value={width}>
                          {width}
                        </option>
                      ))}
                    </Field>
                  </Td>
                  <Td>
                    <Field
                      name={`${fieldName}.stands.${standIndex}.numberOfStands`}
                      type="number"
                      min={1}
                      max={10}
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
                      name={`${fieldName}.stands.${standIndex}.back`}
                      as="select"
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
              </Tr>
            ))}
          </>
        )
      }}
    </FieldArray>
  )
}
