import { CollapseToggle } from "./CollapseToggle"
import { Field, FieldProps } from "formik"
import { Tooltip, Tag, IconButton } from "@chakra-ui/react"
import { DeleteIcon } from "@chakra-ui/icons"

interface Props {
  collectionIndex: number
  fieldName: string
  handleRemove: (index: number) => void
}

export const CollectionControlMenu = ({
  collectionIndex,
  fieldName,
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
