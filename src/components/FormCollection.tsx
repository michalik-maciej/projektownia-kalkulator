import { Fragment } from "react"
import { Field, FieldArray, FieldProps } from "formik"
import {
  Radio,
  VStack,
  IconButton,
  HStack,
  Tooltip,
  Tag,
} from "@chakra-ui/react"
import { DeleteIcon } from "@chakra-ui/icons"

import { Gondola } from "../icons/Gondola"
import { Przyscienny } from "../icons/Przyscienny"

import { getCollectionStandsSize, variantsCollection } from "../utils"
import { FormCollectionType } from "../types"

import { GridItem } from "./GridItem"
import { FormSubCollection } from "./FormSubCollection"
import { NumberInput } from "./NumberInput"
import { BaseCoverInput } from "./BaseCoverInput"
import { CollapseToggle } from "./CollapseToggle"

interface Props {
  collectionIndex: number
  collection: FormCollectionType
  initialValues: { collections: FormCollectionType[] }
  handleRemove: (index: number) => void
}

export const FormCollection = ({
  collectionIndex,
  collection,
  handleRemove,
  initialValues,
}: Props) => {
  const fieldName = `collections.${collectionIndex}`

  return (
    <Fragment key={collectionIndex}>
      <GridItem
        colStart={1}
        rowSpan={getCollectionStandsSize(collection)}
        collectionIndex={collectionIndex}
      >
        <Field name={`${fieldName}.isCollapsed`}>
          {(field: FieldProps) => (
            <>
              <CollapseToggle {...field} />
              <Tag
                variant="outline"
                cursor="default"
                opacity="0.6"
                fontWeight="bold"
                className="collapse-visible"
                rounded="full"
                size="sm"
                position="absolute"
                px={3}
                transform="translate(-50%, -50%)"
                top={field.field.value ? "12px" : "48px"}
                transition="all 0.5s"
                left={field.field.value ? "20px" : "-48px"}
              >
                {collectionIndex + 1}
              </Tag>
              <Tooltip label="Usuń ciąg">
                <IconButton
                  position="absolute"
                  icon={<DeleteIcon opacity="0.7" />}
                  borderRadius="full"
                  size="xs"
                  transform="translate(-50%, -50%)"
                  top="84px"
                  left="-48px"
                  aria-label="remove collection"
                  // @ts-ignore
                  onClick={handleRemove}
                />
              </Tooltip>
            </>
          )}
        </Field>
        <VStack gap="6">
          <HStack gap="6">
            {variantsCollection.map((variant) => (
              <label key={variant}>
                <HStack gap="1">
                  {variant === "G" ? <Gondola /> : <Przyscienny />}
                  <Field
                    as={Radio}
                    defaultChecked={variant === "P"}
                    key={variant}
                    name={`${fieldName}.variant`}
                    value={variant}
                    isDisabled={variant !== "P"}
                  />
                </HStack>
              </label>
            ))}
          </HStack>
          <HStack gap="4">
            <Field name={`${fieldName}.hasBaseCover`}>
              {(field: FieldProps) => <BaseCoverInput {...field} />}
            </Field>
            <NumberInput name={`${fieldName}.numberOfCollections`} />
          </HStack>
        </VStack>
      </GridItem>
      <FieldArray name={`${fieldName}.subCollections`}>
        {({ push: pushSubCollection, remove: removeSubCollection }) => (
          <>
            {collection.subCollections.map(
              (subCollection, subCollectionIndex) => (
                <FormSubCollection
                  collection={collection}
                  collectionIndex={collectionIndex}
                  fieldName={`${fieldName}.subCollections.${subCollectionIndex}`}
                  handleAdd={() =>
                    pushSubCollection(
                      initialValues.collections[0].subCollections[0]
                    )
                  }
                  handleRemove={() => removeSubCollection(subCollectionIndex)}
                  initialStand={
                    initialValues.collections[0].subCollections[0].stands[0]
                  }
                  subCollection={subCollection}
                  subCollectionIndex={subCollectionIndex}
                />
              )
            )}
          </>
        )}
      </FieldArray>
      <GridItem py="2" colStart={1} colSpan={7} visibility="hidden" />
    </Fragment>
  )
}
