import { ChangeEvent } from "react"

type Item = { d: string; h: string; w: string; price: number }
export type CollectionOption = "P" | "G" | "I"

export type Products = {
  backs: Omit<Item, "d">[]
  baseCovers: Omit<Item, "d" | "h">[]
  feet: Omit<Item, "h" | "w">[]
  legs: Item[]
  shelves: Omit<Item, "h">[]
  supports: Omit<Item, "h" | "w">[]
}

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
  productCategory: string
  orderDetails: {
    description: string
    number: number
    price: number
  }[]
}

export type HandleLockedChange = (
  event: ChangeEvent<HTMLInputElement>,
  fieldName: string
) => void
