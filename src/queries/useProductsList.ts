import { useQuery } from "@tanstack/react-query"

import { getProductsList } from "../api/getProductsList"

export const useProductsList = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProductsList,
  })
}
