import { ChangeEvent, Fragment } from "react"
import { has } from "lodash/fp"
import { Field, FieldArray, useFormikContext, FieldProps } from "formik"
import { Box, Checkbox, Select } from "@chakra-ui/react"

import { useFormOptions } from "../hooks/useFormOptions"
import {
  FormCollectionType,
  FormStandType,
  FormSubCollectionType,
  HandleLockedChange,
} from "../types"

import { GridItem } from "./GridItem"
import { FormStand } from "./FormStand"
import { LockClosed } from "../icons/LockClosed"
import { LockOpen } from "../icons/LockOpen"

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
  const { setFieldValue } = useFormikContext<{
    collections: FormCollectionType[]
  }>()

  const { footOptions } = useFormOptions()

  // handler used for parallel editing of all
  // sub collections in locked edit mode
  const handleLockedChange: HandleLockedChange = ({ target }, fieldName) => {
    collection.subCollections.map((_, index) =>
      setFieldValue(
        `collections.${collectionIndex}.subCollections.${index}.${fieldName}`,
        has("checked", target) ? target.checked : target.value
      )
    )
  }

  return (
    <Fragment key={subCollectionIndex}>
      <GridItem
        collectionIndex={collectionIndex}
        rowSpan={subCollection.stands.length}
      >
        {collection.variant !== "P" && subCollectionIndex === 0 && (
          <Field name={`collections.${collectionIndex}.isEditLocked`}>
            {({ field }: FieldProps) => (
              <Box
                as="label"
                position="absolute"
                left="0"
                top="0"
                m="2"
                cursor="pointer"
              >
                {field.value ? <LockClosed /> : <LockOpen />}
                <input
                  type="checkbox"
                  style={{
                    inset: 0,
                    visibility: "hidden",
                    position: "absolute",
                  }}
                  {...field}
                />
              </Box>
            )}
          </Field>
        )}
        <Field
          name={`${fieldName}.depth`}
          as={Select}
          size="sm"
          {...(collection.isEditLocked && {
            onChange: (event: ChangeEvent<HTMLInputElement>) =>
              handleLockedChange(event, "depth"),
            isDisabled: subCollectionIndex > 0,
          })}
        >
          {footOptions.map((depth) => (
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
          {...(collection.isEditLocked && {
            onChange: (event: ChangeEvent<HTMLInputElement>) =>
              handleLockedChange(event, "hasBaseCover"),
            isDisabled: subCollectionIndex > 0,
            visibility: subCollectionIndex > 0 ? "hidden" : "initial",
          })}
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
                handleLockedChange={handleLockedChange}
                initialStand={initialStand}
                standIndex={standIndex}
                subCollection={subCollection}
                subCollectionIndex={subCollectionIndex}
              />
            ))}
          </>
        )}
      </FieldArray>
    </Fragment>
  )
}
