import { Route, Routes } from "react-router-dom"
import { Formik, Form } from "formik"

import { FormRoot } from "./FormRoot"
import { Order } from "./Order"
import { initialValues } from "../formInitialValues"

export const Router = () => {
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
