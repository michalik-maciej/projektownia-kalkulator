import { Route, Routes } from "react-router-dom"
import { Formik, Form } from "formik"

import { useFormInitialValues } from "../hooks/useFormInitialValues"

import { FormRoot } from "./FormRoot"
import { Order } from "./Order"

export const Router = () => {
  const { initialValues, isLoading } = useFormInitialValues()

  if (isLoading) {
    return null
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => console.log(values)}
    >
      {({ values: { collections } }) => (
        <Form>
          <Routes>
            <Route
              path="/order"
              element={<Order collections={collections} />}
            />
            <Route path="/catalog" element={<div>Katalog elementów</div>} />
            <Route path="/*" element={<FormRoot collections={collections} />} />
          </Routes>
        </Form>
      )}
    </Formik>
  )
}
