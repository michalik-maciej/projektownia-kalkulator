import { Dispatch, SetStateAction } from "react"
interface Price {
  price: number
}

export type Back = Price & {
  h: number
  w: number
}

export type Foot = Price & {
  d: number
  w: number
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

export type SetFoot = Dispatch<SetStateAction<Foot>>

export type SetLeg = Dispatch<SetStateAction<Leg>>

export type SetShelf = Dispatch<SetStateAction<Shelf>>

export type SetNumber = Dispatch<SetStateAction<number>>
