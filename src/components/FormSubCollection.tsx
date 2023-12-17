import { Field, FieldArray } from "formik"
import { Select, Tooltip, IconButton } from "@chakra-ui/react"
import { AddIcon, DeleteIcon } from "@chakra-ui/icons"
import { size } from "lodash/fp"

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
  handleAdd: () => void
  handleRemove: (index: number) => void
  initialStand: FormStandType
  subCollection: FormSubCollectionType
  subCollectionIndex: number
}

export const FormSubCollection = ({
  collection,
  collectionIndex,
  fieldName,
  handleAdd,
  handleRemove,
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
        <Tooltip
          label="Usuń regał"
          {...(size(subCollection.stands) === 1 && {
            visibility: "hidden",
          })}
        >
          <IconButton
            icon={<DeleteIcon opacity="0.7" />}
            borderRadius="full"
            size="sm"
            p="0"
            isDisabled={size(subCollection.stands) === 1}
            aria-label="remove stand"
            // @ts-ignore
            onClick={handleRemove}
          />
        </Tooltip>
        <Tooltip label="Dodaj regał">
          <IconButton
            icon={<AddIcon opacity="0.7" />}
            borderRadius="full"
            px="5"
            my="2"
            size="xs"
            aria-label="add stand"
            type="button"
            onClick={handleAdd}
          />
        </Tooltip>
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
