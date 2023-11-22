import { BrowserRouter } from "react-router-dom"
import { ChakraProvider } from "@chakra-ui/react"

import { PageWrapper } from "./components/PageWrapper"
import { Router } from "./components/Router"

export const App = () => {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <PageWrapper>
          <Router />
        </PageWrapper>
      </BrowserRouter>
    </ChakraProvider>
  )
}
