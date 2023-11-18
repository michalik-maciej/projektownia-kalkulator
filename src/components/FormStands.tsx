import { Fragment } from "react"
import { Field, FieldArray } from "formik"
import { Button, Td } from "@chakra-ui/react"

import { getFootOptions, getBackOptions, getWidthOptions } from "../utils"
import { FormShelves } from "./FormShelves"

export const FormStands = ({ collection: { stands }, fieldName }: any) => {
  return (
    <FieldArray name={fieldName}>
      {({ push: pushStand, remove: removeStand }) => (
        <>
          {stands.map((stand: any, standIndex: number) => (
            <Fragment key={standIndex}>
              <Td>
                <Field name={`${fieldName}.width`} as="select">
                  {getWidthOptions().map((width) => (
                    <option key={`width-${width}`} value={width}>
                      {width}
                    </option>
                  ))}
                </Field>
              </Td>
              <Td>
                <Field name={`${fieldName}.foot`} as="select">
                  {getFootOptions().map((depth) => (
                    <option key={depth} value={depth}>
                      {depth}
                    </option>
                  ))}
                </Field>
              </Td>
              <Td>
                <FormShelves
                  stand={stand}
                  fieldName={`${fieldName}.${standIndex}.shelves`}
                />
              </Td>
              <Td>
                <Field name={`${fieldName}.back`} as="select">
                  {getBackOptions().map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Field>
              </Td>
              <Td>
                <Button type="button" onClick={() => removeStand(standIndex)}>
                  Usuń regały
                </Button>
              </Td>
            </Fragment>
          ))}
          <Button type="button" onClick={() => pushStand({ shelves: [] })}>
            Dodaj regały
          </Button>
        </>
      )}
    </FieldArray>
  )
}
