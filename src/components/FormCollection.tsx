import { Fragment } from "react"
import { Field, FieldArray, FieldProps } from "formik"
import {
  Radio,
  VStack,
  IconButton,
  Select,
  HStack,
  Tooltip,
  Tag,
} from "@chakra-ui/react"
import { DeleteIcon } from "@chakra-ui/icons"
import { GridItem } from "./GridItem"

import { Gondola } from "../icons/Gondola"
import { Przyscienny } from "../icons/Przyscienny"

import {
  calculatePrice,
  getFootOptions,
  getHeightOptions,
  variantsCollection,
} from "../utils"
import { FormCollectionType } from "../types"

import { FormStand } from "./FormStand"
import { NumberInput } from "./NumberInput"
import { BaseCoverInput } from "./BaseCoverInput"
import { CollapseToggle } from "./CollapseToggle"

interface Props {
  collectionIndex: number
  collection: FormCollectionType
  initialValues: any
  handleRemove: (index: number) => void
}
export const FormCollection = ({
  collectionIndex,
  collection,
  handleRemove,
  initialValues,
}: Props) => {
  const fieldName = `collections.${collectionIndex}`
  calculatePrice([collection])

  return (
    <Fragment key={collectionIndex}>
      <GridItem
        colStart={1}
        rowSpan={collection.stands.length}
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
      <GridItem
        colStart={2}
        collectionIndex={collectionIndex}
        rowSpan={collection.stands.length}
      >
        <Field name={`${fieldName}.height`} as={Select} size="sm">
          {getHeightOptions().map((height) => (
            <option key={height} value={height}>
              {height}
            </option>
          ))}
        </Field>
      </GridItem>
      <GridItem
        colStart={3}
        collectionIndex={collectionIndex}
        rowSpan={collection.stands.length}
      >
        <Field name={`${fieldName}.depth`} as={Select} size="sm">
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
            {collection.stands.map((_, standIndex) => {
              const initialStand = initialValues.collections[0].stands[0]

              return (
                <FormStand
                  collectionIndex={collectionIndex}
                  collection={collection}
                  handleAdd={() => pushStand(initialStand)}
                  handleRemove={() => removeStand(standIndex)}
                  initialStand={initialStand}
                  standIndex={standIndex}
                />
              )
            })}
          </>
        )}
      </FieldArray>
      <GridItem py="2" colStart={1} colSpan={7} visibility="hidden" />
    </Fragment>
  )
}
