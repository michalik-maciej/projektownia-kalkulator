import { Fragment } from "react"
import { Field, FieldArray } from "formik"

import { Button, Td, Thead, Tr, Th } from "@chakra-ui/react"

import { getFootOptions, variantsBack, getWidthOptions } from "../utils"
import { FormStandType } from "../types"

import { FormShelves } from "./FormShelves"

interface Params {
  stands: FormStandType[]
  fieldName: string
  initialStand: FormStandType
}

export const FormStands = ({ stands, fieldName, initialStand }: Params) => {
  return (
    <FieldArray name={fieldName}>
      {({ push: pushStand, remove: removeStand }) => (
        <>
          {stands.length > 0 && (
            <Thead>
              <Th>Szerokość</Th>
              <Th>Stopa</Th>
              <Th>Półki</Th>
              <Th>Plecy</Th>
            </Thead>
          )}
          {stands.map((stand: FormStandType, standIndex: number) => (
            <Tr position="relative">
              <Td>
                <Field name={`${fieldName}.${standIndex}.width`} as="select">
                  {getWidthOptions().map((width) => (
                    <option key={width} value={width}>
                      {width}
                    </option>
                  ))}
                </Field>
              </Td>
              <Td>
                <Field
                  name={`${fieldName}.foot`}
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
                  fieldName={`${fieldName}.${standIndex}.shelves`}
                  initialShelf={initialStand.shelves[0]}
                  shelves={stands[standIndex].shelves}
                  width={stand.width}
                />
              </Td>
              <Td>
                <Field name={`${fieldName}.${standIndex}.back`} as="select">
                  {variantsBack.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Field>
              </Td>
              <Button
                position="absolute"
                // isDisabled={standIndex === 0}
                type="button"
                onClick={() => removeStand(standIndex)}
              >
                Usuń regały
              </Button>
            </Tr>
          ))}
          <Button type="button" onClick={() => pushStand(initialStand)}>
            Dodaj regały
          </Button>
        </>
      )}
    </FieldArray>
  )
}
