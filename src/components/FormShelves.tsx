import { Field, FieldArray } from "formik"
import { Button } from "@chakra-ui/react"

import { getShelfOptions } from "../utils"

export const FormShelves = ({ fieldName, stand: { shelves } }: any) => {
  return (
    <FieldArray name={fieldName}>
      {({ push: pushShelf, remove: removeShelf }) => (
        <>
          {shelves.map((shelf: any, shelfIndex: number) => (
            <div key={shelfIndex}>
              <Field name={`${fieldName}.shelfSize`} as="select">
                {getShelfOptions(80).map((depth) => (
                  <option key={depth} value={depth}>
                    {depth}
                  </option>
                ))}
              </Field>
              <Field
                name={`${fieldName}.shelfNumber`}
                type="number"
                min={1}
                max={10}
              />
              <Button type="button" onClick={() => removeShelf(shelfIndex)}>
                Usuń półki
              </Button>
            </div>
          ))}
          <Button type="button" onClick={() => pushShelf("")}>
            Dodaj półki
          </Button>
        </>
      )}
    </FieldArray>
  )
}
