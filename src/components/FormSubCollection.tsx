import { Field, FieldArray } from "formik"
import { Checkbox, Select } from "@chakra-ui/react"

import {
  FormCollectionType,
  FormStandType,
  FormSubCollectionType,
} from "../types"
import { getFootOptions } from "../utils"

import { GridItem } from "./GridItem"
import { FormStand } from "./FormStand"

interface Props {
  collection: FormCollectionType
  collectionIndex: number
  fieldName: string
  initialStand: FormStandType
  subCollection: FormSubCollectionType
  subCollectionIndex: number
}

export const FormSubCollection = ({
  collection,
  collectionIndex,
  fieldName,
  initialStand,
  subCollection,
  subCollectionIndex,
}: Props) => {
  return (
    <>
      <GridItem
        collectionIndex={collectionIndex}
        rowSpan={subCollection.stands.length}
      >
        <Field name={`${fieldName}.depth`} as={Select} size="sm">
          {getFootOptions().map((depth) => (
            <option key={depth} value={depth}>
              {depth}
            </option>
          ))}
        </Field>
      </GridItem>
      <GridItem
        collectionIndex={collectionIndex}
        rowSpan={subCollection.stands.length}
        colStart={4}
      >
        <Field
          name={`${fieldName}.hasBaseCover`}
          as={Checkbox}
          defaultChecked
        />
      </GridItem>
      <FieldArray name={`${fieldName}.stands`}>
        {({ push: pushStand, remove: removeStand }) => (
          <>
            {subCollection.stands.map((_, standIndex) => (
              <FormStand
                collection={collection}
                collectionIndex={collectionIndex}
                fieldName={`${fieldName}.stands.${standIndex}`}
                handleAdd={() => pushStand(initialStand)}
                handleRemove={() => removeStand(standIndex)}
                initialStand={initialStand}
                standIndex={standIndex}
                subCollection={subCollection}
                subCollectionIndex={subCollectionIndex}
              />
            ))}
          </>
        )}
      </FieldArray>
    </>
  )
}
