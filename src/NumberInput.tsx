import { Field, FieldProps } from "formik"
import {
  NumberInput as ChakraNumberInput,
  NumberInputField,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputStepper,
} from "@chakra-ui/react"
import { toInteger } from "lodash/fp"

interface Props {
  name: string
}

export const NumberInput = ({ name }: Props) => (
  <Field name={name}>
    {({ field, form }: FieldProps) => (
      <ChakraNumberInput
        min={1}
        max={10}
        value={field.value}
        onChange={(value: string) =>
          form.setFieldValue(field.name, toInteger(value))
        }
        size="sm"
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
