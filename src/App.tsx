import { BrowserRouter } from "react-router-dom"
import { ChakraProvider } from "@chakra-ui/react"

import { theme } from "./theme"
import { PageWrapper } from "./components/PageWrapper"
import { Router } from "./components/Router"

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <PageWrapper>
          <Router />
        </PageWrapper>
      </BrowserRouter>
    </ChakraProvider>
  )
}
