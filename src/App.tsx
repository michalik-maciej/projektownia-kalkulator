import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ChakraProvider } from "@chakra-ui/react"

import { PageWrapper } from "./components/PageWrapper"
import { FormRoot } from "./components/FormRoot"

export const App = () => {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <PageWrapper>
          <Routes>
            <Route path="/order" element={<div>Rozpiska</div>} />
            <Route path="/offer" element={<div>Oferta</div>} />
            <Route path="/catalog" element={<div>Katalog elementów</div>} />
            <Route path="/*" element={<FormRoot />} />
          </Routes>
        </PageWrapper>
      </BrowserRouter>
    </ChakraProvider>
  )
}
