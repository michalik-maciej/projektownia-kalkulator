import { ChangeEvent } from "react"

export type ProductItem = {
  category?: string
  price: number
  d: string
  h: string
  w: string
}

export type ProductCategory<T> = {
  label: string
  items: T[]
}

export type Products = {
  backs: ProductCategory<Omit<ProductItem, "d">>
  baseCovers: ProductCategory<Omit<ProductItem, "d" | "h">>
  feet: ProductCategory<Omit<ProductItem, "h" | "w">>
  profiles: ProductCategory<ProductItem>
  shelves: ProductCategory<Omit<ProductItem, "h">>
  supports: ProductCategory<Omit<ProductItem, "h" | "w">>
  other: ProductCategory<Partial<ProductItem>>
}

export type CollectionOption = "P" | "G" | "I"

export type FormShelfType = {
  depth: string
  numberOfShelves: number
}

export type FormStandType = {
  backVariant: string
  numberOfStands: number
  shelves: FormShelfType[]
  width: string
}

export type FormSubCollectionType = {
  depth: string
  hasBaseCover: boolean
  stands: FormStandType[]
}

export type FormCollectionType = {
  height: string
  isCollapsed?: boolean
  // flag to edit both sub collections at once or separately
  isEditLocked?: boolean
  variant: CollectionOption
  numberOfCollections: number
  subCollections: FormSubCollectionType[]
}

export type OrderType = {
  label: string
  orderDetails: {
    description: string
    number: number
    price: number
  }[]
}

export type HandleLockedChange = (
  event: ChangeEvent<HTMLInputElement>,
  fieldlabel: string
) => void
