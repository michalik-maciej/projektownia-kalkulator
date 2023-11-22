import { Field, FieldArray } from "formik"
import { Button, Radio, VStack, Td, Tr } from "@chakra-ui/react"

import {
  getFootOptions,
  getWidthOptions,
  getHeightOptions,
  variantsCollection,
  variantsBack,
} from "../utils"
import { FormStandType } from "../types"

import { FormShelves } from "./FormShelves"

interface Params {
  stands: FormStandType[]
  fieldName: string
  initialStand: FormStandType
}

export const FormStands = ({ stands, fieldName, initialStand }: Params) => {
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
                      <Td rowSpan={stands.length}>
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
                      <Td visibility="hidden" rowSpan={stands.length}>
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
                        <Button
                          position="absolute"
                          left="30%"
                          bottom="0"
                          type="button"
                          onClick={() => pushStand(initialStand)}
                        >
                          + Regał
                        </Button>
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
                      defaultValue={initialStand.numberOfStands}
                      min={1}
                      max={10}
                    />
                  </Td>
                  <Td>
                    <Field
                      name={`${fieldName}.stands.${standIndex}.foot`}
                      as="select"
                      defaultValue={getFootOptions()[1]}
                    >
                      {getFootOptions().map((depth) => (
                        <option key={depth} value={depth}>
                          {depth}
                        </option>
                      ))}
                    </Field>
                  </Td>
                  <Td>
                    <FormShelves
                      fieldName={`${fieldName}.stands.${standIndex}.shelves`}
                      initialShelf={initialStand.shelves[0]}
                      width={stand.width}
                      shelves={stand.shelves}
                    />
                  </Td>
                  <Td>
                    <Field
                      name={`${fieldName}.stands.${standIndex}.back`}
                      as="select"
                    >
                      {variantsBack.map(({ value, name }) => (
                        <option key={value} value={value}>
                          {name}
                        </option>
                      ))}
                    </Field>
                    {standIndex > 0 && (
                      <Button
                        position="absolute"
                        isDisabled={standIndex === 0}
                        type="button"
                        onClick={() => removeStand(standIndex)}
                      >
                        - Regał
                      </Button>
                    )}
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
