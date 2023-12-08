import { Field } from "formik"
import {
  Radio,
  VStack,
  Td,
  Tr,
  IconButton,
  Select,
  Image,
  HStack,
} from "@chakra-ui/react"
import { DeleteIcon } from "@chakra-ui/icons"

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
    <Tr key={collectionIndex} position="relative">
      <Td rowSpan={collection.stands.length}>
        <IconButton
          icon={<DeleteIcon />}
          borderRadius="full"
          position="absolute"
          size="xs"
          m="1"
          aria-label="remove collection"
          bottom="0"
          left="0"
          // @ts-ignore
          onClick={handleRemove}
        />
        <VStack>
          {variantsCollection.map((variant) => (
            <label key={variant}>
              <HStack>
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
          <NumberInput isDisabled name={`${fieldName}.numberOfCollections`} />
        </VStack>
      </Td>
      <Td display="none" rowSpan={collection.stands.length}>
        ciąg
      </Td>
      <Td rowSpan={collection.stands.length}>
        <Field name={`${fieldName}.height`} as={Select}>
          {getHeightOptions().map((height) => (
            <option key={height} value={height}>
              {height}
            </option>
          ))}
        </Field>
      </Td>
      <Td rowSpan={collection.stands.length}>
        <Field name={`${fieldName}.depth`} as={Select}>
          {getFootOptions().map((depth) => (
            <option key={depth} value={depth}>
              {depth}
            </option>
          ))}
        </Field>
      </Td>
      <FormStands
        stands={collection.stands}
        collectionIndex={collectionIndex}
        initialStand={initialValues.collections[0].stands[0]}
      />
    </Tr>
  )
}
