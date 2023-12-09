import { Fragment } from "react"
import { Field } from "formik"
import {
  Radio,
  VStack,
  IconButton,
  Select,
  Image,
  HStack,
  Tooltip,
  Checkbox,
} from "@chakra-ui/react"
import { DeleteIcon } from "@chakra-ui/icons"
import { GridItem } from "./GridItem"

import { getFootOptions, getHeightOptions, variantsCollection } from "../utils"
import { FormCollectionType } from "../types"
import Gondola from "../assets/gondola.svg"
import Przyscienny from "../assets/przyscienny.svg"

import { FormStands } from "./FormStands"
import { NumberInput } from "./NumberInput"

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

  return (
    <Fragment key={collectionIndex}>
      <GridItem
        rowSpan={collection.stands.length}
        collectionIndex={collectionIndex}
      >
        <Field
          as={Checkbox}
          position="absolute"
          size="lg"
          top="2px"
          left="-40px"
          name={`${fieldName}.isCollapsed`}
        />
        <VStack gap="6">
          <HStack gap="6">
            {variantsCollection.map((variant) => (
              <label key={variant}>
                <HStack gap="1">
                  <Image
                    src={variant === "G" ? Gondola : Przyscienny}
                    width="20px"
                  />
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
            <NumberInput name={`${fieldName}.numberOfCollections`} />
            <Tooltip label="Usuń ciąg">
              <IconButton
                icon={<DeleteIcon opacity="0.7" />}
                borderRadius="full"
                size="sm"
                aria-label="remove collection"
                // @ts-ignore
                onClick={handleRemove}
              />
            </Tooltip>
          </HStack>
        </VStack>
      </GridItem>
      <GridItem
        collectionIndex={collectionIndex}
        rowSpan={collection.stands.length}
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
        rowSpan={collection.stands.length}
      >
        <Field name={`${fieldName}.depth`} as={Select}>
          {getFootOptions().map((depth) => (
            <option key={depth} value={depth}>
              {depth}
            </option>
          ))}
        </Field>
      </GridItem>
      <FormStands
        stands={collection.stands}
        collectionIndex={collectionIndex}
        initialStand={initialValues.collections[0].stands[0]}
      />
    </Fragment>
  )
}
