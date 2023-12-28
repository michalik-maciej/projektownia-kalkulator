import { BrowserRouter } from "react-router-dom"
import { ChakraProvider } from "@chakra-ui/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { theme } from "./theme"
import { PageWrapper } from "./components/PageWrapper"
import { Router } from "./components/Router"

export const App = () => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <PageWrapper>
            <Router />
          </PageWrapper>
        </BrowserRouter>
      </ChakraProvider>
    </QueryClientProvider>
  )
}
