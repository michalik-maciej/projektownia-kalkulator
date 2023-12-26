import { variantsCollection } from "./utils"

interface Price {
  price: number
}

export type Back = Price & {
  h: number
  w: number
}

export type Foot = Price & {
  d: number
}

export type Leg = Price & {
  d: number
  h: number
  w: number
}

export type Shelf = Price & {
  d: number
  w: number
}

export type Support = Price & {
  d: number
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
  variant: (typeof variantsCollection)[number]
  numberOfCollections: number
  subCollections: FormSubCollectionType[]
}

export type OrderType = {
  description: string
  number: number
  price: number
}[]
