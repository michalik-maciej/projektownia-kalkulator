import { Button, Tbody } from "@chakra-ui/react"
import { FieldArray } from "formik"

import { FormStands } from "./FormStands"
import { FormCollectionType } from "../types"
import { Fragment } from "react"

interface Props {
  collections: FormCollectionType[]
  initialCollection: FormCollectionType
}

export const FormCollections = ({ collections, initialCollection }: Props) => {
  return (
    <FieldArray name="collections">
      {({ push: pushCollection, remove: removeCollection }) => (
        <>
          <Tbody>
            {collections.map(({ stands }, collectionIndex) => (
              <Fragment key={collectionIndex}>
                <FormStands
                  fieldName={`collections.${collectionIndex}`}
                  stands={stands}
                  initialStand={initialCollection.stands[0]}
                />
                <Button
                  position="absolute"
                  transform="translate(-100%, -150%)"
                  type="button"
                  onClick={() => removeCollection(collectionIndex)}
                >
                  - Ciąg
                </Button>
              </Fragment>
            ))}
          </Tbody>
          <Button
            type="button"
            position="absolute"
            transform="translate(-100%, 50%)"
            onClick={() => pushCollection(initialCollection)}
          >
            + Ciąg
          </Button>
        </>
      )}
    </FieldArray>
  )
}
