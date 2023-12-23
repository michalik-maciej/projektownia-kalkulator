import { CollapseToggle } from "./CollapseToggle"
import { Field, FieldProps } from "formik"
import { Tooltip, Tag, IconButton } from "@chakra-ui/react"
import { AddIcon, DeleteIcon } from "@chakra-ui/icons"

import { FormCollectionType } from "../types"

interface Props {
  collectionIndex: number
  fieldName: string
  handleAdd: (index: number, value: FormCollectionType) => void
  handleRemove: (index: number) => void
}

export const CollectionControlMenu = ({
  collectionIndex,
  fieldName,
  handleAdd,
  handleRemove,
}: Props) => (
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
        <Tooltip label="Dodaj ciąg">
          <IconButton
            position="absolute"
            icon={<AddIcon opacity="0.7" />}
            borderRadius="full"
            size="xs"
            transform="translate(-50%, -50%)"
            top="120px"
            left="-48px"
            aria-label="add collection"
            // @ts-ignore
            onClick={handleAdd}
          />
        </Tooltip>
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
)
