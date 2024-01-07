import { useState } from "react"
import { Field } from "formik"
import { Input, Tr, Td, IconButton, VStack, Tooltip } from "@chakra-ui/react"
import { AddIcon, CheckIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons"

import { ProductItem } from "../types"

interface Props {
  item: Partial<ProductItem>
  itemIndex: number
  categoryName: string
  insertItem: () => void
  removeItem: () => void
}

export const FormProduct = ({
  item,
  itemIndex,
  categoryName,
  insertItem,
  removeItem,
}: Props) => {
  const [editMode, setEditMode] = useState(true)

  const fieldProps = {
    isDisabled: !editMode,
    as: Input,
    w: "100px",
    type: "text",
  }

  const handleEditMode = () => {
    if (editMode) {
    }
    setEditMode((prev) => !prev)
  }

  const CustomField = ({ property }) => {
    return (
      <Td>
        {categoryName === "other" || property in item ? (
          <Field
            name={`${categoryName}.items.${itemIndex}.${property}`}
            {...fieldProps}
          />
        ) : (
          "-"
        )}
      </Td>
    )
  }

  return (
    <Tr key={itemIndex} role="group" position="relative">
      {categoryName === "other" && <CustomField property="category" />}
      <CustomField property="w" />
      <CustomField property="h" />
      <CustomField property="d" />
      <Td position="relative">
        <Field
          {...fieldProps}
          type="number"
          step="0.01"
          name={`${categoryName}.items.${itemIndex}.price`}
        />
        <VStack
          _groupHover={{ opacity: 1 }}
          opacity={0}
          transition="opacity 0.3s"
          right="0"
          top="50%"
          transform="translate(50%,-50%)"
          position="absolute"
        >
          <Tooltip label={editMode ? "zatwierdź zmiany" : "edytuj element"}>
            <IconButton
              display="none"
              aria-label="edit item"
              icon={editMode ? <CheckIcon /> : <EditIcon />}
              borderRadius="full"
              size="xs"
              onClick={handleEditMode}
            />
          </Tooltip>
          <Tooltip label="duplikuj element">
            <IconButton
              aria-label="duplicate item"
              icon={<AddIcon opacity="0.7" />}
              borderRadius="full"
              size="xs"
              onClick={insertItem}
            />
          </Tooltip>
          <Tooltip label="usuń element">
            <IconButton
              aria-label="remove item"
              icon={<DeleteIcon opacity="0.7" />}
              borderRadius="full"
              size="xs"
              onClick={removeItem}
            />
          </Tooltip>
        </VStack>
      </Td>
    </Tr>
  )
}
