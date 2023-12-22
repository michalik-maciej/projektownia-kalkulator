import { Field, FieldArray } from "formik"
import { Select } from "@chakra-ui/react"

import {
  FormCollectionType,
  FormStandType,
  FormSubCollectionType,
} from "../types"
import { getFootOptions, getHeightOptions } from "../utils"

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
        <Field name={`${fieldName}.height`} as={Select}>
          {getHeightOptions().map((height) => (
            <option key={height} value={height}>
              {height}
            </option>
          ))}
        </Field>
      </GridItem>
      <GridItem
        collectionIndex={collectionIndex}
        rowSpan={subCollection.stands.length}
      >
        <Field name={`${fieldName}.depth`} as={Select}>
          {getFootOptions().map((depth) => (
            <option key={depth} value={depth}>
              {depth}
            </option>
          ))}
        </Field>
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
