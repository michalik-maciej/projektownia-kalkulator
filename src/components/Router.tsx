import { Route, Routes } from "react-router-dom"
import { Formik, Form } from "formik"

import { FormRoot } from "./FormRoot"
import { Order } from "./Order"
import { Table } from "./Table"
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
            <Route path="/table" element={<Table />} />
            <Route
              path="/order"
              element={<Order collections={collections} />}
            />
            <Route path="/offer" element={<div>Oferta</div>} />
            <Route path="/catalog" element={<div>Katalog elementów</div>} />
            <Route path="/*" element={<FormRoot collections={collections} />} />
          </Routes>
        </Form>
      )}
    </Formik>
  )
}
