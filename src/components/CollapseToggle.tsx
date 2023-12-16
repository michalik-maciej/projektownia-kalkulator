import { FieldProps } from "formik"
import { AbsoluteCenter, Box } from "@chakra-ui/react"
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"

export const CollapseToggle = ({ field }: FieldProps) => {
  const iconProps = {
    opacity: 0.7,
    boxSize: 5,
    fill: "#666",
    margin: "auto",
    cursor: "pointer",
  }

  return (
    <Box
      as="label"
      position="absolute"
      top="12px"
      transform="translate(-50%, -50%)"
      left="-48px"
      w="24px"
      h="24px"
      className="collapse-visible"
    >
      <AbsoluteCenter>
        {field.value ? (
          <ViewIcon {...iconProps} />
        ) : (
          <ViewOffIcon {...iconProps} />
        )}
        <input
          type="checkbox"
          style={{
            inset: 0,
            visibility: "hidden",
            position: "absolute",
          }}
          {...field}
        />
      </AbsoluteCenter>
    </Box>
  )
}
