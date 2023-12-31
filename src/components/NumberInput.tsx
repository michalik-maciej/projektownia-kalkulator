import { Field, FieldProps } from "formik"
import {
  NumberInput as ChakraNumberInput,
  NumberInputField,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputStepper,
  NumberInputProps,
} from "@chakra-ui/react"
import { toInteger } from "lodash/fp"

interface Props extends NumberInputProps {
  name: string
  isDisabled?: boolean
}

export const NumberInput = ({ name, isDisabled, ...rest }: Props) => (
  <Field name={name}>
    {({ field, form }: FieldProps) => (
      <ChakraNumberInput
        min={1}
        max={99}
        isDisabled={isDisabled}
        maxW="60px"
        value={field.value}
        onChange={(value: string) =>
          form.setFieldValue(field.name, toInteger(value))
        }
        size="sm"
        {...rest}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </ChakraNumberInput>
    )}
  </Field>
)
