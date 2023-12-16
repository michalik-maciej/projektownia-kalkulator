import { FieldProps } from "formik"
import { AbsoluteCenter, Box, Tooltip } from "@chakra-ui/react"
import { CloseIcon } from "@chakra-ui/icons"

import { Shield } from "../icons/Shield"

export const BaseCoverInput = ({ field }: FieldProps) => {
  return (
    <Tooltip label="Osłona dolna">
      <Box as="label" position="relative" cursor="pointer">
        <Box opacity={field.value ? 1 : 0.7}>
          <Shield />
        </Box>
        {!field.value && (
          <AbsoluteCenter>
            <CloseIcon opacity={0.4} transform="translateY(-10%)" />
          </AbsoluteCenter>
        )}
        <input
          type="checkbox"
          style={{
            inset: 0,
            visibility: "hidden",
            position: "absolute",
          }}
          {...field}
          value={field.value}
        />
      </Box>
    </Tooltip>
  )
}
