import { variantsBack, variantsCollection } from "./utils"

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
  backVariant: (typeof variantsBack)[number]
  numberOfStands: number
  shelves: FormShelfType[]
  width: string
}

export type FormCollectionType = {
  cover?: boolean
  height: string
  depth: string
  numberOfCollections?: number
  variant?: (typeof variantsCollection)[number]
  stands: FormStandType[]
}

export type OrderType = {
  description: string
  number: number
}[]
