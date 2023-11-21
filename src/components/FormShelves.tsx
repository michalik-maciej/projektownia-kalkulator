import { Field, FieldArray } from "formik"
import { Button } from "@chakra-ui/react"

import { getShelfOptions } from "../utils"
import { FormShelfType } from "../types"

interface Props {
  fieldName: string
  initialShelf: FormShelfType
  shelves: FormShelfType[]
  width: number
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
          {shelves.map((_, shelfIndex) => (
            <div key={shelfIndex}>
              <Field
                as="select"
                name={`${fieldName}.${shelfIndex}.depth`}
                defaultValue={getShelfOptions(width)[1]}
              >
                {getShelfOptions(width).map((depth) => (
                  <option key={depth} value={depth}>
                    {depth}
                  </option>
                ))}
              </Field>
              <Field
                name={`${fieldName}.${shelfIndex}.numberOfShelves`}
                type="number"
                defaultValue={initialShelf.numberOfShelves}
                min={1}
                max={10}
              />
              <Button
                position="absolute"
                type="button"
                onClick={() => removeShelf(shelfIndex)}
              >
                - Półki
              </Button>
            </div>
          ))}
          <Button
            position="absolute"
            type="button"
            onClick={() => pushShelf(initialShelf)}
          >
            + Półki
          </Button>
        </>
      )}
    </FieldArray>
  )
}
