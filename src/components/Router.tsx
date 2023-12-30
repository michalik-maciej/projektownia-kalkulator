import { Route, Routes } from "react-router-dom"
import { Formik, Form } from "formik"

import { useFormInitialValues } from "../hooks/useFormInitialValues"

import { FormRoot } from "./FormRoot"
import { FormProducts } from "./FormProducts"
import { Order } from "./Order"

export const Router = () => {
  const { initialValues, isLoading } = useFormInitialValues()

  if (isLoading) {
    return null
  }

  return (
    <>
      <Routes>
        <Route path="/catalog" element={<FormProducts />} />
      </Routes>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => console.log(values)}
      >
        <Form>
          <Routes>
            <Route path="/order" element={<Order />} />
            <Route path="/form" element={<FormRoot />} />
          </Routes>
        </Form>
      </Formik>
    </>
  )
}
