import { Products } from "../types"

const shelves = {
  label: "Półki",
  items: [
    { d: "30", w: "66", price: 29.8 },
    { d: "37", w: "66", price: 43.36 },
    { d: "47", w: "66", price: 49.55 },
    { d: "30", w: "80", price: 39.0 },
    { d: "37", w: "80", price: 49.55 },
    { d: "47", w: "80", price: 64.0 },
    { d: "57", w: "80", price: 76.39 },
    { d: "30", w: "100", price: 42.0 },
    { d: "37", w: "100", price: 51.51 },
    { d: "47", w: "100", price: 66.07 },
    { d: "57", w: "100", price: 79.49 },
    { d: "30", w: "125", price: 45.0 },
    { d: "37", w: "125", price: 64.52 },
    { d: "47", w: "125", price: 82.58 },
    { d: "57", w: "125", price: 99.1 },
  ],
}

const other = {
  label: "Inne",
  items: [
    { d: "3", h: "180", w: "3", price: 84.65, category: "Profile" },
    { d: "40", w: "66", price: 52.65, category: "Plecy euro" },
    { d: "40", w: "80", price: 57.03, category: "Plecy euro" },
    { d: "40", w: "100", price: 61.42, category: "Plecy euro" },
    { d: "40", w: "125", price: 78.97, category: "Plecy euro" },
    { d: "8", h: "3", w: "66", price: 24.78, category: "Osłony górne" },
    { d: "8", h: "3", w: "80", price: 26.84, category: "Osłony górne" },
    { d: "8", h: "3", w: "100", price: 28.9, category: "Osłony górne" },
    { d: "8", h: "3", w: "125", price: 30.97, category: "Osłony górne" },
    {
      d: "3",
      h: "3",
      w: "240",
      price: 300,
      category: "Profil dekoracyjny",
    },
    {
      category: "Profil poprzeczny",
      d: "3",
      h: "3",
      w: "1 mb",
      price: 50,
    },
  ],
}

const baseCovers = {
  label: "Osłony dolne",
  items: [
    { w: "66", price: 32 },
    { w: "80", price: 36.13 },
    { w: "100", price: 38.2 },
    { w: "125", price: 41.29 },
  ],
}

const profiles = {
  label: "Profile",
  items: [
    { d: "3", h: "90", w: "8", price: 58.9 },
    { d: "3", h: "150", w: "8", price: 98.0 },
    { d: "3", h: "170", w: "8", price: 108.39 },
    { d: "3", h: "180", w: "8", price: 115.33 },
    { d: "3", h: "210", w: "8", price: 138.33 },
    { d: "3", h: "240", w: "8", price: 156.91 },
  ],
}

const backs = {
  label: "Plecy",
  items: [
    { h: "10", w: "66", price: 16.0 },
    { h: "20", w: "66", price: 20.65 },
    { h: "30", w: "66", price: 31.1 },
    { h: "40", w: "66", price: 34.07 },
    { h: "10", w: "80", price: 15.48 },
    { h: "20", w: "80", price: 19.72 },
    { h: "30", w: "80", price: 29.8 },
    { h: "40", w: "80", price: 33.03 },
    { h: "10", w: "100", price: 16.0 },
    { h: "20", w: "100", price: 20.65 },
    { h: "30", w: "100", price: 31.1 },
    { h: "40", w: "100", price: 34.07 },
    { h: "10", w: "125", price: 18.58 },
    { h: "20", w: "125", price: 27.87 },
    { h: "30", w: "125", price: 36.9 },
    { h: "40", w: "125", price: 41.81 },
  ],
}

const feet = {
  label: "Stopy",
  items: [
    { d: "30", price: 41.67 },
    { d: "37", price: 44.39 },
    { d: "47", price: 52.13 },
    { d: "57", price: 58.84 },
  ],
}

const supports = {
  label: "Wsporniki",
  items: [
    { d: "30", price: 7.5 },
    { d: "37", price: 9.6 },
    { d: "47", price: 11.36 },
  ],
}

export const products: Products = {
  feet,
  baseCovers,
  shelves,
  supports,
  backs,
  other,
  profiles,
}
